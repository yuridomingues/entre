"use client";
import { useEffect, useRef, useState } from "react";

const moments=[
  {year:1500,word:"SEMENTE",title:"uma semente começa",text:"O mundo ao redor ainda não sabe o que vai acontecer."},
  {year:1543,word:"CÉU",title:"o céu muda de lugar",text:"Copérnico publica um novo modelo do cosmos."},
  {year:1687,word:"ÓRBITA",title:"o movimento ganha regras",text:"Newton publica os Principia. A árvore continua ali."},
  {year:1859,word:"VIDA",title:"a vida ganha outra história",text:"Darwin publica A origem das espécies."},
  {year:1877,word:"SOM",title:"um som consegue voltar",text:"O fonógrafo permite registrar e reproduzir som."},
  {year:1969,word:"REDE",title:"máquinas começam a conversar",text:"A ARPANET transmite suas primeiras mensagens."},
  {year:1990,word:"WEB",title:"páginas começam a se ligar",text:"A World Wide Web começa a tomar forma."},
  {year:2026,word:"AGORA",title:"você chegou",text:"Cinco séculos passaram. A nossa régua continuou sendo a mesma árvore."}
];

export function TreeTimeline(){
  const ref=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    const update=()=>{
      if(!ref.current)return;
      const rect=ref.current.getBoundingClientRect();
      const total=ref.current.offsetHeight-innerHeight;
      setProgress(Math.max(0,Math.min(1,-rect.top/Math.max(total,1))));
    };
    update();
    addEventListener("scroll",update,{passive:true});
    return()=>removeEventListener("scroll",update);
  },[]);

  const index=Math.min(moments.length-1,Math.floor(progress*moments.length));
  const item=moments[index];
  const year=Math.round(1500+526*progress);
  const skyLight=84-Math.sin(progress*Math.PI)*9;

  return <div className="tree-v2" ref={ref}>
    <div className="tree-v2-stage" style={{background:`hsl(${92+progress*18} 45% ${skyLight}%)`}}>
      <div className="tree-v2-word" aria-hidden="true">{item.word}</div>
      <div className="tree-v2-year"><small>ano</small><strong>{year}</strong></div>

      <div className="tree-v2-sun" style={{transform:`translate(${progress*18}vw,${Math.sin(progress*Math.PI)*-9}vh)`}}/>

      <svg className="tree-v2-art" viewBox="0 0 560 680" aria-hidden="true">
        <path d="M281 660c-10-142-4-264 17-382m-12 116-111-94m113 32 111-113m-117 213-156 19m162 48 145 48" fill="none" stroke="currentColor" strokeWidth={14+progress*10} strokeLinecap="round"/>
        <g fill="currentColor" opacity={.5+progress*.5}>
          <circle cx="150" cy="219" r={58+progress*24}/><circle cx="266" cy="154" r={72+progress*32}/><circle cx="390" cy="224" r={62+progress*28}/>
          <circle cx="112" cy="355" r={48+progress*20}/><circle cx="232" cy="327" r={70+progress*30}/><circle cx="373" cy="345" r={70+progress*28}/><circle cx="452" cy="407" r={43+progress*16}/>
        </g>
      </svg>

      <div className="tree-v2-card" key={item.year}>
        <span>{item.year}</span><h2>{item.title}</h2><p>{item.text}</p>
      </div>

      <div className="tree-v2-progress"><i style={{width:`${progress*100}%`}}/></div>
      <div className="tree-v2-hint">role para continuar ↓</div>
    </div>

    <section className="tree-v2-ending">
      <div className="tree-cut" aria-hidden="true">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div>
      <div><span>526 anos</span><h2>A árvore nunca viu uma linha do tempo.</h2><p>Ela só cresceu. Datas são uma maneira humana de colocar bordas em algo que não para.</p></div>
    </section>
  </div>
}
