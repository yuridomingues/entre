"use client";
import { useEffect, useRef, useState } from "react";

const moments=[
  {year:1500,label:"semente",title:"começa pequena",text:"Uma semente encontra espaço, água e luz. O resto ainda é possibilidade."},
  {year:1543,label:"céu",title:"o céu muda",text:"Copérnico publica um modelo em que a Terra deixa de ocupar o centro."},
  {year:1687,label:"movimento",title:"o movimento ganha regras",text:"Newton publica ideias que conectam queda, força e órbita."},
  {year:1859,label:"vida",title:"a vida ganha outra história",text:"Darwin publica A origem das espécies."},
  {year:1877,label:"som",title:"um som consegue voltar",text:"O fonógrafo mostra que um som pode ser registrado e ouvido depois."},
  {year:1969,label:"rede",title:"máquinas começam a conversar",text:"A ARPANET envia suas primeiras mensagens entre computadores."},
  {year:1990,label:"web",title:"páginas começam a se ligar",text:"A World Wide Web começa a transformar documentos em uma rede navegável."},
  {year:2026,label:"agora",title:"você chegou",text:"A árvore atravessou tudo isso sem saber o nome de nenhum desses acontecimentos."}
];

const leaves=[
  [183,196,-18],[204,170,12],[230,151,-9],[258,159,16],[286,178,-11],[309,207,20],
  [155,228,12],[187,232,-15],[223,214,8],[262,220,-17],[296,242,10],[329,254,-12],
  [137,267,-18],[174,278,13],[211,263,-8],[251,274,18],[291,286,-15],[320,304,9],
  [163,316,14],[205,306,-12],[245,320,10],[280,330,-17]
];

function phase(progress:number,start:number,end:number){
  if(progress<=start)return 0;
  if(progress>=end)return 1;
  return (progress-start)/(end-start);
}

function drawStyle(p:number){
  return {strokeDasharray:1,strokeDashoffset:1-p};
}

