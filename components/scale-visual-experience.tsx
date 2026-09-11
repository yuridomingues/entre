"use client";
import { useEffect, useRef, useState } from "react";

type Kind="grain"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"mountain"|"earth";

type Item={
  kind:Kind;
  name:string;
  size:string;
  meters:number;
  measure:string;
  color:string;
  scene:string;
};

const items:Item[]=[
  {kind:"grain",name:"grão de areia",size:"1 mm",meters:.001,measure:"diâmetro",color:"#8d5cf6",scene:"sand"},
  {kind:"coin",name:"moeda",size:"2,5 cm",meters:.025,measure:"diâmetro",color:"#f2ba32",scene:"desk"},
  {kind:"phone",name:"celular",size:"15 cm",meters:.15,measure:"altura",color:"#62b9d3",scene:"desk"},
  {kind:"person",name:"pessoa",size:"1,7 m",meters:1.7,measure:"altura",color:"#8757f2",scene:"street"},
  {kind:"bus",name:"ônibus",size:"3,2 m",meters:3.2,measure:"altura",color:"#f2ba32",scene:"street"},
  {kind:"building",name:"prédio",size:"30 m",meters:30,measure:"altura",color:"#aa91ef",scene:"city"},
  {kind:"tree",name:"sequoia",size:"80 m",meters:80,measure:"altura",color:"#527b3f",scene:"forest"},
  {kind:"mountain",name:"Everest",size:"8,8 km",meters:8849,measure:"altura",color:"#8194a6",scene:"mountain"},
  {kind:"earth",name:"Terra",size:"12.742 km",meters:12742000,measure:"diâmetro",color:"#6e7ed9",scene:"space"}
];

const fmt=(n:number)=>{
  if(n>=1000)return Math.round(n).toLocaleString("pt-BR");
  if(n>=10)return n.toFixed(1).replace(".",",");
  return n.toFixed(1).replace(".",",");
};

