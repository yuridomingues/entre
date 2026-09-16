"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const BOARD="#23251f";
const CHALK="#f5efe2";
const DIM="rgba(245,239,226,.26)";
const ACCENTS=["#a78bfa","#a3d977","#79c6df","#f3c969","#ef9479","#e89abb"];

function seeded(seed:number){
  let x=seed||1;
  return ()=>{
    x=(x*16807)%2147483647;
    return (x-1)/2147483646;
  };
}

function setup(canvas:HTMLCanvasElement,w:number,h:number){
  const dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=w*dpr;
  canvas.height=h*dpr;
  canvas.style.aspectRatio=`${w}/${h}`;
  const ctx=canvas.getContext("2d")!;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle=BOARD;
  ctx.fillRect(0,0,w,h);
  const rnd=seeded(w+h);
  ctx.fillStyle="rgba(255,255,255,.028)";
  for(let i=0;i<140;i++)ctx.fillRect(rnd()*w,rnd()*h,1+rnd()*1.4,1+rnd()*1.4);
  ctx.lineCap="round";
  ctx.lineJoin="round";
  return ctx;
}

function roughLine(ctx:CanvasRenderingContext2D,x1:number,y1:number,x2:number,y2:number,color=CHALK,width=3,seed=1){
  const rnd=seeded(seed);
  for(let i=0;i<3;i++){
    const j=1.4;
    ctx.beginPath();
    ctx.moveTo(x1+(rnd()-.5)*j,y1+(rnd()-.5)*j);
    ctx.lineTo(x2+(rnd()-.5)*j,y2+(rnd()-.5)*j);
    ctx.strokeStyle=color;
    ctx.globalAlpha=i===0?.56:.23;
    ctx.lineWidth=width+(rnd()-.5)*.8;
    ctx.stroke();
  }
  ctx.globalAlpha=1;
}

function roughPath(ctx:CanvasRenderingContext2D,pts:[number,number][],color=CHALK,width=3,seed=1,close=false){
  if(pts.length<2)return;
  const rnd=seeded(seed);
  for(let pass=0;pass<3;pass++){
    ctx.beginPath();
    pts.forEach(([x,y],i)=>{
      const xx=x+(rnd()-.5)*1.8, yy=y+(rnd()-.5)*1.8;
      if(i===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);
    });
    if(close)ctx.closePath();
    ctx.strokeStyle=color;
    ctx.lineWidth=width+(rnd()-.5)*.7;
    ctx.globalAlpha=pass===0?.56:.22;
    ctx.stroke();
  }
  ctx.globalAlpha=1;
}

function chalkCircle(ctx:CanvasRenderingContext2D,x:number,y:number,r:number,color=CHALK,width=3,seed=1,fill?:string){
  if(fill){
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=fill;ctx.globalAlpha=.18;ctx.fill();ctx.globalAlpha=1;
  }
  const rnd=seeded(seed);
  for(let i=0;i<3;i++){
    ctx.beginPath();
    ctx.ellipse(x+(rnd()-.5)*1.3,y+(rnd()-.5)*1.3,r+(rnd()-.5)*1.3,r+(rnd()-.5)*1.3,0,0,Math.PI*2);
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.globalAlpha=i===0?.56:.2;ctx.stroke();
  }
  ctx.globalAlpha=1;
}

function chalkRect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,color=CHALK,width=3,seed=1){
  roughPath(ctx,[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],color,width,seed,true);
}

function chalkText(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,size=18,color=CHALK,align:CanvasTextAlign="center"){
  ctx.font=`700 ${size}px Arial, sans-serif`;
  ctx.textAlign=align;
  ctx.textBaseline="middle";
  ctx.fillStyle=color;
  ctx.globalAlpha=.88;
  ctx.fillText(text,x,y);
  ctx.globalAlpha=1;
}

function person(ctx:CanvasRenderingContext2D,x:number,y:number,s=1,color=ACCENTS[0],seed=1){
  chalkCircle(ctx,x,y-20*s,9*s,CHALK,2.2,seed);
  roughLine(ctx,x,y-10*s,x,y+18*s,color,7*s,seed+1);
  roughLine(ctx,x,y+4*s,x-14*s,y+15*s,CHALK,2.3,seed+2);
  roughLine(ctx,x,y+4*s,x+14*s,y+15*s,CHALK,2.3,seed+3);
  roughLine(ctx,x,y+18*s,x-10*s,y+38*s,CHALK,2.3,seed+4);
  roughLine(ctx,x,y+18*s,x+10*s,y+38*s,CHALK,2.3,seed+5);
}

