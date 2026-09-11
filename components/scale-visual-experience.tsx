"use client";
import { useEffect, useRef, useState } from "react";

type Kind="grain"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"mountain"|"earth";
type Item={kind:Kind;name:string;size:string;meters:number;measure:string};

const items:Item[]=[
  {kind:"grain",name:"grão de areia",size:"1 mm",meters:.001,measure:"diâmetro"},
  {kind:"coin",name:"moeda",size:"2,5 cm",meters:.025,measure:"diâmetro"},
  {kind:"phone",name:"celular",size:"15 cm",meters:.15,measure:"altura"},
  {kind:"person",name:"pessoa",size:"1,7 m",meters:1.7,measure:"altura"},
  {kind:"bus",name:"ônibus",size:"3,2 m",meters:3.2,measure:"altura"},
  {kind:"building",name:"prédio",size:"30 m",meters:30,measure:"altura"},
  {kind:"tree",name:"sequoia",size:"80 m",meters:80,measure:"altura"},
  {kind:"mountain",name:"Everest",size:"8,8 km",meters:8849,measure:"altura"},
  {kind:"earth",name:"Terra",size:"12.742 km",meters:12742000,measure:"diâmetro"}
];

const fmt=(n:number)=>{
  if(n>=1000)return Math.round(n).toLocaleString("pt-BR");
  return n.toFixed(1).replace(".",",");
};

const line={fill:"none",stroke:"currentColor",strokeWidth:3.5,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,vectorEffect:"non-scaling-stroke" as const};

function Lines({kind}:{kind:Kind}){
  if(kind==="grain")return <><ellipse cx="50" cy="51" rx="30" ry="21" transform="rotate(-9 50 51)" {...line}/><path d="M29 49c10-8 25-11 39-7M36 62c10 4 22 4 31-1" {...line} strokeWidth="2"/></>;
  if(kind==="coin")return <><path d="M50 7c26 0 43 18 43 43S76 93 50 93 7 76 7 50 24 7 50 7Z" {...line}/><path d="M50 16c20 0 34 14 34 34S70 84 50 84 16 70 16 50 30 16 50 16Z" {...line} strokeWidth="2"/><path d="M42 38c5-6 16-5 18 2 2 6-4 9-9 12-5 3-8 6-8 11h18" {...line}/></>;
  if(kind==="phone")return <><path d="M12 5c10-2 36-2 46 0 3 24 3 86 0 109-11 2-35 2-46 0-3-25-3-84 0-109Z" {...line}/><path d="M20 18c8-1 22-1 30 0v72c-8 1-22 1-30 0ZM29 104c4 1 8 1 12 0" {...line} strokeWidth="2.2"/></>;
  if(kind==="person")return <><path d="M45 6c9 0 15 6 15 14 0 9-6 15-15 15-8 0-14-6-14-15 0-8 6-14 14-14ZM45 36c-2 20-1 46 0 68M22 62c8-8 14-15 23-21 9 6 16 13 24 20M45 104c-7 21-13 43-18 67M45 104c8 21 15 43 22 67" {...line}/></>;
  if(kind==="bus")return <><path d="M24 6c18-3 64-3 82 0 6 34 7 121 1 154-18 4-64 4-84 0-6-34-5-121 1-154Z" {...line}/><path d="M34 26c16-2 47-2 62 0M33 44c17-2 48-2 64 0v65c-17 2-48 2-64 0ZM65 44v65M38 129c17-2 38-2 55 0" {...line} strokeWidth="2.5"/><circle cx="40" cy="144" r="7" {...line}/><circle cx="90" cy="144" r="7" {...line}/><path d="M31 160v14M99 160v14" {...line}/></>;
  if(kind==="building")return <><path d="M20 5c18-2 50-2 69 0 2 53 2 158 0 210-18 2-51 2-69 0-2-51-2-157 0-210Z" {...line}/>{[0,1,2,3,4].map(r=>[0,1].map(c=><path key={`${r}-${c}`} d={`M${33+c*30} ${25+r*32}h14v17h-14Z`} {...line} strokeWidth="2"/>))}<path d="M45 215v-33h20v33" {...line}/></>;
  if(kind==="tree")return <><path d="M56 254c3-59 5-114 4-168M74 254c-4-60-7-114-5-168" {...line}/><path d="M66 5C56 25 46 44 37 61l16-1c-9 16-18 30-26 44h21c-10 17-19 32-28 47h25c-11 18-21 35-31 51h102c-10-17-21-34-31-51h25c-9-16-18-31-28-47h21c-8-15-17-29-26-44h16C84 43 75 24 66 5Z" {...line}/><path d="M50 220c10-4 21-4 31 0" {...line} strokeWidth="2"/></>;
  if(kind==="mountain")return <><path d="M7 173c24-31 47-62 69-92 10 11 19 21 28 31 15-26 30-52 45-77 35 46 70 92 105 138" {...line}/><path d="M77 81c9 10 18 21 27 31 15-26 30-52 45-77 11 15 22 30 34 46-8-4-16-7-23-10-6 7-11 13-17 20-7-5-13-11-20-16-7 6-13 12-20 18" {...line} strokeWidth="2.2"/><path d="M7 173c82 2 164 2 247 0" {...line} strokeWidth="2"/></>;
  return <><path d="M100 8c52 0 91 40 91 92 0 51-40 91-91 91S9 151 9 100 49 8 100 8Z" {...line}/><path d="M39 67c19-20 44-25 62-13 3 7 6 15 8 22 9 3 18 5 26 8l5 24-18 16-5 34-28-6-13-31-26-11-12-25M132 37c19 4 36 15 47 30-7 5-14 9-20 13l-22-11M141 132c18 3 32 11 42 24" {...line} strokeWidth="2.2"/></>;
}


