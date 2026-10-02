"use client";
import { type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { assetPath } from "@/lib/asset-path";

const A={
  oak:assetPath("/assets/collage/oak.jpg"),
  brain:assetPath("/assets/collage/brain.jpg"),
  music:assetPath("/assets/collage/music.jpg"),
  talk:assetPath("/assets/collage/talk.jpg"),
  clock:assetPath("/assets/collage/clock.jpg"),
  reading:assetPath("/assets/collage/reading.jpg"),
  microscope:assetPath("/assets/collage/microscope.jpg"),
  switchboard:assetPath("/assets/collage/switchboard.jpg"),
  planets:assetPath("/assets/collage/planets.jpg"),
  mansion:assetPath("/assets/collage/mansion.jpg"),
  person:assetPath("/assets/collage/person.jpg"),
  ant:assetPath("/assets/collage/ant.jpg"),
  study:assetPath("/assets/collage/study.jpg"),
  seesaw:assetPath("/assets/collage/seesaw.jpg"),
  heron:assetPath("/assets/collage/heron.jpg"),
  questions:assetPath("/assets/collage/questions.jpg"),
  tower:assetPath("/assets/collage/tower.jpg"),
  palette:assetPath("/assets/collage/palette.jpg"),
  ship:assetPath("/assets/collage/ship.jpg"),
  ferry:assetPath("/assets/collage/ferry.jpg"),
  earth:assetPath("/assets/collage/earth.jpg"),
};

function Img({src,className="",alt="",style,priority=false}:{src:string;className?:string;alt?:string;style?:CSSProperties;priority?:boolean}){
  return <img src={src} alt={alt} className={"collage-img "+className} style={style} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"} decoding="async"/>;
}

function Tape({className=""}:{className?:string}){return <i className={"collage-tape "+className} aria-hidden="true"/>}
function Scribble({children,className=""}:{children:string;className?:string}){return <span className={"collage-scribble "+className}>{children}</span>}

const sceneAssets:Record<string,string[]> = {
  arvore:[A.oak],
  mente:[A.brain],
  musica:[A.music],
  conversa:[A.talk],
  vida:[A.clock],
  escala:[A.microscope],
  acaso:[A.planets],
  noite:[A.mansion],
  rede:[A.switchboard],
  cooperar:[A.ant],
  memoria:[A.study],
  mudanca:[A.seesaw],
  atencao:[A.heron],
  aleatorio:[A.person],
  perguntas:[A.questions],
  regra:[A.reading],
  minuto:[A.tower],
  stroop:[A.palette]
};

const accent:Record<string,string>={
  arvore:"#78834B",mente:"#64416F",musica:"#d8b84d",conversa:"#6aa4b2",vida:"#9b684d",escala:"#9aac5c",
  acaso:"#bd7294",noite:"#3b405c",rede:"#6ea683",cooperar:"#d57d66",memoria:"#8d79b8",mudanca:"#7daab6",
  atencao:"#d9b64c",aleatorio:"#bd7294",perguntas:"#6ea683",regra:"#7daab6",minuto:"#aa775a",
  stroop:"#76558b"
};

export function CollageCard({scene,className="",priority=false}:{scene:string;className?:string;priority?:boolean}){
  const imgs=sceneAssets[scene]||[A.reading];
  const color=accent[scene]||"#64416F";
  return <div className={"collage-card scene-"+scene+" "+className} style={{"--accent":color} as CSSProperties} aria-hidden="true">
    <div className="collage-paper collage-paper-main"/>
    <div className="collage-halftone"/>
    {imgs.map((src,i)=><Img key={src+i} src={src} className={"piece piece-"+i} priority={priority}/>)}
    {scene==="rede"&&<><span className="collage-node n1"/><span className="collage-node n2"/><span className="collage-node n3"/><span className="collage-node n4"/><b className="collage-bridge"/></>}
    {scene==="mudanca"&&<><b className="trajectory t1"/><b className="trajectory t2"/></>}
    {scene==="aleatorio"&&<><Scribble>←</Scribble><Scribble className="right">→</Scribble></>}
    {scene==="regra"&&<Scribble className="numbers">2 · 4 · 6 · ?</Scribble>}
    {scene==="stroop"&&<><Scribble className="stroop s1">AZUL</Scribble><Scribble className="stroop s2">VERDE</Scribble></>}
    <Tape className="top"/><Tape className="bottom"/>
  </div>;
}

type NetNode={x:number;y:number};
export function CollageNetwork({nodes,edges,seeds,dist,wave}:{nodes:NetNode[];edges:[number,number][];seeds:number[];dist:number[]|null;wave:number}){
  return <div className="collage-network" aria-hidden="true">
    <Img src={A.switchboard} className="network-archive"/>
    <svg viewBox="0 0 930 450" className="network-overlay">
      <path d="M465 26v396" className="net-divider"/>
      {edges.map(([a,b],i)=>{
        const active=!!dist&&dist[a]>=0&&dist[b]>=0&&Math.max(dist[a],dist[b])<=wave;
        return <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} className={active?"active":""}/>;
      })}
      {nodes.map((n,i)=>{
        const active=dist?dist[i]>=0&&dist[i]<=wave:seeds.includes(i);
        const just=!!dist&&dist[i]===wave&&wave>=0;
        const seed=seeds.includes(i);
        return <g key={i} className={(active?"active ":"")+(just?"just ":"")+(seed?"seed":"")}>
          {just&&<>
            <circle className="net-smoke s0" cx={n.x} cy={n.y} r="8"/>
            <circle className="net-smoke s1" cx={n.x-4} cy={n.y+2} r="6"/>
            <circle className="net-smoke s2" cx={n.x+5} cy={n.y-3} r="5"/>
          </>}
          <circle cx={n.x} cy={n.y} r={seed?23:16}/>
          <circle cx={n.x} cy={n.y} r="5" className="core"/>
        </g>;
      })}
    </svg>
    <Tape className="network-tape"/>
  </div>;
}