function cardScene(ctx:CanvasRenderingContext2D,slug:string,w:number,h:number){
  const a=ACCENTS[slug.length%ACCENTS.length];
  const b=ACCENTS[(slug.length+2)%ACCENTS.length];
  const cx=w/2, cy=h/2;

  if(slug==="arvore"){
    roughLine(ctx,cx,h*.84,cx,h*.35,CHALK,6,1);
    [[-55,-18],[-25,-52],[22,-60],[58,-27],[-66,25],[-10,12],[52,20]].forEach((p,i)=>chalkCircle(ctx,cx+p[0],h*.43+p[1],27,a,3,10+i,a));
    roughLine(ctx,cx,h*.55,cx-62,h*.42,CHALK,3,22);roughLine(ctx,cx,h*.5,cx+68,h*.37,CHALK,3,23);
    roughLine(ctx,w*.15,h*.84,w*.85,h*.84,DIM,2,24);
    return;
  }
  if(slug==="mente"){
    roughPath(ctx,[[70,cy],[120,80],[210,62],[300,82],[350,cy],[300,178],[210,196],[120,180]],CHALK,3,1,true);
    chalkCircle(ctx,cx,cy,45,a,3,2);chalkCircle(ctx,cx,cy,17,CHALK,3,3);
    for(let i=0;i<8;i++){const t=i/8*Math.PI*2;chalkCircle(ctx,335+Math.cos(t)*28,65+Math.sin(t)*28,i%2?5:10,b,2,20+i)}
    return;
  }
  if(slug==="musica"){
    [95,165,235,305].forEach((x,i)=>{chalkRect(ctx,x,55,42,120,CHALK,2,10+i);roughLine(ctx,x+21,72,x+21,145,[a,b,ACCENTS[2],ACCENTS[3]][i],5,30+i);chalkCircle(ctx,x+21,120-(i%3)*25,8,CHALK,2,40+i)});
    const pts:Array<[number,number]>=[];for(let x=55;x<365;x+=12)pts.push([x,210+Math.sin(x/18)*14]);roughPath(ctx,pts,a,3,77);
    return;
  }
  if(slug==="conversa"){
    person(ctx,90,170,.75,a,1);person(ctx,330,170,.75,b,8);
    chalkRect(ctx,130,45,160,80,CHALK,3,20);
    chalkCircle(ctx,170,85,5,a,2,21);chalkCircle(ctx,210,85,5,b,2,22);chalkCircle(ctx,250,85,5,ACCENTS[3],2,23);
    roughLine(ctx,290,125,330,145,DIM,2,24);
    return;
  }
  if(slug==="vida"){
    for(let i=0;i<70;i++){const x=55+(i%14)*22,y=58+Math.floor(i/14)*28;chalkCircle(ctx,x,y,5,i<44?(i%5===0?a:b):DIM,1.5,100+i)}
    person(ctx,342,176,.72,a,12);
    return;
  }
  if(slug==="escala"){
    roughLine(ctx,42,210,380,210,DIM,2,1);
    chalkCircle(ctx,58,205,3,CHALK,1.6,2);chalkCircle(ctx,88,198,10,a,2,3);
    chalkRect(ctx,118,170,22,38,b,2,4);person(ctx,178,175,.45,a,5);
    chalkRect(ctx,220,160,62,46,ACCENTS[4],2,6);
    roughPath(ctx,[[300,210],[330,130],[360,210]],b,3,7,true);
    chalkCircle(ctx,386,75,34,ACCENTS[2],3,8);
    return;
  }
  if(slug==="acaso"){
    roughLine(ctx,55,215,365,215,DIM,2,1);
    [1,2,3,5,7,5,3,2,1].forEach((n,c)=>{for(let j=0;j<n;j++)chalkCircle(ctx,80+c*33,205-j*18,6,[a,b,ACCENTS[2],ACCENTS[3]][c%4],1.5,10+c*10+j)});
    return;
  }
  if(slug==="noite"){
    chalkRect(ctx,45,38,330,170,CHALK,2,1);
    for(let i=0;i<20;i++){const rnd=seeded(i+4);chalkCircle(ctx,65+rnd()*290,50+rnd()*90,1.5+(i%3===0?1.5:0),CHALK,1,20+i)}
    [60,105,150,205,265,315].forEach((x,i)=>chalkRect(ctx,x,125-(i%3)*18,45,83+(i%3)*18,DIM,2,40+i));
    return;
  }
  if(slug==="rede"){
    const pts=[[80,85],[140,55],[130,135],[205,100],[220,180],[300,175],[330,95],[360,155]];
    [[0,1],[0,2],[1,3],[2,3],[3,4],[4,5],[5,6],[5,7],[6,7]].forEach((e,i)=>roughLine(ctx,pts[e[0]][0],pts[e[0]][1],pts[e[1]][0],pts[e[1]][1],i===5?a:DIM,i===5?5:2,50+i));
    pts.forEach((p,i)=>chalkCircle(ctx,p[0],p[1],12,i<5?a:CHALK,2,70+i,i<5?a:undefined));
    return;
  }
  if(slug==="cooperar"){
    person(ctx,95,175,.72,a,1);person(ctx,325,175,.72,b,9);
    chalkRect(ctx,145,120,130,65,CHALK,2,20);
    for(let i=0;i<6;i++)chalkCircle(ctx,170+(i%3)*40,142+Math.floor(i/3)*28,9,i<3?ACCENTS[3]:a,2,30+i);
    return;
  }
  if(slug==="memoria"){
    chalkRect(ctx,50,40,320,175,CHALK,2,1);roughLine(ctx,156,40,156,215,DIM,1.5,2);roughLine(ctx,264,40,264,215,DIM,1.5,3);roughLine(ctx,50,127,370,127,DIM,1.5,4);
    drawMemoryObject(ctx,"book",105,84,1);drawMemoryObject(ctx,"clock",105,174,2);drawMemoryObject(ctx,"plant",316,84,3);drawMemoryObject(ctx,"mug",212,176,4);return;
  }
  if(slug==="mudanca"){
    const p1:Array<[number,number]>=[],p2:Array<[number,number]>=[];
    for(let i=0;i<32;i++){const x=45+i*10.5;p1.push([x,205-Math.sin(i*.5)*25-i*3]);p2.push([x,206-Math.sin(i*.5+.03)*25-i*1.5+(i>12?(i-12)*3:0)])}
    roughPath(ctx,p1,a,4,1);roughPath(ctx,p2,b,4,2);chalkCircle(ctx,45,205,7,CHALK,2,3);return;
  }
  if(slug==="atencao"){
    roughLine(ctx,cx,40,cx,220,DIM,2,1);
    chalkCircle(ctx,105,90,14,ACCENTS[2],2,2);chalkCircle(ctx,310,170,14,ACCENTS[2],2,3);chalkCircle(ctx,115,170,14,ACCENTS[5],2,4);
    roughPath(ctx,[[170,80],[260,170],[168,170]],ACCENTS[3],4,5,true);return;
  }
  if(slug==="aleatorio"){
    for(let i=0;i<24;i++){const x=58+(i%12)*25,y=65+Math.floor(i/12)*30;chalkRect(ctx,x,y,15,15,i%3===0?a:b,1.5,20+i)}
    roughPath(ctx,[[115,155],[78,178],[115,201]],CHALK,4,1);roughPath(ctx,[[305,155],[342,178],[305,201]],CHALK,4,2);return;
  }
  if(slug==="teseu"){
    roughPath(ctx,[[75,145],[350,145],[315,208],[110,208]],CHALK,3,1,true);
    for(let i=0;i<8;i++)roughLine(ctx,110+i*29,150,116+i*29,204,i<3?a:CHALK,2,10+i);
    roughLine(ctx,210,145,210,48,CHALK,4,20);roughPath(ctx,[[210,55],[300,138],[210,138]],DIM,2,21,true);return;
  }
  if(slug==="perguntas"){
    for(let i=0;i<12;i++){const x=55+(i%4)*55,y=55+Math.floor(i/4)*55;chalkCircle(ctx,x,y,16,i<7?[a,b,ACCENTS[3]][i%3]:DIM,2,20+i)}
    chalkCircle(ctx,328,102,42,CHALK,3,1);chalkCircle(ctx,328,102,14,ACCENTS[4],2,2);roughLine(ctx,298,134,265,180,CHALK,8,3);return;
  }
  if(slug==="regra"){
    [2,4,6].forEach((n,i)=>{chalkRect(ctx,65+i*92,62,68,70,CHALK,2,10+i);chalkText(ctx,String(n),99+i*92,98,34,i===1?a:CHALK)});
    chalkText(ctx,"?",337,112,52,b);return;
  }
  if(slug==="minuto"){
    chalkCircle(ctx,cx,90,48,CHALK,3,1);roughLine(ctx,cx,90,cx,55,CHALK,4,2);roughLine(ctx,cx,90,cx+27,105,CHALK,4,3);person(ctx,cx,188,.65,a,10);return;
  }
  if(slug==="stroop"){
    chalkText(ctx,"AZUL",115,80,36,ACCENTS[4]);chalkText(ctx,"ROSA",290,80,36,b);chalkText(ctx,"VERDE",125,145,34,a);chalkText(ctx,"AZUL",300,145,34,ACCENTS[3]);return;
  }
  if(slug==="mapa"){
    chalkCircle(ctx,115,130,72,ACCENTS[2],3,1);roughPath(ctx,[[85,95],[102,82],[126,91],[116,120],[92,128]],b,2,2,true);
    chalkRect(ctx,220,60,155,130,CHALK,2,3);chalkRect(ctx,275,120,42,28,b,2,4);chalkRect(ctx,247,75,96,24,b,2,5);roughLine(ctx,190,120,225,110,a,3,6);return;
  }
  if(slug==="profundidade"){
    chalkCircle(ctx,cx,130,92,CHALK,3,1);chalkCircle(ctx,cx,130,67,ACCENTS[4],3,2);chalkCircle(ctx,cx,130,41,ACCENTS[3],3,3);chalkCircle(ctx,cx,130,18,CHALK,2,4);
    roughLine(ctx,cx,38,cx,160,CHALK,3,5);chalkCircle(ctx,cx,160,8,a,2,6);return;
  }

  chalkCircle(ctx,cx,cy,60,a,3,1);
}