function Illustration({kind}:{kind:Kind}){
  if(kind==="grain")return <svg className="illustration grain" viewBox="0 0 180 180" aria-hidden="true">
    <defs>
      <radialGradient id="grainGlow"><stop offset="0" stopColor="#fff6c7"/><stop offset="1" stopColor="#efc35d"/></radialGradient>
    </defs>
    <path d="M12 146c44-39 101-45 156-17v39H12Z" fill="#f1b38f" stroke="#111" strokeWidth="6"/>
    <path d="M18 145c38-24 77-27 115-12" fill="none" stroke="#d8896a" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="102" cy="119" rx="15" ry="12" fill="url(#grainGlow)" stroke="#111" strokeWidth="5" transform="rotate(-16 102 119)"/>
    <circle cx="97" cy="114" r="3" fill="#fff"/>
  </svg>;

  if(kind==="coin")return <svg className="illustration coin" viewBox="0 0 180 180" aria-hidden="true">
    <defs><linearGradient id="coinFill" x1="0" x2="1"><stop stopColor="#ffd65f"/><stop offset=".5" stopColor="#f2b62c"/><stop offset="1" stopColor="#ffe082"/></linearGradient></defs>
    <circle cx="90" cy="90" r="76" fill="url(#coinFill)" stroke="#111" strokeWidth="7"/>
    <circle cx="90" cy="90" r="59" fill="none" stroke="#111" strokeWidth="4"/>
    <path d="M73 70c13-15 39-10 39 8 0 10-8 16-17 21-10 6-18 11-18 22h41" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path className="coin-shine" d="M43 36 66 23M55 49 84 25" stroke="#fff7c9" strokeWidth="7" strokeLinecap="round"/>
  </svg>;

  if(kind==="phone")return <svg className="illustration phone" viewBox="0 0 150 240" aria-hidden="true">
    <rect x="20" y="4" width="110" height="232" rx="25" fill="#111"/>
    <rect x="29" y="17" width="92" height="193" rx="16" fill="#9edcea"/>
    <path className="phone-wave" d="M40 137c17-35 28 27 43-8 12-28 22 20 33-19" fill="none" stroke="#8757f2" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="75" cy="222" r="7" fill="#fffdf8"/>
    <rect x="58" y="9" width="34" height="5" rx="3" fill="#fffdf8"/>
    <circle cx="105" cy="44" r="10" fill="#ffd45b" stroke="#111" strokeWidth="4"/>
  </svg>;

  if(kind==="person")return <svg className="illustration person" viewBox="0 0 150 300" aria-hidden="true">
    <ellipse cx="76" cy="289" rx="53" ry="9" fill="rgba(0,0,0,.12)"/>
    <circle cx="76" cy="43" r="31" fill="#efb08d" stroke="#111" strokeWidth="7"/>
    <path d="M49 40c4-27 55-35 62 1-12-7-23-12-35-12-11 0-20 4-27 11Z" fill="#332d2b"/>
    <path d="M39 93c15-18 59-18 74 0l8 82-31 4-4-52-3 65 24 88H78l-8-57-8 57H34l25-88-3-66-7 53-31-5Z" fill="#8757f2" stroke="#111" strokeWidth="7" strokeLinejoin="round"/>
    <path className="person-arm" d="M43 104 15 155" stroke="#111" strokeWidth="18" strokeLinecap="round"/>
    <path d="M34 280h31M77 280h31" stroke="#111" strokeWidth="9" strokeLinecap="round"/>
    <circle cx="65" cy="48" r="3" fill="#111"/><circle cx="87" cy="48" r="3" fill="#111"/>
    <path d="M69 62c5 3 10 3 15 0" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
  </svg>;

  if(kind==="bus")return <svg className="illustration bus" viewBox="0 0 220 300" aria-hidden="true">
    <ellipse cx="110" cy="290" rx="86" ry="9" fill="rgba(0,0,0,.12)"/>
    <rect x="29" y="9" width="162" height="267" rx="37" fill="#ffd45b" stroke="#111" strokeWidth="9"/>
    <rect x="48" y="35" width="124" height="26" rx="8" fill="#111"/>
    <text x="110" y="54" fill="#fffdf8" fontSize="17" fontWeight="900" textAnchor="middle">CENTRO</text>
    <rect x="45" y="76" width="130" height="105" rx="17" fill="#c7eaf2" stroke="#111" strokeWidth="8"/>
    <path d="M110 80v98" stroke="#111" strokeWidth="6"/>
    <path d="M52 141h116" stroke="#111" strokeWidth="5"/>
    <circle className="bus-light left" cx="62" cy="218" r="15" fill="#fff4a6" stroke="#111" strokeWidth="6"/>
    <circle className="bus-light right" cx="158" cy="218" r="15" fill="#fff4a6" stroke="#111" strokeWidth="6"/>
    <rect x="59" y="244" width="102" height="15" rx="7" fill="#111"/>
    <circle cx="52" cy="269" r="20" fill="#111"/><circle cx="168" cy="269" r="20" fill="#111"/>
    <rect x="50" y="192" width="120" height="7" rx="4" fill="#111"/>
  </svg>;

  if(kind==="building")return <svg className="illustration building" viewBox="0 0 220 360" aria-hidden="true">
    <ellipse cx="110" cy="351" rx="88" ry="8" fill="rgba(0,0,0,.12)"/>
    <rect x="38" y="10" width="144" height="334" rx="7" fill="#b8a6f1" stroke="#111" strokeWidth="9"/>
    <rect x="89" y="297" width="43" height="47" fill="#111"/>
    {Array.from({length:6}).map((_,r)=>Array.from({length:3}).map((__,c)=><rect className="building-window" key={`${r}-${c}`} x={58+c*43} y={42+r*39} width="23" height="22" rx="3" fill={(r+c)%4===0?"#ffd45b":"#fffdf8"} stroke="#111" strokeWidth="4"/>))}
    <path d="M25 344h170" stroke="#111" strokeWidth="7" strokeLinecap="round"/>
  </svg>;

  if(kind==="tree")return <svg className="illustration tree" viewBox="0 0 260 430" aria-hidden="true">
    <ellipse cx="130" cy="420" rx="95" ry="9" fill="rgba(0,0,0,.12)"/>
    <path d="M105 411c8-94 13-185 14-283h27c1 100 7 194 18 283Z" fill="#865638" stroke="#111" strokeWidth="9"/>
    <path d="M131 8 88 83h24L70 139h31l-53 69h44l-59 83h52l-46 75h185l-46-75h51l-58-83h43l-52-69h31l-42-56h24Z" fill="#638b4c" stroke="#111" strokeWidth="9" strokeLinejoin="round"/>
    <g className="tree-specks" fill="#9bc47f"><circle cx="103" cy="117" r="9"/><circle cx="150" cy="164" r="11"/><circle cx="88" cy="229" r="9"/><circle cx="174" cy="258" r="12"/><circle cx="116" cy="318" r="10"/></g>
  </svg>;

  if(kind==="mountain")return <svg className="illustration mountain" viewBox="0 0 420 300" aria-hidden="true">
    <ellipse cx="210" cy="287" rx="184" ry="8" fill="rgba(0,0,0,.1)"/>
    <path d="M11 279 132 93l45 53 69-120 164 253Z" fill="#9aa9b7" stroke="#111" strokeWidth="9" strokeLinejoin="round"/>
    <path d="m132 93 45 53 69-120 54 83-39-18-31 34-33-27-32 33Z" fill="#fffdf8" stroke="#111" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M42 280 139 173l30 37 35-54 46 61 42-49 93 112Z" fill="#7d8e9d" opacity=".58"/>
    <g className="mountain-cloud" fill="#fffdf8" stroke="#111" strokeWidth="4"><circle cx="78" cy="64" r="20"/><circle cx="104" cy="57" r="27"/><circle cx="132" cy="66" r="18"/><rect x="76" y="65" width="60" height="20" rx="10"/></g>
  </svg>;

  return <svg className="illustration earth" viewBox="0 0 320 320" aria-hidden="true">
    <defs><clipPath id="earthClip"><circle cx="160" cy="160" r="143"/></clipPath></defs>
    <circle cx="160" cy="160" r="148" fill="#6e7ed9" stroke="#111" strokeWidth="10"/>
    <g className="earth-land" clipPath="url(#earthClip)" fill="#79a85d" stroke="#111" strokeWidth="5">
      <path d="M35 94c32-38 74-50 103-28l11 38 39 12 8 39-29 25-7 57-44-11-20-51-41-18-18-38Z"/>
      <path d="M207 47c30 6 55 23 69 47l-30 20-32-18Z"/>
      <path d="M235 191c28 5 50 18 66 36l-22 45-39 12-25-35Z"/>
    </g>
    <path d="M41 73c36-47 78-58 118-57" fill="none" stroke="#cfd7ff" strokeWidth="6" strokeLinecap="round" opacity=".75"/>
    <circle cx="160" cy="160" r="148" fill="none" stroke="#111" strokeWidth="10"/>
  </svg>;
}

