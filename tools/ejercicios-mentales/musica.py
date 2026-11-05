#!/usr/bin/env python3
"""Compositor de música original para Ejercicios mentales.

Uso: python3 musica.py <estilo> <salida.wav>      estilos: ver ESTILOS
Todas las piezas son composiciones generadas aquí (sin copiar canciones),
de unos 60-70 s y en bucle perfecto: la mezcla es circular, así que el
final empalma con el inicio sin clic.
"""
import sys, wave, random
import numpy as np
from scipy.signal import butter, sosfiltfilt, lfilter

SR = 44100
NOTE = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11}
hz = lambda m: 440.0 * 2 ** ((m - 69) / 12)

# ---------------------------------------------------------------- instrumentos
def env(n, a=.005, d=.1, s=.7, r=.05):
    e = np.full(n, s, float)
    A, D, Rn = max(1, int(a * SR)), max(1, int(d * SR)), max(1, int(r * SR))
    A = min(A, n); e[:A] = np.linspace(0, 1, A)
    D = min(D, n - A)
    if D > 0: e[A:A + D] = np.linspace(1, s, D)
    Rn = min(Rn, n); e[n - Rn:] *= np.linspace(1, 0, Rn)
    return e
def tvec(dur): return np.arange(int(dur * SR)) / SR
def add_partials(f, t, parts):
    return sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * dec) for k, a, dec in parts)

def bell(f, dur):       t = tvec(dur); return add_partials(f, t, [(1, 1, 2.2), (2, .32, 3.5), (3, .1, 5.5), (4.16, .06, 7)]) * np.minimum(1, t / .004)
def celesta(f, dur):    t = tvec(dur); return add_partials(f, t, [(1, 1, 3.2), (2, .45, 5), (4, .18, 8), (6.8, .05, 12)]) * np.minimum(1, t / .003)
def marimba(f, dur):    t = tvec(dur); return add_partials(f, t, [(1, 1, 5.5), (3.93, .35, 12), (9.2, .08, 25)]) * np.minimum(1, t / .002)
def rhodes(f, dur):
    t = tvec(dur); s = np.sin(2 * np.pi * f * t + .8 * np.sin(2 * np.pi * f * t) * np.exp(-t * 4))
    return (s * np.exp(-t * 1.6) + .25 * np.sin(2 * np.pi * f * 7 * t) * np.exp(-t * 18)) * np.minimum(1, t / .004)
def square(f, dur, duty=.5):
    t = tvec(dur); ph = (f * t) % 1
    return np.where(ph < duty, .5, -.5) * env(len(t), .002, .05, .75, .03)
def triangle(f, dur):
    t = tvec(dur); ph = (f * t) % 1
    return (4 * np.abs(ph - .5) - 1) * env(len(t), .003, .05, .9, .03) * .8
def saw(f, dur, harm=14, det=0.0):
    t = tvec(dur); s = np.zeros_like(t)
    for k in range(1, harm + 1):
        if (f + det) * k > 11000: break
        s += np.sin(2 * np.pi * (f + det) * k * t) / k * (-1) ** (k + 1)
    return s * .6
def strings(f, dur):
    s = sum(saw(f, dur, 10, d) for d in (-1.2, 0, 1.3)) / 3
    return lowpass(s, 2200) * env(len(s), .25, .2, .85, .35)
def brass(f, dur):
    t = tvec(dur); s = saw(f, dur, 12)
    bright = lowpass(s, 2600) * (.6 + .4 * np.exp(-t * 6))
    return bright * env(len(t), .03, .12, .75, .08)
def flute(f, dur, seed=0):
    t = tvec(dur); vib = 1 + .006 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(1, t / .3)
    ph = 2 * np.pi * f * np.cumsum(vib) / SR
    s = np.sin(ph) + .22 * np.sin(2 * ph) + .06 * np.sin(3 * ph)
    breath = lowpass(np.random.default_rng(seed).standard_normal(len(t)), 3000) * .05
    return (s + breath) * env(len(t), .06, .1, .85, .08)