export function ChalkCard({scene,className=""}:{scene:string;className?:string}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{if(ref.current){const ctx=setup(ref.current,420,260);cardScene(ctx,scene,420,260)}},[scene]);
  return <canvas ref={ref} className={"chalk-canvas chalk-card "+className} aria-hidden="true"/>;
}

export function ChalkTree({progress}:{progress:number}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(!ref.current)return;
    const ctx=setup(ref.current,480,620);
    const maturity=Math.max(0,Math.min(1,progress/.34));
    roughLine(ctx,30,560,450,560,DIM,2,1);
    const trunkTop=535-330*maturity;
    roughLine(ctx,240,558,242,trunkTop,CHALK,8,2);
    const branches=[
      [240,420,150,335],[242,380,330,300],[240,460,125,430],[244,455,355,470],[240,345,205,285],[255,335,300,265]
    ];
    branches.forEach((v,i)=>{if(maturity>(i+1)*.08)roughLine(ctx,v[0],v[1],v[2],v[3],CHALK,4,10+i)});
    const crown=Math.max(0,(maturity-.18)/.82);
    const clusters=[[140,290,42],[195,245,48],[260,235,52],[325,285,45],[170,345,42],[245,330,55],[315,350,44]];
    clusters.forEach((v,i)=>{if(crown>i*.08)chalkCircle(ctx,v[0],v[1],v[2]*Math.min(1,crown*1.45),ACCENTS[1],3,30+i,ACCENTS[1])});
    const rings=Math.floor(progress*7);
    for(let i=0;i<rings;i++)chalkCircle(ctx,241,543,9+i*4,DIM,1.4,80+i);
    if(progress>.58){
      roughPath(ctx,[[350,115],[360,105],[370,115],[380,105],[390,115]],CHALK,2,99);
      roughPath(ctx,[[385,145],[393,138],[401,145],[409,138],[417,145]],CHALK,2,100);
    }
  },[progress]);
  return <canvas ref={ref} className="chalk-canvas chalk-tree" aria-hidden="true"/>;
}