export function CollageShip({replaced,allOld=false,onPart}:{replaced:Set<number>;allOld?:boolean;onPart?:(id:number)=>void}){
  const parts=[
    ...Array.from({length:8},(_,i)=>({id:i,left:13+i*8.6,top:58,width:9,height:27})),
    {id:8,left:46,top:14,width:5,height:47},
    {id:9,left:49,top:17,width:23,height:39},
    {id:10,left:76,top:61,width:9,height:24},
    {id:11,left:49,top:10,width:16,height:18}
  ];
  return <div className="collage-ship-wrap">
    <Img src={allOld?A.ferry:A.ship} className="ship-archive"/>
    <div className="ship-paper-overlay"/>
    {parts.map(p=><i key={p.id} className={"ship-collage-part "+(!allOld&&replaced.has(p.id)?"new":"")} style={{left:p.left+"%",top:p.top+"%",width:p.width+"%",height:p.height+"%"}}/>)}
    {onPart&&parts.map(p=><button key={p.id} className="ship-collage-hit" aria-label={"substituir peça "+(p.id+1)} onClick={()=>onPart(p.id)} style={{left:p.left+"%",top:p.top+"%",width:p.width+"%",height:p.height+"%"}}/>)}
    <Tape className="ship-tape"/>
  </div>;
}

export function CollageEarth({depth,angle,onPick}:{depth:number;angle:number;onPick:(depth:number,angle:number)=>void}){
  const R=240;
  const rr=R*(1-depth/6371);
  const x=300+Math.cos(angle)*rr,y=300+Math.sin(angle)*rr;
  const pick=(e:ReactPointerEvent<SVGSVGElement>)=>{
    const box=e.currentTarget.getBoundingClientRect();
    const px=(e.clientX-box.left)/box.width*600-300;
    const py=(e.clientY-box.top)/box.height*600-300;
    const r=Math.min(R,Math.hypot(px,py));
    onPick((1-r/R)*6371,Math.atan2(py,px));
  };
  return <div className="collage-earth">
    <Img src={A.earth} className="earth-archive"/>
    <svg viewBox="0 0 600 600" className="earth-overlay" onPointerDown={pick} onPointerMove={e=>{if(e.buttons===1)pick(e)}}>
      <circle cx="300" cy="300" r="240" className="shell crust"/>
      <circle cx="300" cy="300" r={240*(1-2900/6371)} className="shell outer"/>
      <circle cx="300" cy="300" r={240*(1-5150/6371)} className="shell inner"/>
      <line x1="300" y1="60" x2={x} y2={y} className="earth-probe-line"/>
      <circle cx={x} cy={y} r="11" className="earth-probe"/>
    </svg>
    <Tape className="earth-tape"/>
  </div>;
}