def ks(f, dur, bright=.5, decay=.996, seed=0):
    """Cuerda pulsada (Karplus-Strong) vectorizada: ukelele, charango, guitarra, pizzicato."""
    n = int(dur * SR); N = max(2, int(SR / f))
    x = np.zeros(n); rng = np.random.default_rng(seed)
    burst = rng.uniform(-1, 1, N)
    burst = lowpass(burst, 1500 + 7000 * bright) if N > 20 else burst
    x[:N] = burst
    a = np.zeros(N + 2); a[0] = 1; a[N] = -decay * .5; a[N + 1] = -decay * .5
    return lfilter([1], a, x) * .6
def clav(f, dur):       t = tvec(dur); return square(f, dur, .25) * np.exp(-t * 9) * 1.2
def organ(f, dur):      t = tvec(dur); return (np.sin(2*np.pi*f*t) + .5*np.sin(2*np.pi*2*f*t) + .25*np.sin(2*np.pi*4*f*t)) * env(len(t), .02, .1, .9, .08) * .5
def sub_bass(f, dur):   t = tvec(dur); return (np.sin(2*np.pi*f*t) + .2*np.sin(2*np.pi*2*f*t)) * env(len(t), .005, .1, .8, .04)
def pluck_bass(f, dur):
    t = tvec(dur); body = np.sin(2*np.pi*f*t) * np.exp(-t * 2.2) * np.minimum(1, t / .004)
    return lowpass(ks(f, dur, .2, .992), 900) * 1.1 + body * .9   # cuerda + nota fundamental (graves)
def slap_bass(f, dur):  t = tvec(dur); return (lowpass(saw(f, dur, 10), 1200) * np.exp(-t * 5) + .4*np.sin(2*np.pi*f*t)*np.exp(-t*3)) * np.minimum(1, t/.002)
def pad(f, dur):        t = tvec(dur); s = sum(np.sin(2*np.pi*(f+d)*t) + .18*np.sin(2*np.pi*2*(f+d)*t) for d in (-.6, .6)); return s * env(len(t), .8, .2, .9, .9) * .45
def synth_lead(f, dur): t = tvec(dur); s = saw(f, dur, 10) * .7 + square(f * 1.003, dur) * .5; return lowpass(s, 3500) * env(len(t), .01, .15, .7, .06)
def arp_synth(f, dur):  t = tvec(dur); return lowpass(saw(f, dur, 12), 2800) * np.exp(-t * 7) * np.minimum(1, t/.003)
def whistle(f, dur):    t = tvec(dur); vib = np.sin(2*np.pi*f*t + .02*np.sin(2*np.pi*5.5*t)*f/5.5); return vib * env(len(t), .04, .1, .8, .06) * .8

INSTR = dict(bell=bell, celesta=celesta, marimba=marimba, rhodes=rhodes, square=square, triangle=triangle,
             strings=strings, brass=brass, flute=flute, uke=lambda f, d: ks(f, d, .65, .994), charango=lambda f, d: ks(f, d, .9, .993),
             guitar=lambda f, d: ks(f, d, .45, .996), pizz=lambda f, d: ks(f, d, .35, .985) * 1.3, clav=clav, organ=organ,
             sub=sub_bass, pbass=pluck_bass, slap=slap_bass, pad=pad, lead=synth_lead, arp=arp_synth, whistle=whistle,
             square25=lambda f, d: square(f, d, .25))

def lowpass(x, fc):  return sosfiltfilt(butter(2, min(fc, SR / 2 - 100), 'low', fs=SR, output='sos'), x)
def highpass(x, fc): return sosfiltfilt(butter(2, fc, 'high', fs=SR, output='sos'), x)
def bandpass(x, lo, hi): return sosfiltfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)

# ---------------------------------------------------------------- batería
NZ = np.random.default_rng(11)
def noise(n): return NZ.standard_normal(n)
def d_kick():   t = tvec(.3); f = 45 + 80 * np.exp(-t * 30); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10)
def d_snare():  t = tvec(.22); return (bandpass(noise(len(t)), 1200, 6000) * np.exp(-t * 16) * .7 + np.sin(2*np.pi*190*t) * np.exp(-t*25) * .5)
def d_clap():
    t = tvec(.22); e = np.exp(-t * 18)
    for o in (0, .011, .022): e = e + .7 * np.exp(-np.maximum(t - o, 0) * 160) * (t >= o)
    return bandpass(noise(len(t)), 900, 4000) * e * .5