export function ChalkScaleObject({kind}:{kind:string}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(!ref.current)return;
    const ctx=setup(ref.current,220,260);
    const c=ACCENTS[(kind.length+1)%ACCENTS.length];
    if(kind==="grain")chalkCircle(ctx,110,150,13,c,3,1);
    else if(kind==="coin")chalkCircle(ctx,110,145,48,c,4,2);
    else if(kind==="phone"){chalkRect(ctx,75,45,70,155,c,4,3);roughLine(ctx,90,65,130,65,DIM,2,4);chalkCircle(ctx,110,183,6,CHALK,2,5)}
    else if(kind==="person")person(ctx,110,160,1.45,c,4);
    else if(kind==="bus"){chalkRect(ctx,45,65,130,130,c,4,5);chalkRect(ctx,62,82,88,38,CHALK,2,6);chalkCircle(ctx,75,202,14,CHALK,3,7);chalkCircle(ctx,145,202,14,CHALK,3,8)}
    else if(kind==="building"){chalkRect(ctx,60,25,100,205,CHALK,4,9);for(let r=0;r<5;r++)for(let col=0;col<2;col++)chalkRect(ctx,80+col*42,50+r*32,18,20,c,1.7,20+r*3+col)}
    else if(kind==="tree"){roughLine(ctx,110,235,110,105,CHALK,9,1);[[75,90,42],[120,65,50],[155,105,42],[95,125,50],[145,145,40]].forEach((v,i)=>chalkCircle(ctx,v[0],v[1],v[2],c,3,40+i,c))}
    else if(kind==="mountain"){roughPath(ctx,[[18,222],[90,125],[120,156],[165,65],[210,222]],c,5,1);roughPath(ctx,[[144,98],[165,65],[183,92]],CHALK,3,2)}
    else {chalkCircle(ctx,110,130,96,ACCENTS[2],4,3);roughPath(ctx,[[62,95],[90,78],[120,90],[112,116],[88,125]],ACCENTS[1],3,4,true)}
  },[kind]);
  return <canvas ref={ref} className="chalk-canvas chalk-scale-object" aria-hidden="true"/>;
}