export function TreeExperience(){
  const ref=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    const update=()=>{
      if(!ref.current)return;
      const rect=ref.current.getBoundingClientRect();
      const total=Math.max(1,ref.current.offsetHeight-window.innerHeight);
      setProgress(Math.max(0,Math.min(1,-rect.top/total)));
    };
    update();
    addEventListener("scroll",update,{passive:true});
    addEventListener("resize",update);
    return()=>{removeEventListener("scroll",update);removeEventListener("resize",update)};
  },[]);

  const index=Math.min(moments.length-1,Math.floor(progress*moments.length));
  const item=moments[index];
  const year=Math.round(1500+526*progress);
  const age=year-1500;

  const seedP=phase(progress,0,.035);
  const rootP=phase(progress,.015,.11);
  const sproutP=phase(progress,.055,.17);
  const trunkP=phase(progress,.12,.42);
  const branchP=phase(progress,.32,.64);
  const twigP=phase(progress,.53,.78);
  const leafP=phase(progress,.68,.93);
  const ageP=phase(progress,.8,1);

  const growthLabel=
    progress<.04?"semente":
    progress<.12?"criando raízes":
    progress<.20?"primeiro broto":
    progress<.43?"crescendo":
    progress<.66?"abrindo galhos":
    progress<.82?"ramificando":
    progress<.94?"ganhando folhas":"árvore adulta";

  const sky="hsl("+(99+progress*7)+" "+(34+progress*5)+"% "+(91-progress*8)+"%)";

  return <div className="tree-story tree-story-v4" ref={ref}>
    <div className="tree-story-stage" style={{background:sky}}>
      <div className="tree-year-watermark" aria-hidden="true">{year}</div>

      <aside className="tree-rail">
        <div className="tree-clock">
          <small>ano</small>
          <strong>{year}</strong>
          <span>{age===0?"começo":age+" anos depois"}</span>
        </div>
        <div className="tree-rail-line">
          <i className="tree-rail-fill" style={{height:(progress*100)+"%"}}/>
          {moments.map((moment,i)=><button
            key={moment.year}
            className={i===index?"active":i<index?"passed":""}
            style={{top:((i/(moments.length-1))*100)+"%"}}
            aria-label={moment.year+", "+moment.label}
            onClick={()=>{
              const el=ref.current;
              if(!el)return;
              const target=el.offsetTop+((i/(moments.length-1))*Math.max(1,el.offsetHeight-window.innerHeight));
              window.scrollTo({top:target,behavior:"smooth"});
            }}
          ><b/><span>{moment.year}</span></button>)}
        </div>
      </aside>

      <div className="tree-organism" aria-hidden="true">
        <div className="tree-sun-v4" style={{transform:"translate("+(progress*26-13)+"vw,"+(Math.sin(progress*Math.PI)*-14)+"px)"}}/>
        <svg viewBox="0 0 480 620" className="tree-sketch">
          <defs>
            <filter id="roughTree" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency=".012 .045" numOctaves="1" seed="17"/>
              <feDisplacementMap in="SourceGraphic" scale=".8"/>
            </filter>
          </defs>

          <g className="tree-paper-ground">
            <path d="M31 500c85 4 153-3 228 0 72 3 132 0 190-4"/>
            <path className="echo" d="M34 504c82-1 154 3 226 1 72-2 128 2 186-1"/>
          </g>

          <g className="tree-seed" style={{opacity:seedP}}>
            <ellipse cx="240" cy="494" rx="10" ry="7" transform="rotate(-18 240 494)"/>
            <path d="M233 493c5-4 10-6 15-5"/>
          </g>

          <g className="tree-roots" filter="url(#roughTree)">
            <path pathLength="1" style={drawStyle(rootP)} d="M240 498c-4 21-12 39-28 55-12 12-26 20-43 26"/>
            <path pathLength="1" style={drawStyle(phase(progress,.035,.12))} d="M241 500c7 19 17 36 31 49 15 14 31 23 50 29"/>
            <path pathLength="1" style={drawStyle(phase(progress,.055,.13))} d="M225 532c-8 11-18 18-31 22M272 545c11 7 21 11 33 13"/>
          </g>

          <g className="tree-sprout" filter="url(#roughTree)">
            <path pathLength="1" style={drawStyle(sproutP)} d="M240 497c1-20 0-40 5-59 4-16 9-28 16-40"/>
            <path pathLength="1" style={drawStyle(phase(progress,.09,.18))} d="M252 416c-13-5-24-12-33-23"/>
            <path pathLength="1" style={drawStyle(phase(progress,.1,.19))} d="M253 421c11-8 20-17 26-29"/>
            <path className="small-leaf" style={{opacity:phase(progress,.1,.19)}} d="M216 390c8-5 15-5 21 0-7 5-14 6-21 0ZM278 389c-7-5-14-4-20 1 7 5 13 5 20-1Z"/>
          </g>

          <g className="tree-trunk-main" filter="url(#roughTree)">
            <path pathLength="1" style={{...drawStyle(trunkP),strokeWidth:4+ageP*2.5}} d="M240 499c-1-58 1-110 7-158 6-47 15-91 28-131"/>
            <path className="echo" pathLength="1" style={drawStyle(trunkP)} d="M245 500c-1-58 1-110 8-158 6-46 15-89 28-128"/>
          </g>

          <g className="tree-branches-v4" filter="url(#roughTree)">
            <path pathLength="1" style={drawStyle(branchP)} d="M252 391c-23-29-51-52-84-69"/>
            <path pathLength="1" style={drawStyle(phase(progress,.36,.65))} d="M258 350c29-35 61-63 98-82"/>
            <path pathLength="1" style={drawStyle(phase(progress,.4,.67))} d="M249 428c-35-17-70-24-106-21"/>
            <path pathLength="1" style={drawStyle(phase(progress,.43,.7))} d="M248 448c37-5 73 3 108 24"/>
            <path pathLength="1" style={drawStyle(phase(progress,.47,.72))} d="M226 364c-4-29 1-55 16-79"/>
            <path pathLength="1" style={drawStyle(phase(progress,.49,.73))} d="M302 317c8-22 20-40 38-54"/>
          </g>

          <g className="tree-twigs" filter="url(#roughTree)">
            <path pathLength="1" style={drawStyle(twigP)} d="M190 337c-22-7-41-7-58 0M186 333c-8-18-19-31-34-40"/>
            <path pathLength="1" style={drawStyle(phase(progress,.56,.79))} d="M328 290c18-13 37-20 57-20M332 286c5-17 15-31 29-42"/>
            <path pathLength="1" style={drawStyle(phase(progress,.59,.8))} d="M171 407c-22-6-42-6-61 0M314 453c18 4 36 12 52 24"/>
            <path pathLength="1" style={drawStyle(phase(progress,.61,.82))} d="M236 301c-17-13-31-29-41-48M338 477c6-18 15-32 28-43"/>
          </g>

          <g className="tree-leaves-v4" style={{opacity:leafP}}>
            {leaves.map(([cx,cy,rot],i)=>{
              const local=Math.max(0,Math.min(1,leafP*1.35-(i%6)*.07));
              const rx=7+(i%3)*1.5;
              const ry=3.8+(i%2);
              return <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                transform={"rotate("+rot+" "+cx+" "+cy+")"}
                opacity={local}
              />;
            })}
          </g>

          <g className="tree-age-lines" style={{opacity:ageP}}>
            <path d="M229 481c8-3 16-3 24 0M230 466c7-3 15-3 22 0M232 451c6-2 12-2 18 0"/>
            <path d="M258 370c4-9 8-17 13-24M216 390c-5-7-10-13-15-18"/>
          </g>
        </svg>
        <div className="tree-growth-state"><i/><span>{growthLabel}</span></div>
      </div>

      <article className="tree-note" key={item.year}>
        <span>{item.year} · {item.label}</span>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </article>

      <div className="tree-bottom">
        <span>{Math.round(progress*100)}%</span>
        <div><i style={{width:(progress*100)+"%"}}/></div>
        <small>{progress<.98?"continue rolando":"526 anos"}</small>
      </div>
    </div>

    <section className="tree-finale">
      <div className="tree-rings" aria-hidden="true">
        {Array.from({length:10}).map((_,i)=><i key={i} style={{inset:(7+i*4)+"%"}}/>)}
        <span>526</span>
      </div>
      <div>
        <small>uma árvore imaginária</small>
        <h2>A história parece diferente quando a régua está viva.</h2>
        <p>Para nós foram descobertas, máquinas, redes e séculos. Para a árvore foram estações, água, luz e crescimento.</p>
      </div>
    </section>
  </div>;
}