def d_hat():    t = tvec(.04); return highpass(noise(len(t)), 7000) * np.exp(-t * 100) * .6
def d_ohat():   t = tvec(.14); return highpass(noise(len(t)), 6500) * np.exp(-t * 24) * .5
def d_shaker(): t = tvec(.08); return bandpass(noise(len(t)), 2800, 7000) * np.sin(np.pi * np.minimum(1, t / .08)) * .26
def d_brush():  t = tvec(.18); return bandpass(noise(len(t)), 2000, 8000) * np.sin(np.pi * np.minimum(1, t / .18)) * .35
def d_rim():    t = tvec(.05); return (np.sin(2*np.pi*1700*t) + .5*np.sin(2*np.pi*820*t)) * np.exp(-t * 70) * .5
def d_wood():   t = tvec(.08); return np.sin(2*np.pi*1150*t) * np.exp(-t * 45) * .6
def d_conga(f=210): t = tvec(.25); ff = f * (1 + .25 * np.exp(-t * 40)); return np.sin(2*np.pi*np.cumsum(ff)/SR) * np.exp(-t * 11) * .7
def d_bombo():  t = tvec(.5); f = 60 + 50 * np.exp(-t * 18); return (np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 6) + .2*bandpass(noise(len(t)),200,900)*np.exp(-t*30))
def d_chipnoise(): t = tvec(.06); return np.sign(noise(len(t))) * np.exp(-t * 60) * .25
def d_chipkick(): t = tvec(.12); f = 60 + 180 * np.exp(-t * 40); ph = (np.cumsum(f) / SR) % 1; return np.where(ph < .5, .5, -.5) * np.exp(-t * 18)
def d_tom():    t = tvec(.35); f = 110 * (1 + .3 * np.exp(-t * 20)); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 7)
def d_timp():   t = tvec(.9); f = 73 * (1 + .05 * np.exp(-t * 10)); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 3) + .15*lowpass(noise(len(t)),600)*np.exp(-t*12)
DRUM = dict(k=d_kick, s=d_snare, c=d_clap, h=d_hat, o=d_ohat, x=d_shaker, b=d_brush, r=d_rim, w=d_wood, g=d_conga,
            G=lambda: d_conga(300), B=d_bombo, n=d_chipnoise, K=d_chipkick, t=d_tom, T=d_timp)