export function ChalkMemoryIcon({kind,className=""}:{kind:"book"|"mug"|"plant"|"clock";className?:string}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{if(ref.current){const ctx=setup(ref.current,64,64);drawMemoryObject(ctx,kind,32,33,kind.length)}},[kind]);
  return <canvas ref={ref} className={"chalk-canvas chalk-memory-icon "+className} aria-hidden="true"/>;
}

function drawMemoryObject(ctx:CanvasRenderingContext2D,kind:"book"|"mug"|"plant"|"clock",x:number,y:number,seed=1){
  const c=ACCENTS[(seed+2)%ACCENTS.length];
  if(kind==="book"){chalkRect(ctx,x-20,y-23,40,46,c,3,seed);roughLine(ctx,x-9,y-23,x-9,y+23,CHALK,2,seed+1);roughLine(ctx,x-2,y-8,x+13,y-8,CHALK,1.5,seed+2)}
  if(kind==="mug"){chalkRect(ctx,x-18,y-16,32,30,c,3,seed);chalkCircle(ctx,x+18,y-1,9,CHALK,2,seed+1)}
  if(kind==="plant"){roughPath(ctx,[[x-14,y+8],[x+14,y+8],[x+10,y+24],[x-10,y+24]],c,3,seed,true);roughLine(ctx,x,y+8,x,y-20,CHALK,2,seed+1);roughPath(ctx,[[x,y-10],[x-14,y-22],[x-19,y-11]],ACCENTS[1],3,seed+2);roughPath(ctx,[[x,y-3],[x+16,y-18],[x+20,y-6]],ACCENTS[1],3,seed+3)}
  if(kind==="clock"){chalkCircle(ctx,x,y,22,c,3,seed);roughLine(ctx,x,y,x,y-12,CHALK,2,seed+1);roughLine(ctx,x,y,x+10,y+7,CHALK,2,seed+2)}
}

type NetNode={x:number;y:number};
export function ChalkNetwork({nodes,edges,seeds,dist,wave}:{nodes:NetNode[];edges:[number,number][];seeds:number[];dist:number[]|null;wave:number}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(!ref.current)return;
    const ctx=setup(ref.current,930,450);
    roughLine(ctx,465,35,465,415,DIM,1.6,1);
    edges.forEach(([a,b],i)=>{
      const active=!!dist&&dist[a]>=0&&dist[b]>=0&&Math.max(dist[a],dist[b])<=wave;
      roughLine(ctx,nodes[a].x,nodes[a].y,nodes[b].x,nodes[b].y,active?ACCENTS[0]:DIM,active?4:1.7,20+i);
    });
    nodes.forEach((n,i)=>{
      const active=dist?dist[i]>=0&&dist[i]<=wave:seeds.includes(i);
      chalkCircle(ctx,n.x,n.y,18,active?ACCENTS[0]:CHALK,2.5,80+i,active?ACCENTS[0]:undefined);
      chalkCircle(ctx,n.x,n.y-3,5,active?CHALK:DIM,1.5,120+i);
      if(seeds.includes(i)){chalkCircle(ctx,n.x,n.y,29,ACCENTS[3],2,150+i);roughLine(ctx,n.x,n.y-39,n.x,n.y-48,ACCENTS[3],2,180+i)}
    });
  },[nodes,edges,seeds,dist,wave]);
  return <canvas ref={ref} className="chalk-canvas chalk-network" aria-hidden="true"/>;
}

