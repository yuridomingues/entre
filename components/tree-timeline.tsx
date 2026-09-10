"use client";
import { useEffect, useRef, useState } from "react";

const moments = [
  { year:1500, word:"SEMENTE", title:"uma semente começa", text:"Nada grandioso acontece para a árvore. Ela só começa." },
  { year:1543, word:"CÉU", title:"o céu muda de lugar", text:"Copérnico publica um modelo que reorganiza a posição da Terra no cosmos." },
  { year:1687, word:"ÓRBITA", title:"o movimento ganha regras", text:"Newton publica os Principia. A árvore continua crescendo." },
  { year:1859, word:"VIDA", title:"a vida ganha outra história", text:"Darwin publica A origem das espécies. Já se passaram 359 anos." },
  { year:1877, word:"SOM", title:"um som pode voltar", text:"O fonógrafo permite gravar e reproduzir som." },
  { year:1969, word:"REDE", title:"máquinas começam a conversar", text:"A ARPANET transmite suas primeiras mensagens." },
  { year:1990, word:"WEB", title:"páginas começam a se ligar", text:"A World Wide Web começa a tomar forma no CERN." },
  { year:2026, word:"AGORA", title:"você chegou", text:"Cinco séculos caberam numa única vida vegetal imaginária." }
];

export function TreeTimeline(){
  const ref=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    const onScroll=()=>{
      if(!ref.current)return;
      const rect=ref.current.getBoundingClientRect();
      const total=ref.current.offsetHeight-innerHeight;
      setProgress(Math.max(0,Math.min(1,-rect.top/Math.max(total,1))));
    };
    onScroll();
    addEventListener("scroll",onScroll,{passive:true});
    return()=>removeEventListener("scroll",onScroll);
  },[]);

  const index=Math.min(moments.length-1,Math.floor(progress*moments.length));
  const moment=moments[index];
  const year=Math.round(1500+progress*526);

  return <div className="tree-trip" ref={ref}>
    <div className="tree-trip-sticky">
      <div className="tree-ghost-word" aria-hidden="true">{moment.word}</div>
      <div className="tree-time"><small>ano</small><strong>{year}</strong></div>

      <svg className="tree-main" viewBox="0 0 520 640" aria-hidden="true" style={{transform:`translateX(-50%) scale(${.48+progress*.52})`}}>
        <g fill="none" stroke="currentColor" strokeWidth="17" strokeLinecap="round">
          <path d="M260 620c-8-136-2-247 16-360m-12 106-99-84m101 27 101-103m-105 194-145 20m151 39 132 42"/>
        </g>
        <g fill="currentColor">
          <circle cx="143" cy="214" r="75"/><circle cx="249" cy="151" r="95"/><circle cx="365" cy="218" r="82"/>
          <circle cx="110" cy="335" r="65"/><circle cx="225" cy="314" r="93"/><circle cx="357" cy="332" r="92"/><circle cx="426" cy="393" r="54"/>
        </g>
      </svg>

      <div className="tree-moment" key={moment.year}>
        <span>{moment.year}</span>
        <h2>{moment.title}</h2>
        <p>{moment.text}</p>
      </div>

      <div className="tree-ruler" aria-label="Linha do tempo">
        {moments.map((item,i)=><i key={item.year} className={i<=index?"seen":""}><b>{item.year}</b></i>)}
      </div>
      <div className="tree-hint">continue rolando ↓</div>
    </div>

    <section className="tree-after">
      <span>526 anos</span>
      <h2>A parte estranha é que a árvore não viu uma linha do tempo.</h2>
      <p>Ela só cresceu. Os eventos, as invenções e as datas são a nossa maneira de organizar o que aconteceu ao redor.</p>
      <div className="tree-rings-simple" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
    </section>
  </div>
}