# ---------------------------------------------------------------- estilos
# prog: acordes por compás ('C', 'Am', 'F', 'G7', ...). drums: 16 pasos por compás.
ESTILOS = {
 "marimba":  dict(bpm=102, key='F', bars=24, prog=['F','Bb','C','F','Dm','Bb','C','C'], lead='marimba', lead2='whistle', chords='marimba', crhy=[0,6,10], bass='pbass', brhy=[0,7,10],
                  drums={'k':'x...x...x...x...','x':'xxxxxxxxxxxxxxxx','g':'..x..x....x..x..','G':'.......x.......x'}, swing=0, density=.7, gains=(.22,.12,.1,.26,.5), reverb=.25),
 "jazz":     dict(bpm=92, key='F', bars=24, prog=['F','Dm','Gm7','C7','Am','Dm','Gm7','C7'], lead='rhodes', chords='rhodes', crhy=[0,10], bass='pbass', walk=True,
                  drums={'b':'x...x...x...x...','r':'....x.......x...','h':'x..xx..xx..xx..x'}, swing=.33, density=.55, gains=(.26,.12,.0,.32,.35), reverb=.3, seventh=True),
 "chiptune": dict(bpm=132, key='C', bars=32, prog=['C','Am','F','G','C','Am','F','G','F','G','Em','Am','F','G','C','C'], lead='square25', chords='square', crhy=[0,4,8,12], arp=True, bass='triangle', brhy=[0,4,8,12],
                  drums={'K':'x.......x.......','n':'....x.......x...','h':'..x...x...x...x.'}, swing=0, density=.85, gains=(.16,.07,.0,.3,.45), reverb=.08),
 "huayno":   dict(bpm=126, key='A', minor=True, bars=32, prog=['Am','Am','C','G','Am','Am','Em','Am','C','G','Am','Em','Am','C','Em','Am'], lead='flute', chords='charango', crhy=[0,2,4,6,8,10,12,14], strum=True, bass='pbass', brhy=[0,6,8,14],
                  drums={'B':'x.....x.x.....x.','x':'..x...x...x...x.'}, swing=.12, density=.75, gains=(.24,.1,.0,.28,.5), reverb=.3),
 "electro":  dict(bpm=124, key='E', minor=True, bars=32, prog=['Em','C','G','D','Em','C','G','D','C','D','Em','Em','C','D','G','D'], lead='lead', chords='pad', crhy=[0], arp=True, bass='sub', brhy=[0,3,6,8,11,14],
                  drums={'k':'x...x...x...x...','c':'....x.......x...','h':'..x...x...x...x.','o':'.......x.......x'}, swing=0, density=.8, gains=(.17,.13,.09,.3,.55), reverb=.2, pump=True),
 "cuento":   dict(bpm=78, key='G', bars=24, prog=['G','Em','C','D','G','Bm','C','D','Em','C','G','D'], lead='celesta', chords='strings', crhy=[0], bass='pbass', brhy=[0,8],
                  drums={}, swing=0, density=.55, gains=(.3,.16,.0,.2,0), reverb=.45),
 "lofi":     dict(bpm=78, key='D', bars=20, prog=['Dmaj7','Bm7','Em7','A7','Dmaj7','Bm7','Gmaj7','A7'], lead='rhodes', chords='rhodes', crhy=[0,7], bass='sub', brhy=[0,10],
                  drums={'k':'x.....x...x.....','s':'....x.......x...','h':'x.x.x.x.x.x.x.x.'}, swing=.2, density=.45, gains=(.22,.14,.0,.28,.35), reverb=.3, seventh=True, lofi=True),
 "pop":      dict(bpm=112, key='G', bars=32, prog=['G','D','Em','C','G','D','C','D','Em','C','G','D','C','D','G','G'], lead='bell', lead2='uke', chords='uke', crhy=[0,3,6,8,10,14], strum=True, bass='pbass', brhy=[0,6,8,12],
                  drums={'k':'x.....x.x.......','c':'....x.......x...','h':'x.x.x.x.x.x.x.x.'}, swing=0, density=.75, gains=(.2,.11,.1,.28,.45), reverb=.22),
 "ukelele":  dict(bpm=104, key='C', bars=24, prog=['C','G','Am','F','C','G','F','C','F','C','D','G'], lead='whistle', chords='uke', crhy=[0,4,6,8,12,14], strum=True, bass='pbass', brhy=[0,8],
                  drums={'x':'x.x.x.x.x.x.x.x.','c':'....x.......x...'}, swing=.15, density=.65, gains=(.18,.14,.0,.26,.35), reverb=.22),
 "misterio": dict(bpm=96, key='D', minor=True, bars=24, prog=['Dm','Dm','A','Dm','Gm','Dm','A','A'], lead='pizz', lead2='celesta', chords='pizz', crhy=[0,4,8,12], bass='pbass', brhy=[0,4,8,12], low=True,
                  drums={'w':'x...x..x..x.x...','b':'....x.......x...'}, swing=.1, density=.6, gains=(.3,.13,.12,.17,.35), reverb=.3, staccato=True),
 "funk":     dict(bpm=100, key='E', minor=True, bars=24, prog=['Em7','A7','Em7','A7','G','A','Em7','B7'], lead='clav', lead2='brass', chords='clav', crhy=[2,6,10,13], bass='slap', brhy=[0,3,7,8,10,14], seventh=True,
                  drums={'k':'x.....x...x..x..','s':'....x.......x...','h':'xxxxxxxxxxxxxxxx'}, swing=.08, density=.7, gains=(.2,.12,.08,.3,.5), reverb=.15),
 "espacial": dict(bpm=100, key='A', minor=True, bars=24, prog=['Am','F','C','G','Am','F','G','E'], lead='bell', chords='pad', crhy=[0], arp=True, arp_inst='arp', bass='sub', brhy=[0,8],
                  drums={'k':'x.......x.......','h':'..x...x...x...x.'}, swing=0, density=.55, gains=(.22,.16,.11,.28,.3), reverb=.45),
 "aventura": dict(bpm=110, key='D', bars=32, prog=['D','Bm','G','A','D','Bm','G','A','G','A','Bm','G','G','A','D','D'], lead='flute', lead2='brass', chords='strings', crhy=[0,6,8,14], bass='pbass', brhy=[0,3,6,8,11,14],
                  drums={'t':'x..x..x.x..x..x.','s':'....x.......x...','x':'x.x.x.x.x.x.x.x.'}, swing=0, density=.75, gains=(.22,.13,.12,.28,.4), reverb=.3),
 "epica":    dict(bpm=96, key='C', minor=True, bars=24, prog=['Cm','Ab','Eb','Bb','Cm','Ab','Bb','G','Ab','Bb','Cm','G'], lead='brass', lead2='strings', chords='strings', crhy=[0,8], bass='pbass', brhy=[0,6,8,14],
                  drums={'T':'x.......x.......','t':'......x.......x.','s':'....x.......x..x'}, swing=0, density=.65, gains=(.24,.18,.1,.3,.45), reverb=.4),
 "cajabeat": dict(bpm=88, key='C', bars=24, prog=['C','G','Am','F','C','G','F','G'], lead='bell', chords='pad', crhy=[0], bass='sub', brhy=[0,10],
                  drums={'k':'x.......x.x.....','r':'....x.......x...','x':'..x...x...x...x.'}, swing=.12, density=.6, gains=(.28,.15,.0,.25,.35), reverb=.35),
}