export function ChalkShip({replaced,allOld=false,onPart}:{replaced:Set<number>;allOld?:boolean;onPart?:(id:number)=>void}){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    if(!ref.current)return;
    const ctx=setup(ref.current,720,360);
    roughPath(ctx,[[92,218],[608,218],[550,310],[158,310]],CHALK,4,1,true);
    for(let i=0;i<8;i++){
      const x=112+i*58;
      roughPath(ctx,[[x,220],[x+58,220],[x+48,290],[x+10,290]],!allOld&&replaced.has(i)?ACCENTS[1]:CHALK,3,10+i,true);
    }
    roughLine(ctx,347,215,347,55,!allOld&&replaced.has(8)?ACCENTS[1]:CHALK,6,30);
    roughPath(ctx,[[350,62],[350,200],[505,200]],!allOld&&replaced.has(9)?ACCENTS[1]:DIM,3,31,true);
    roughPath(ctx,[[350,55],[440,55],[414,82],[440,107],[350,107]],!allOld&&replaced.has(11)?ACCENTS[1]:CHALK,3,32,true);
    roughPath(ctx,[[543,230],[594,230],[580,315],[540,315]],!allOld&&replaced.has(10)?ACCENTS[1]:CHALK,3,33,true);
    const wave:Array<[number,number]>=[];for(let x=40;x<680;x+=18)wave.push([x,330+Math.sin(x/28)*7]);roughPath(ctx,wave,ACCENTS[2],2.5,50);
  },[replaced,allOld]);

  const hotspots=[
    ...Array.from({length:8},(_,i)=>({id:i,left:15.5+i*8.05,top:60,width:8.4,height:24})),
    {id:8,left:45.8,top:14,width:4,height:52},
    {id:9,left:48.5,top:16,width:23,height:41},
    {id:10,left:75,top:63,width:9,height:25},
    {id:11,left:48.5,top:13,width:15,height:19}
  ];
  return <div className="chalk-ship-wrap"><canvas ref={ref} className="chalk-canvas chalk-ship" aria-hidden="true"/>{onPart&&hotspots.map(h=><button key={h.id} className="chalk-ship-hit" aria-label={"substituir peça "+(h.id+1)} onClick={()=>onPart(h.id)} style={{left:h.left+"%",top:h.top+"%",width:h.width+"%",height:h.height+"%"}}/>)}</div>;
}

export function ChalkEarth({depth,angle,onPick}:{depth:number;angle:number;onPick:(depth:number,angle:number)=>void}){
  const ref=useRef<HTMLCanvasElement>(null);
  const R=240;
  useEffect(()=>{
    if(!ref.current)return;
    const ctx=setup(ref.current,600,600);
    chalkCircle(ctx,300,300,240,CHALK,4,1);
    chalkCircle(ctx,300,300,240*(1-2900/6371),ACCENTS[4],4,2);
    chalkCircle(ctx,300,300,240*(1-5150/6371),ACCENTS[3],4,3);
    chalkCircle(ctx,300,300,13,CHALK,3,4);
    const rr=R*(1-depth/6371);
    const x=300+Math.cos(angle)*rr,y=300+Math.sin(angle)*rr;
    roughLine(ctx,300,60,x,y,DIM,2,5);
    chalkCircle(ctx,x,y,10,ACCENTS[0],3,6,ACCENTS[0]);
    roughPath(ctx,[[250,63],[270,48],[290,64],[310,42],[335,65],[365,58]],ACCENTS[1],3,7);
  },[depth,angle]);

  const pick=(e:ReactPointerEvent<HTMLCanvasElement>)=>{
    const c=ref.current;if(!c)return;
    const box=c.getBoundingClientRect();
    const x=(e.clientX-box.left)/box.width*600-300;
    const y=(e.clientY-box.top)/box.height*600-300;
    const rr=Math.min(R,Math.hypot(x,y));
    const d=(1-rr/R)*6371;
    onPick(Math.max(0,Math.min(6371,d)),Math.atan2(y,x));
  };

  return <canvas ref={ref} className="chalk-canvas chalk-earth" onPointerDown={pick} onPointerMove={e=>{if(e.buttons===1)pick(e)}} role="img" aria-label="Corte da Terra desenhado em giz. Toque numa camada para explorar a profundidade."/>;
}