function SceneDecor({scene}:{scene:string}){
  if(scene==="space")return <div className="scene-decor space-decor">{Array.from({length:34}).map((_,i)=><i key={i} style={{left:`${(i*37)%96}%`,top:`${(i*61)%72}%`}}/>)}</div>;
  if(scene==="mountain")return <div className="scene-decor mountain-decor"><i/><i/><i/></div>;
  if(scene==="forest")return <div className="scene-decor forest-decor"><i/><i/><i/><i/></div>;
  if(scene==="city"||scene==="street")return <div className="scene-decor city-decor"><i/><i/><i/><i/></div>;
  return <div className="scene-decor desk-decor"><i/><i/></div>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(1);
  const touchStart=useRef<number|null>(null);
  const current=items[index];
  const previous=items[index-1];
  const ratio=current.meters/previous.meters;
  const previousPct=100/ratio;
  const tooSmall=previousPct<7;

  const next=()=>setIndex(v=>v===items.length-1?1:v+1);
  const back=()=>setIndex(v=>Math.max(1,v-1));

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="ArrowRight")next();
      if(event.key==="ArrowLeft")back();
    };
    addEventListener("keydown",onKey);
    return()=>removeEventListener("keydown",onKey);
  },[]);

  return <div className="scale-story">
    <section className={`scale-story-card scene-${current.scene}`}>
      <header className="scale-story-head">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          <h2>{current.name}</h2>
          <strong>{current.size}</strong>
        </div>
        <div className="scale-story-ratio">
          <small>{previous.name} → {current.name}</small>
          <b>{fmt(ratio)}×</b>
          <span>na mesma medida</span>
        </div>
      </header>

      <div
        className="scale-story-scene"
        onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null}}
        onTouchEnd={e=>{
          if(touchStart.current===null)return;
          const end=e.changedTouches[0]?.clientX??touchStart.current;
          if(end-touchStart.current<-45)next();
          if(end-touchStart.current>45)back();
          touchStart.current=null;
        }}
      >
        <SceneDecor scene={current.scene}/>
        <div className="story-ground"/>

        <div className="story-object previous" key={`prev-${index}`} style={{height:`${Math.max(.6,previousPct)}%`,color:previous.color}}>
          <Illustration kind={previous.kind}/>
          <span className="object-name">{previous.name}<small>{previous.size}</small></span>
        </div>

        <div className="story-object current" key={`current-${index}`} style={{color:current.color}}>
          <Illustration kind={current.kind}/>
          <span className="object-name">{current.name}<small>{current.size}</small></span>
        </div>

        <div className="story-measure current-measure"><i/><span>{current.size}</span><i/></div>

        {previousPct>=7&&<div className="story-measure previous-measure" style={{height:`${previousPct}%`}}><i/><span>{previous.size}</span><i/></div>}

        {tooSmall&&<aside className="story-loupe">
          <small>ampliado para enxergar</small>
          <div><Illustration kind={previous.kind}/></div>
          <strong>{previous.name}</strong>
          <span>na cena ele continua na proporção real</span>
        </aside>}
      </div>

      <div className="scale-story-copy">
        <p><strong>{previous.name}</strong> mede cerca de <b>{previousPct<1?"menos de 1":fmt(previousPct)}%</b> de {current.name} nesta comparação.</p>
        <span>{current.measure}</span>
      </div>

      <div className="scale-story-controls">
        <button onClick={back} disabled={index===1}>←</button>
        <div>
          <span>{index===items.length-1?"do grão ao planeta":"próxima escala"}</span>
          <div className="story-progress"><i style={{width:`${((index)/ (items.length-1))*100}%`}}/></div>
        </div>
        <button className="primary" onClick={next}>{index===items.length-1?"↺":"→"}</button>
      </div>
      <p className="story-hint">setas do teclado ou deslize no celular</p>
    </section>

    <nav className="scale-story-nav" aria-label="Comparações">
      {items.slice(1).map((item,i)=><button key={item.kind} className={index===i+1?"active":""} onClick={()=>setIndex(i+1)}>
        <span>{String(i+2).padStart(2,"0")}</span><strong>{item.name}</strong><small>{item.size}</small>
      </button>)}
    </nav>
  </div>;
}