function Paint({kind}:{kind:Kind}){
  if(kind==="grain")return <ellipse cx="50" cy="51" rx="30" ry="21" transform="rotate(-9 50 51)" fill="#f1cd65" opacity=".95"/>;
  if(kind==="coin")return <circle cx="50" cy="50" r="42" fill="#f1cd65"/>;
  if(kind==="phone")return <path d="M12 5c10-2 36-2 46 0 3 24 3 86 0 109-11 2-35 2-46 0-3-25-3-84 0-109Z" fill="#7ab9da"/>;
  if(kind==="person")return <><circle cx="45" cy="20" r="14" fill="#fffaf0"/><path d="M31 39c8-6 20-6 28 0l7 65H25Z" fill="#8466d7"/></>;
  if(kind==="bus")return <path d="M24 6c18-3 64-3 82 0 6 34 7 121 1 154-18 4-64 4-84 0-6-34-5-121 1-154Z" fill="#ef8a70"/>;
  if(kind==="building")return <path d="M20 5c18-2 50-2 69 0 2 53 2 158 0 210-18 2-51 2-69 0-2-51-2-157 0-210Z" fill="#fffaf0"/>;
  if(kind==="tree")return <><path d="M56 254c3-59 5-114 4-168h9c-2 54 1 109 5 168Z" fill="#bd8156"/><path d="M66 5C56 25 46 44 37 61l16-1c-9 16-18 30-26 44h21c-10 17-19 32-28 47h25c-11 18-21 35-31 51h102c-10-17-21-34-31-51h25c-9-16-18-31-28-47h21c-8-15-17-29-26-44h16C84 43 75 24 66 5Z" fill="#8ecb78"/></>;
  if(kind==="mountain")return <><path d="M7 173 76 81l28 31 45-77 105 138Z" fill="#8ecb78"/><path d="m104 112 45-77 34 46-23-10-17 20-20-16-20 18Z" fill="#fffaf0"/></>;
  return <><circle cx="100" cy="100" r="91" fill="#7ab9da"/><path d="M39 67c19-20 44-25 62-13l8 22 26 8 5 24-18 16-5 34-28-6-13-31-26-11-12-25M132 37c19 4 36 15 47 30l-20 13-22-11M141 132c18 3 32 11 42 24" fill="#8ecb78"/></>;
}

