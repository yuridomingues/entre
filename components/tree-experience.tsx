"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

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
const leafClusters=[
  {x:137,y:190,rx:52,ry:37,rot:-9,color:"#8fc979"},
  {x:193,y:139,rx:58,ry:43,rot:7,color:"#7fbd6e"},
  {x:259,y:130,rx:61,ry:43,rot:-5,color:"#9bd481"},
  {x:326,y:171,rx:55,ry:38,rot:12,color:"#78b765"},
  {x:113,y:252,rx:48,ry:34,rot:8,color:"#9bd481"},
  {x:181,y:245,rx:57,ry:39,rot:-6,color:"#6eaa5e"},
  {x:253,y:232,rx:65,ry:44,rot:5,color:"#88c471"},
  {x:329,y:250,rx:54,ry:37,rot:-10,color:"#91ce78"},
  {x:151,y:306,rx:47,ry:31,rot:-5,color:"#78b765"},
  {x:224,y:302,rx:61,ry:38,rot:7,color:"#90cc76"},
  {x:300,y:312,rx:54,ry:34,rot:-8,color:"#77b564"}
];

const leafSpecks=[
  [112,181,-16],[145,153,11],[176,119,-7],[213,98,9],[252,104,-12],[289,118,6],[334,151,-8],
  [95,226,10],[134,242,-11],[179,215,8],[222,205,-13],[266,202,7],[309,219,-10],[351,236,12],
  [127,285,-7],[166,318,9],[211,280,-11],[255,287,8],[294,292,-8],[330,300,10]
];


