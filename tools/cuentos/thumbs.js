// recorta miniaturas cuadradas: SVG (coordenadas 800×500) se dibuja a 3x; raster con fracciones
const {chromium}=require('playwright');const fs=require('fs');(async()=>{const cfg=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:2400,height:1500}});
for(const [n,[img,cx,cy,sz]] of Object.entries(cfg)){
 const url='http://localhost:8765/Cuentos/'+img;
 if(img.endsWith('.svg')){await p.setContent(`<body style="margin:0"><img src="${url}" style="width:2400px;height:1500px;display:block"></body>`);await p.waitForTimeout(300);
   const k=3,x=Math.max(0,Math.min(800-sz,cx-sz/2)),y=Math.max(0,Math.min(500-sz,cy-sz/2)),s=Math.min(sz,500);
   await p.screenshot({path:`${out}/t${n}.png`,clip:{x:x*k,y:y*k,width:s*k,height:s*k}});}
 else{await p.setContent(`<body style="margin:0"><img id=i src="${url}" style="display:block"></body>`);await p.waitForTimeout(300);
   const [w,h]=await p.$eval('#i',e=>[e.naturalWidth,e.naturalHeight]);const s=sz*Math.min(w,h);const x=Math.max(0,Math.min(w-s,cx*w-s/2)),y=Math.max(0,Math.min(h-s,cy*h-s/2));
   await p.setViewportSize({width:Math.max(w,100),height:Math.max(h,100)});await p.screenshot({path:`${out}/t${n}.png`,clip:{x,y,width:s,height:s}});await p.setViewportSize({width:2400,height:1500});}
}
await b.close();})();
