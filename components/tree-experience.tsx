"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CollageTree } from "@/components/collage-scenes";

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
const positions=moments.map(m=>(m.year-1500)/526);

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

  let index=0;
  positions.forEach((p,i)=>{if(progress>=p)index=i});
  const item=moments[index];
  const year=Math.round(1500+526*progress);
  const age=year-1500;

  const rings=()=>Array.from({length:10}).map((_,i)=><i key={i} style={{inset:(7+i*4)+"%"}}/>);

  return <div className="tree-experience">
  <div className="tree-story chalk-tree-story" ref={ref}>
    <div className="tree-story-stage">
      <div className="tree-year-watermark" aria-hidden="true">{year}</div>

      <div className="tree-time-key" style={{opacity:Math.max(.22,1-progress*2.4)}}>
        <strong>1500 → 2026</strong>
        <span>uma vida usada como régua para 526 anos</span>
      </div>

      <aside className="tree-rail">
        <div className="tree-clock">
          <small>linha do tempo · ano</small>
          <strong>{year}</strong>
          <span>{age===0?"o começo":age+" anos depois"}</span>
        </div>
        <div className="tree-rail-line">
          <i className="tree-rail-fill" style={{height:(progress*100)+"%"}}/>
          {moments.map((moment,i)=>{
            const pos=positions[i]*100;
            const style={top:pos+"%","--pos":pos+"%"} as CSSProperties;
            return <button
              key={moment.year}
              className={i===index?"active":i<index?"passed":""}
              style={style}
              aria-label={moment.year+", "+moment.label}
              onClick={()=>{
                const el=ref.current;if(!el)return;
                const total=Math.max(1,el.offsetHeight-window.innerHeight);
                window.scrollTo({top:el.offsetTop+positions[i]*total,behavior:"smooth"});
              }}
            ><b/><span>{moment.year}</span></button>;
          })}
        </div>
      </aside>

      <div className="tree-canvas collage-tree-panel">
        <CollageTree progress={progress}/>
        <div className="chalk-tree-era">
          <span>{item.year}</span>
          <strong>{item.label}</strong>
        </div>
      </div>

      <article className="tree-note" key={item.year}>
        <span>marco histórico · {item.year} · {item.label}</span>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </article>

      <div className="tree-bottom">
        <span>{Math.round(progress*100)}%</span>
        <div><i style={{width:(progress*100)+"%"}}/></div>
        <small>{progress<.98?"continue rolando":"526 anos"}</small>
      </div>
    </div>

  </div>
    <section className="tree-finale">
      <div className="tree-rings-stage">
        <div className="tree-rings collage-rings" aria-hidden="true">
          {rings()}
          <span>526</span>
        </div>
        <div className="tree-rings collage-rings is-reflection" aria-hidden="true">{rings()}</div>
      </div>
      <div>
        <small>uma árvore imaginária</small>
        <h2>A história parece diferente quando a régua está viva.</h2>
        <p>Para nós foram descobertas, máquinas, redes e séculos. Para a árvore foram estações, água, luz e crescimento.</p>
      </div>
    </section>
  </div>;
}
