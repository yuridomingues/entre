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
  [177,150,18],[218,112,23],[265,124,20],[312,153,22],[142,202,20],[203,190,25],[266,188,27],[330,208,22],
  [112,254,18],[170,250,24],[234,242,27],[299,254,25],[363,268,18],[146,306,20],[213,304,26],[286,316,24],[338,326,18]
];

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
  const draw=Math.min(1,.1+progress*1.08);
  const crown=Math.max(0,Math.min(1,(progress-.06)/.45));
  const trunkWidth=9+progress*13;
  const sky="hsl("+(96+progress*10)+" "+(36+progress*8)+"% "+(88-progress*8)+"%)";

  return <div className="tree-story" ref={ref}>
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

      <div className="tree-canvas" aria-hidden="true">
        <div className="tree-sun" style={{transform:"translate("+(progress*34-17)+"vw,"+(Math.sin(progress*Math.PI)*-18)+"px)"}}/>
        <svg viewBox="0 0 480 620" className="tree-drawing">
          <path className="tree-ground back" d="M32 574c94 7 174-4 263 2 57 4 103 0 153-3"/>
          <path className="tree-ground" d="M27 568c98 4 178-3 268 1 57 2 105 0 158-4"/>

          <g className="tree-branches" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw,strokeWidth:trunkWidth}} d="M241 569c-7-101-6-196 3-287 3-34 9-70 16-103"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M245 395c-27-42-62-77-104-104"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M249 357c36-49 76-89 119-120"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M247 438c-49-24-96-34-143-31"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M245 466c48-7 91 2 132 28"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M207 343c-5-42 3-79 24-112"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M300 314c9-33 25-59 49-79"/>
          </g>

          <g className="tree-branch-echo" fill="none" stroke="currentColor" strokeLinecap="round" opacity=".18">
            <path d="M246 569c-8-98-5-192 5-286 4-36 10-70 17-101"/>
            <path d="M249 397c-28-41-63-75-106-100"/>
            <path d="M253 358c35-47 75-86 116-116"/>
          </g>

          <g className="tree-leaves" style={{opacity:crown}}>
            {leaves.map(([cx,cy,r],i)=>{
              const local=Math.max(0,Math.min(1,(crown*1.4)-(i%5)*.08));
              return <ellipse key={i} cx={cx} cy={cy} rx={r*(.75+local*.35)} ry={r*(.55+local*.3)} transform={"rotate("+((i%2?1:-1)*(8+i%4*5))+" "+cx+" "+cy+")"} opacity={local}/>;
            })}
          </g>

          <g className="tree-ring-marks" opacity={Math.min(1,progress*2)}>
            <path d="M214 552c18-5 37-5 55 0M216 536c17-5 34-5 51 0M219 520c15-4 30-4 45 0"/>
          </g>
        </svg>
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