function Doodle({kind}:{kind:Kind}){
  const viewBox=kind==="phone"?"0 0 70 120":kind==="person"?"0 0 90 180":kind==="bus"?"0 0 130 180":kind==="building"?"0 0 110 220":kind==="tree"?"0 0 130 260":kind==="mountain"?"0 0 260 180":kind==="earth"?"0 0 200 200":"0 0 100 100";
  return <svg viewBox={viewBox} aria-hidden="true" className="doodle-svg">
    <defs>
      <filter id={`rough-${kind}`} x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency=".015 .06" numOctaves="1" seed={kind.length*7}/>
        <feDisplacementMap in="SourceGraphic" scale="1.2"/>
      </filter>
    </defs>
    <g className="doodle-paint"><Paint kind={kind}/></g>
    <g className="doodle-echo" transform="translate(1.2 -0.7)"><Lines kind={kind}/></g>
    <g filter={`url(#rough-${kind})`}><Lines kind={kind}/></g>
  </svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(1);
  const [guess,setGuess]=useState(38);
  const [revealed,setRevealed]=useState(false);
  const touchStart=useRef<number|null>(null);
  const current=items[index];
  const previous=items[index-1];
  const ratio=current.meters/previous.meters;
  const previousPct=100/ratio;
  const currentHeight=72;
  const actualPreviousHeight=currentHeight*(previous.meters/current.meters);
  const guessRatio=Math.exp(Math.log(1.2)+(guess/100)*Math.log(2000/1.2));
  const shownRatio=revealed?ratio:guessRatio;
  const shownPreviousHeight=currentHeight/shownRatio;
  const tooSmall=(revealed?actualPreviousHeight:shownPreviousHeight)<5;

  useEffect(()=>{setRevealed(false);setGuess(38)},[index]);

  const advance=()=>{
    if(!revealed){setRevealed(true);return}
    setIndex(v=>v===items.length-1?1:v+1);
  };
  const back=()=>setIndex(v=>Math.max(1,v-1));

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="ArrowRight")advance();
      if(event.key==="ArrowLeft")back();
    };
    addEventListener("keydown",onKey);
    return()=>removeEventListener("keydown",onKey);
  },[revealed,index]);

  return <div className="scale-doodle">
    <section className="scale-doodle-card">
      <header className="scale-doodle-head">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          <h2>{previous.name} <em>e</em> {current.name}</h2>
        </div>
        <div className={`scale-doodle-ratio ${revealed?"revealed":""}`}>
          <b>{revealed?fmt(ratio):"?"}</b>
          <span>{revealed?current.measure:"descubra"}</span>
        </div>
      </header>

      <div className="scale-guess">
        <div>
          <span>{revealed?"seu palpite":"antes de revelar"}</span>
          <strong>{fmt(guessRatio)}×</strong>
          {revealed&&<small>real: {fmt(ratio)}×</small>}
        </div>
        <label>
          <span>quanto maior você acha que {current.name} é?</span>
          <input aria-label={`Palpite de quantas vezes ${current.name} é maior`} type="range" min="0" max="100" value={guess} onChange={e=>{setGuess(Number(e.target.value));setRevealed(false)}}/>
          <div><small>quase igual</small><small>muito maior</small></div>
        </label>
        <button onClick={()=>setRevealed(true)}>{revealed?"revelado ✓":"revelar"}</button>
      </div>

      <div
        className={`doodle-paper ${revealed?"is-revealed":"is-guessing"}`}
        onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null}}
        onTouchEnd={e=>{
          if(touchStart.current===null)return;
          const end=e.changedTouches[0]?.clientX??touchStart.current;
          if(end-touchStart.current<-45)advance();
          if(end-touchStart.current>45)back();
          touchStart.current=null;
        }}
      >
        <svg className="doodle-floor" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M30 39c180 3 344-2 518 1 151 3 286 1 423-1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          <path d="M34 43c164-1 343 3 511 0 149-2 288 2 420 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35"/>
        </svg>

        <div className="doodle-object previous" key={`p-${index}-${revealed}`} style={{height:`${Math.max(.25,revealed?actualPreviousHeight:shownPreviousHeight)}%`}}>
          <Doodle kind={previous.kind}/>
          <div className="doodle-label"><strong>{previous.name}</strong><span>{previous.size}</span></div>
        </div>

        <div className="doodle-object current" key={`c-${index}`} style={{height:`${currentHeight}%`}}>
          <Doodle kind={current.kind}/>
          <div className="doodle-label"><strong>{current.name}</strong><span>{revealed?current.size:"?"}</span></div>
        </div>

        {revealed&&<div className="doodle-measure">
          <svg viewBox="0 0 36 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 8c-2 72 3 141 0 211-1 26 1 49 0 72M8 11l10-5 10 5M8 289l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{current.size}</span>
        </div>}

        {tooSmall&&<div className="doodle-note">
          <span>{revealed?"zoom":"seu palpite"}</span>
          <div><Doodle kind={previous.kind}/></div>
          <small>{previous.name}</small>
        </div>}
      </div>

      <p className="scale-doodle-sentence">
        {revealed
          ? <>{previous.name} mede <strong>{previousPct<1?"menos de 1":fmt(previousPct)}%</strong> de {current.name} nesta comparação.</>
          : <>Ajuste a diferença até ela parecer certa. <strong>Depois revele.</strong></>}
      </p>

      <div className="scale-doodle-controls">
        <button onClick={back} disabled={index===1}>← anterior</button>
        <div className="scale-doodle-progress"><i style={{width:`${(index/(items.length-1))*100}%`}}/></div>
        <button className="primary" onClick={advance}>{!revealed?"revelar →":index===items.length-1?"recomeçar ↺":"próxima →"}</button>
      </div>
      <p className="scale-doodle-hint">arraste o palpite · use as setas ou deslize no celular</p>
    </section>

    <nav className="scale-doodle-nav" aria-label="Comparações">
      {items.slice(1).map((item,i)=><button key={item.kind} className={index===i+1?"active":""} onClick={()=>setIndex(i+1)}>
        <span>{String(i+2).padStart(2,"0")}</span><strong>{item.name}</strong><small>{item.size}</small>
      </button>)}
    </nav>
  </div>;
}