function EraVignette({index}:{index:number}){
  const common={fill:"none",stroke:"currentColor",strokeWidth:3.2,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  if(index===0)return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M30 122h120" {...common}/><path d="M90 122V84M90 92c-22 0-31-15-31-27 20-1 31 10 31 27ZM91 102c21 0 31-15 31-28-20-1-31 11-31 28Z" fill="#8ecb78" stroke="currentColor" strokeWidth="3"/><path d="M84 122c-10 10-18 16-27 20M96 122c10 10 18 16 27 20" {...common}/><circle cx="90" cy="53" r="9" fill="#f1cd65" stroke="currentColor" strokeWidth="3"/></svg>;
  if(index===1)return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M36 112 86 60l17 17 25-31" {...common}/><path d="M96 58 136 23l13 14-39 35Z" fill="#7ab9da" stroke="currentColor" strokeWidth="3"/><circle cx="149" cy="28" r="15" fill="#f1cd65" stroke="currentColor" strokeWidth="3"/><path d="M35 119h110" {...common}/><path d="M54 119v-28h28v28M112 119v-22h23v22" {...common}/></svg>;
  if(index===2)return <svg viewBox="0 0 180 150" aria-hidden="true"><circle cx="90" cy="63" r="34" fill="#7ab9da" stroke="currentColor" strokeWidth="3"/><path d="M67 55c12-12 25-12 36-5l4 14 14 4-7 16-18-3-9 9-8-13-12-5Z" fill="#8ecb78" stroke="currentColor" strokeWidth="2"/><path d="M24 63c23-30 109-39 132 0-23 29-109 39-132 0Z" {...common}/><circle cx="144" cy="42" r="7" fill="#f1cd65" stroke="currentColor" strokeWidth="2"/><path d="M35 121c17-22 37-29 59-25 20 4 35 16 49 31" {...common}/><circle cx="54" cy="112" r="10" fill="#ef8a70" stroke="currentColor" strokeWidth="2"/></svg>;
  if(index===3)return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M41 121c10-40 24-69 48-89 22 18 37 43 48 89" fill="#d7e6b7" stroke="currentColor" strokeWidth="3"/><path d="M59 109c16-18 30-29 46-40 11 9 20 20 29 35" {...common}/><path d="M30 128h120" {...common}/><path d="M111 35c9 6 15 12 17 22-9 8-19 10-29 4-3-11 1-19 12-26Z" fill="#8ecb78" stroke="currentColor" strokeWidth="2"/><path d="M114 38c-3 10-3 18 0 25" {...common}/></svg>;
  if(index===4)return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M36 105h45V62H36Z" fill="#bd8156" stroke="currentColor" strokeWidth="3"/><path d="M81 74c27-9 44-2 54 15-9 17-27 23-54 15Z" fill="#f1cd65" stroke="currentColor" strokeWidth="3"/><circle cx="58" cy="83" r="8" fill="#111"/><path d="M30 118h120" {...common}/><path d="M118 54c8-11 17-18 28-19M121 62c10-3 19-1 27 4" {...common}/></svg>;
  if(index===5)return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M91 119V54M66 119l25-65 25 65M51 119h80" {...common}/><path d="M91 53c-20 0-31-13-35-29M91 53c20 0 31-13 35-29" {...common}/><path d="M91 53c-10-17-10-31 0-43" {...common}/><circle cx="91" cy="54" r="8" fill="#ef8a70" stroke="currentColor" strokeWidth="2"/><path d="M34 127h112" {...common}/></svg>;
  if(index===6)return <svg viewBox="0 0 180 150" aria-hidden="true"><rect x="32" y="33" width="116" height="79" rx="8" fill="#fffaf0" stroke="currentColor" strokeWidth="3"/><path d="M44 47h92v52H44Z" fill="#7ab9da" stroke="currentColor" strokeWidth="2"/><circle cx="63" cy="67" r="8" fill="#f1cd65" stroke="currentColor" strokeWidth="2"/><circle cx="116" cy="58" r="8" fill="#8ecb78" stroke="currentColor" strokeWidth="2"/><circle cx="94" cy="86" r="8" fill="#8466d7" stroke="currentColor" strokeWidth="2"/><path d="M70 68 91 84M100 82l12-18" {...common}/><path d="M73 113v17M108 113v17M58 130h65" {...common}/></svg>;
  return <svg viewBox="0 0 180 150" aria-hidden="true"><path d="M31 121V79h24v42M55 121V55h29v66M84 121V69h27v52M111 121V42h34v79" fill="#dbe5e8" stroke="currentColor" strokeWidth="3"/><g fill="#f1cd65" stroke="currentColor" strokeWidth="1.5">{[[39,90],[64,68],[93,82],[122,55],[135,55],[122,73],[135,73],[65,88],[94,101]].map(([x,y],i)=><rect key={i} x={x} y={y} width="8" height="10" rx="2"/>)}</g><path d="M22 127h136" {...common}/><circle cx="151" cy="33" r="13" fill="#8ecb78" stroke="currentColor" strokeWidth="3"/><path d="M151 20v26M138 33h26" {...common}/></svg>;
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

  let index=0;
  positions.forEach((p,i)=>{if(progress>=p)index=i});
  const item=moments[index];
  const year=Math.round(1500+526*progress);
  const age=year-1500;

  // A árvore amadurece antes da linha do tempo acabar.
  // Depois disso, quem continua mudando principalmente é o mundo ao redor dela.
  const maturity=Math.max(0,Math.min(1,progress/.34));
  const draw=.08+maturity*.92;
  const crown=Math.max(0,Math.min(1,(maturity-.14)/.7));
  const trunkWidth=7+maturity*18;
  const rootDraw=Math.max(0,Math.min(1,maturity*1.8));
  const skyLight=91-progress*8;
  const sky=`hsl(${97+progress*8} ${35+progress*7}% ${skyLight}%)`;
  const canopyScale=.68+crown*.32;
  const rings=Math.max(0,Math.min(1,(progress-.16)/.45));

  return <div className="tree-story tree-story-illustrated" ref={ref}>
    <div className="tree-story-stage" style={{background:sky}}>
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

      <div className="tree-canvas" aria-hidden="true">
        <div className="tree-sun" style={{transform:`translate(${progress*32-16}vw,${Math.sin(progress*Math.PI)*-18}px)`}}/>
        <div className="tree-cloud cloud-a" style={{transform:`translateX(${progress*28}px)`}}/>
        <div className="tree-cloud cloud-b" style={{transform:`translateX(${-progress*34}px)`}}/>
        <div className="tree-era-vignette" key={index}><EraVignette index={index}/></div>
        <div className="tree-era-caption"><span>{item.year}</span><strong>{item.label}</strong></div>
        <svg viewBox="0 0 480 620" className="tree-drawing tree-drawing-editorial">
          <defs>
            <filter id="tree-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="2.4" floodColor="#183414" floodOpacity=".13"/>
            </filter>
          </defs>

          <path className="tree-hill far" d="M5 574c70-52 149-50 213-20 72 34 151 27 257-21v87H5Z"/>
          <path className="tree-hill near" d="M0 590c103-25 197-13 283 2 77 13 135 10 197-4v32H0Z"/>
          <path className="tree-ground back" d="M28 576c89 6 174-3 270 2 65 4 111 0 156-4"/>
          <path className="tree-ground" d="M24 568c99 4 180-3 273 1 61 2 109 0 160-4"/>

          <g className="tree-roots" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-rootDraw}} d="M239 557c-31 8-60 17-90 37"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-rootDraw}} d="M245 558c31 6 62 18 93 37"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-rootDraw}} d="M240 560c-8 13-14 25-17 38"/>
          </g>

          <g className="tree-trunk-fill" filter="url(#tree-soft-shadow)">
            <path d="M225 568c5-74 3-143 9-204 4-46 9-87 17-125 4-20 8-39 14-59 8 28 9 58 7 89-2 34-6 68-6 101 0 58 8 123 17 198Z" fill="#a8754f" opacity={maturity}/>
            <path d="M245 568c-2-95-2-185 4-272 4-53 10-93 17-116" fill="none" stroke="#704833" strokeWidth="4" strokeLinecap="round" opacity={maturity*.8}/>
          </g>

          <g className="tree-branches" fill="none" stroke="#6f4934" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw,strokeWidth:trunkWidth}} d="M242 569c-7-102-5-197 3-287 4-39 11-74 20-109"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M245 395c-27-42-62-77-104-104"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M249 357c36-49 76-89 119-120"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M247 438c-49-24-96-34-143-31"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M245 466c48-7 91 2 132 28"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M207 343c-5-42 3-79 24-112"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M300 314c9-33 25-59 49-79"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M170 407c-19-26-42-45-71-57"/>
            <path pathLength="1" style={{strokeDasharray:1,strokeDashoffset:1-draw}} d="M316 443c27-21 52-31 78-32"/>
          </g>

          <g className="tree-branch-echo" fill="none" stroke="#c18c65" strokeLinecap="round" opacity={maturity*.32}>
            <path d="M249 566c-4-93-2-187 7-279 4-40 10-75 17-105"/>
            <path d="M250 399c-27-40-62-73-104-98"/>
            <path d="M255 361c35-46 74-84 114-113"/>
          </g>

          <g className="tree-canopy" style={{opacity:crown,transform:`scale(${canopyScale})`,transformOrigin:"240px 250px"}}>
            {leafClusters.map((l,i)=><ellipse key={i} cx={l.x} cy={l.y} rx={l.rx} ry={l.ry} transform={`rotate(${l.rot} ${l.x} ${l.y})`} fill={l.color} stroke="#315c2a" strokeWidth="3"/>)}
            {leafSpecks.map(([x,y,rot],i)=><path key={i} d={`M${x-8} ${y}q8-11 17 0-8 10-17 0Z`} transform={`rotate(${rot} ${x} ${y})`} fill={i%3===0?"#b8df94":"#6fa95d"} stroke="#315c2a" strokeWidth="1.6"/>)}
          </g>

          <g className="tree-ring-marks" opacity={rings}>
            <ellipse cx="248" cy="548" rx="24" ry="7"/>
            <ellipse cx="248" cy="548" rx="18" ry="5"/>
            <ellipse cx="248" cy="548" rx="11" ry="3"/>
          </g>

          <g className="tree-trunk-texture" opacity={maturity*.72}>
            <path d="M235 550c15-28 20-63 13-96M261 548c-11-34-11-68-3-102M238 425c10-18 13-39 9-61M261 393c-8-19-6-38 5-59" fill="none" stroke="#6a4431" strokeWidth="3" strokeLinecap="round"/>
            <path d="M239 519c8 6 15 6 23 0M241 483c6 5 13 5 20 0M246 449c5 4 10 4 16 0" fill="none" stroke="#d5a079" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className="tree-life-details" opacity={Math.max(0,(progress-.38)*1.8)}>
            <path d="M83 548q13-17 26 0" fill="none" stroke="#315c2a" strokeWidth="3"/>
            <path d="M367 542q13-16 25 0" fill="none" stroke="#315c2a" strokeWidth="3"/>
            <circle cx="96" cy="546" r="4" fill="#f0cf68" stroke="#315c2a" strokeWidth="1.5"/>
            <circle cx="379" cy="541" r="4" fill="#ef8b77" stroke="#315c2a" strokeWidth="1.5"/>
          </g>

          <g className="tree-falling-leaves" opacity={Math.max(0,(progress-.48)*1.6)}>
            {[0,1,2,3,4,5].map(i=><path key={i} className={"falling-leaf leaf-"+i} d="M0 0q7-8 14 0-7 8-14 0Z" transform={`translate(${335+i*11} ${255+i*13}) rotate(${i*17})`} fill={i%2?"#ef8a70":"#f1cd65"} stroke="#315c2a" strokeWidth="1.4"/>)}
          </g>
          <g className="tree-birds" opacity={Math.max(0,(progress-.62)*2.5)} fill="none" stroke="#315c2a" strokeWidth="3" strokeLinecap="round">
            <path d="M354 92q9-9 18 0 9-9 18 0"/>
            <path d="M385 117q7-7 14 0 7-7 14 0"/>
          </g>
        </svg>
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