QUAL = {'': [0, 4, 7], 'm': [0, 3, 7], '7': [0, 4, 7, 10], 'm7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11]}
def parse(ch):
    root = ch[:2] if len(ch) > 1 and ch[1] in '#b' else ch[:1]
    q = ch[len(root):]
    return NOTE[root], QUAL.get(q, QUAL[''])

def compose(name, seed=7):
    S = ESTILOS[name]; rng = random.Random(seed + sum(map(ord, name)))
    beat = 60 / S['bpm']; step = beat / 4; bar = beat * 4
    bars = S['bars']; prog = (S['prog'] * 8)[:bars]
    L = int(round(bars * bar * SR)); L -= L % 2
    mix = np.zeros((L, 2))
    def at(i):  # tiempo del paso i (con swing en los pasos impares de corchea)
        sw = S.get('swing', 0)
        return i * step + (sw * step if i % 2 == 1 else 0)
    def put(sig, t, pan=.5, g=1.0):
        s = int(round(t * SR)) % L; idx = (np.arange(len(sig)) + s) % L
        np.add.at(mix[:, 0], idx, sig * g * np.cos(pan * np.pi / 2)); np.add.at(mix[:, 1], idx, sig * g * np.sin(pan * np.pi / 2))
    gl, gc, ga, gb, gd = S['gains']
    tonic = NOTE[S['key']]
    scale = [0, 2, 3, 5, 7, 8, 10] if S.get('minor') else [0, 2, 4, 5, 7, 9, 11]
    penta = [0, 3, 5, 7, 10] if S.get('minor') else [0, 2, 4, 7, 9]

    # --- batería ---
    cache = {k: DRUM[k]() for k in S['drums']}
    sect = lambda b: 0 if b < bars // 4 else 1      # la primera parte, más suave
    for b in range(bars):
        for k, pat in S['drums'].items():
            for i, ch in enumerate(pat):
                if ch == 'x':
                    if sect(b) == 0 and k in 'ohc' and b % 2 == 0: continue
                    put(cache[k], b * bar + at(i), .5 + (.12 if k in 'hxo' else 0) * (1 if i % 4 else -1), gd * (.8 if sect(b) == 0 else 1))
    # bombeo para el pop electrónico
    pump = np.ones(L)
    if S.get('pump'):
        for b in range(bars):
            for q in range(4):
                s = int((b * bar + q * beat) * SR) % L; n = int(beat * .55 * SR)
                idx = (np.arange(n) + s) % L; pump[idx] = np.minimum(pump[idx], .45 + .55 * (np.arange(n) / n) ** .6)

    # --- acordes ---
    cbuf = np.zeros((L, 2)); C = INSTR[S['chords']]
    for b, ch in enumerate(prog):
        r, q = parse(ch)
        notes = [48 + 12 + ((r + iv) % 12) for iv in q]
        notes = sorted(n if n < 72 else n - 12 for n in notes)
        if S['chords'] in ('strings', 'pad'):
            for n in notes:
                sig = C(hz(n), bar + .5); s = int(b * bar * SR); idx = (np.arange(len(sig)) + s) % L
                np.add.at(cbuf[:, 0], idx, sig * gc * .85); np.add.at(cbuf[:, 1], idx, sig * gc)
        else:
            for j, p in enumerate(S['crhy']):
                if S.get('arp') and S['chords'] in ('square',):
                    continue
                for k2, n in enumerate(notes):
                    dly = (k2 * .012 if S.get('strum') else 0)
                    d = step * (2.2 if S.get('staccato') else 3.5)
                    sig = C(hz(n), d) * (.9 if j % 2 else 1)
                    s = int((b * bar + at(p) + dly) * SR) % L; idx = (np.arange(len(sig)) + s) % L
                    w = gc / len(notes) * 1.6
                    np.add.at(cbuf[:, 0], idx, sig * w * (.7 if k2 % 2 else 1)); np.add.at(cbuf[:, 1], idx, sig * w * (1 if k2 % 2 else .7))
    mix += cbuf * pump[:, None]

    # --- arpegio ---
    if S.get('arp'):
        A = INSTR[S.get('arp_inst', S['chords'] if S['chords'] == 'square' else 'arp')]
        for b, ch in enumerate(prog):
            r, q = parse(ch); notes = [60 + ((r + iv) % 12) for iv in q] + [72 + (r % 12)]
            for i in range(16 if S['bpm'] < 128 else 8):
                stp = i if S['bpm'] < 128 else i * 2
                n = notes[[0, 1, 2, 3, 2, 1][i % 6] % len(notes)]
                put(A(hz(n), step * 1.8), b * bar + at(stp), .3 + .4 * (i % 2), ga if ga else .09)

    # --- bajo ---
    B = INSTR[S['bass']]
    for b, ch in enumerate(prog):
        r, q = parse(ch); root = 36 + (r % 12)
        if root > 43: root -= 12
        if S.get('low'): root -= 0
        if S.get('walk'):
            nxt = parse(prog[(b + 1) % bars])[0]
            line = [root, root + q[1], root + q[2], 36 + (nxt % 12) + (1 if rng.random() < .5 else -1)]
            for i, n in enumerate(line): put(B(hz(n), beat * .95), b * bar + at(i * 4), .5, gb)
        else:
            for i, p in enumerate(S['brhy']):
                n = root + (12 if (i % 2 and S['bass'] in ('sub', 'slap')) else 0) + (7 if (i == 2 and S['bass'] == 'pbass') else 0)
                nxtp = S['brhy'][i + 1] if i + 1 < len(S['brhy']) else 16
                put(B(hz(n), max(step * 1.5, (nxtp - p) * step * .9)), b * bar + at(p), .5, gb)

    # --- melodía (motivos de 2 compases que se repiten y varían: A A' B A) ---
    LEAD = INSTR[S['lead']]; LEAD2 = INSTR.get(S.get('lead2'))
    base = 72 if S['lead'] not in ('pizz', 'brass', 'clav', 'flute') else (67 if S['lead'] != 'flute' else 74)
    def deg_to_midi(d):  # grado de la pentatónica -> MIDI
        o, k = divmod(d, len(penta)); return base - 12 + tonic % 12 + 12 * o + penta[k]
    rhythms = [[0, 3, 6, 8, 10, 12], [0, 2, 4, 6, 8, 12], [0, 4, 6, 10, 12, 14], [0, 3, 6, 10, 12], [0, 4, 8, 10, 12, 14], [0, 6, 8, 12]]
    def make_motif():
        rh = rng.choice(rhythms); d = rng.choice([5, 6, 7]); out = []
        for p in rh:
            d += rng.choice([-2, -1, -1, 1, 1, 2, 0]); d = max(3, min(10, d)); out.append((p, d))
        rh2 = rng.choice(rhythms); out2 = []
        for p in rh2:
            d += rng.choice([-1, 1, -1, 1, 2, -2]); d = max(3, min(10, d)); out2.append((p, d))
        return [out, out2]
    phrases = [make_motif() for _ in range(3)]
    form = [0, 0, 1, 0, 2, 2, 1, 0]
    for b, ch in enumerate(prog):
        if S['density'] < .6 and b % 4 == 3: continue
        mot = phrases[form[(b // 2) % len(form)]][b % 2]
        r, q = parse(ch); chord_pc = [(r + iv) % 12 for iv in q]
        var = 1 if (b // 2) % 4 == 1 else 0
        notes = mot if rng.random() < S['density'] + .2 else mot[::2]
        for j, (p, d) in enumerate(notes):
            m = deg_to_midi(d + (var if j == len(notes) - 1 else 0))
            if p in (0, 8):                                  # en tiempos fuertes, nota del acorde
                cands = [m + k for k in range(-4, 5) if (m + k) % 12 in chord_pc]
                if cands: m = min(cands, key=lambda x: abs(x - m))
            nxt = notes[j + 1][0] if j + 1 < len(notes) else 16
            dur = (nxt - p) * step
            inst = LEAD2 if (LEAD2 and b >= bars // 2 and b % 4 < 2) else LEAD
            g = gl * (1.0 if inst is LEAD else .85)
            if inst in (INSTR['brass'], INSTR['strings'], INSTR['flute'], INSTR['whistle'], INSTR['lead']):
                sig = inst(hz(m), max(.15, dur * .95))
            else:
                sig = inst(hz(m), max(.6, dur + .5))
            pan = .42 + .16 * rng.random()
            put(sig, b * bar + at(p), pan, g)
            if S['lead'] in ('pizz', 'bell', 'celesta', 'square25', 'marimba') and S.get('reverb', 0) < .35:
                put(sig * .3, b * bar + at(p) + 3 * step, .78, g)     # eco

    # --- ambiente: reverberación circular ---
    def reverb(x, seconds=2.0, seed=1):
        r = np.random.default_rng(seed); n = int(seconds * SR); t = np.arange(n) / SR
        ir = r.standard_normal(n) * np.exp(-t * 3.5); ir[:int(.012 * SR)] = 0; ir /= np.sqrt((ir ** 2).sum())
        k = np.zeros(L); k[:n] = ir
        return np.real(np.fft.ifft(np.fft.fft(x) * np.fft.fft(k)))
    wet = S.get('reverb', .25)
    out = mix * (1 - wet * .6) + np.stack([reverb(mix[:, 0], seed=1), reverb(mix[:, 1], seed=2)], 1) * wet * 1.4
    if S.get('lofi'):
        out = out + np.stack([lowpass(noise(L), 5000)] * 2, 1) * .004          # un poquito de "disco de vinilo"
    big = np.concatenate([out, out, out])                                         # filtros circulares
    big = sosfiltfilt(butter(1, 35, 'high', fs=SR, output='sos'), big, axis=0)
    big = sosfiltfilt(butter(2, 7500 if not S.get('lofi') else 5200, 'low', fs=SR, output='sos'), big, axis=0)
    out = big[L:2 * L]
    out = np.tanh(out / np.max(np.abs(out)) * 1.5)
    out = out / np.sqrt(np.mean(out ** 2)) * 10 ** (-17 / 20)                     # nivel parejo entre estilos
    pk = np.max(np.abs(out))
    if pk > .89: out *= .89 / pk
    return out, L

if __name__ == "__main__":
    name, path = sys.argv[1], sys.argv[2]
    out, L = compose(name)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes())
    print(f"{name}: {L / SR:.1f} s · empalme {np.abs(out[0] - out[-1]).max():.3f}")
