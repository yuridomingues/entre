"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type NetNode={id:number;x:number;y:number};
const netNodes:NetNode[]=[
  {id:0,x:92,y:102},{id:1,x:205,y:70},{id:2,x:318,y:120},
  {id:3,x:140,y:212},{id:4,x:264,y:222},{id:5,x:382,y:184},
  {id:6,x:104,y:344},{id:7,x:248,y:356},{id:8,x:382,y:326},
  {id:9,x:530,y:104},{id:10,x:630,y:176},{id:11,x:744,y:86},
  {id:12,x:830,y:168},{id:13,x:548,y:302},{id:14,x:682,y:302},
  {id:15,x:814,y:292},{id:16,x:610,y:420},{id:17,x:760,y:414}
];
const leftEdges:[number,number][]=[
  [0,1],[0,3],[1,2],[1,3],[1,4],[2,4],[2,5],[3,4],
  [3,6],[4,5],[4,6],[4,7],[5,7],[5,8],[6,7],[7,8]
];
const rightEdges:[number,number][]=[
  [9,10],[9,13],[10,11],[10,13],[10,14],[11,12],[11,14],[12,15],
  [13,14],[13,16],[14,15],[14,16],[14,17],[15,17],[16,17]
];
const bridgeEdge:[number,number]=[8,13];

export function IdeaSpread(){
  const [seeds,setSeeds]=useState<number[]>([1,4]);
  const [threshold,setThreshold]=useState(2);
  const [bridge,setBridge]=useState(true);
  const [rounds,setRounds]=useState<number[]|null>(null);
  const [visibleRound,setVisibleRound]=useState(-1);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current)},[]);

  const edges=useMemo(()=>bridge?[...leftEdges,...rightEdges,bridgeEdge]:[...leftEdges,...rightEdges],[bridge]);

  const clearRun=()=>{
    if(timer.current)clearInterval(timer.current);
    timer.current=null;
    setRounds(null);
    setVisibleRound(-1);
  };

  const toggleSeed=(id:number)=>{
    clearRun();
    setSeeds(current=>{
      if(current.includes(id))return current.filter(v=>v!==id);
      if(current.length<3)return [...current,id];
      return [current[1],current[2],id];
    });
  };

  const simulate=()=>{
    if(timer.current)clearInterval(timer.current);
    const result=Array(netNodes.length).fill(-1) as number[];
    seeds.forEach(id=>result[id]=0);

    for(let round=1;round<=18;round++){
      const newly:number[]=[];
      for(const node of netNodes){
        if(result[node.id]>=0)continue;
        let activeNeighbors=0;
        for(const [a,b] of edges){
          if(a===node.id&&result[b]>=0)activeNeighbors++;
          if(b===node.id&&result[a]>=0)activeNeighbors++;
        }
        if(activeNeighbors>=threshold)newly.push(node.id);
      }
      if(newly.length===0)break;
      newly.forEach(id=>result[id]=round);
    }

    setRounds(result);
    setVisibleRound(0);
    const max=Math.max(0,...result);
    if(max>0){
      timer.current=setInterval(()=>{
        setVisibleRound(current=>{
          if(current>=max){
            if(timer.current)clearInterval(timer.current);
            timer.current=null;
            return current;
          }
          return current+1;
        });
      },380);
    }
  };

  const maxRound=rounds?Math.max(0,...rounds):0;
  const reached=rounds?rounds.filter(v=>v>=0).length:seeds.length;
  const finished=!!rounds&&visibleRound>=maxRound;
  const thresholdText=threshold===1?"basta 1 vizinho":threshold===2?"precisa ver em 2":"precisa ver em 3";

  return <div className="network-lab">
    <div className="instruction-banner"><span>como usar</span><p>Escolha até 3 pontos de partida. Depois mude a regra e a ponte entre os grupos.</p></div>

    <section className="network-card">
      <header className="network-head">
        <div><span>rede de 18 pessoas</span><h2>Escolha onde começa.</h2></div>
        <div className="network-count"><strong>{reached}</strong><span>alcançadas</span></div>
      </header>

      <div className="network-board">
        <svg viewBox="0 0 920 500" role="img" aria-label="Rede de pessoas conectadas">
          <g className="network-edges">
            {edges.map(([a,b],i)=>{
              const A=netNodes[a],B=netNodes[b];
              const isBridge=a===bridgeEdge[0]&&b===bridgeEdge[1];
              return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={isBridge?"bridge":""}/>;
            })}
          </g>
          <path className="network-divider" d="M458 32c-8 92 9 177-4 258-8 55 5 111 0 170"/>
          <g className="network-nodes">
            {netNodes.map(node=>{
              const round=rounds?.[node.id]??-1;
              const active=rounds?round>=0&&round<=visibleRound:seeds.includes(node.id);
              const seed=seeds.includes(node.id);
              return <g key={node.id} className={active?"active":""} onClick={()=>toggleSeed(node.id)} role="button" tabIndex={0} aria-label={seed?"Remover pessoa "+(node.id+1)+" do início":"Usar pessoa "+(node.id+1)+" como início"} onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")toggleSeed(node.id)}}>
                <circle cx={node.x} cy={node.y} r="18"/>
                <circle className="node-core" cx={node.x} cy={node.y} r="7"/>
                {seed&&<circle className="seed-ring" cx={node.x} cy={node.y} r="27"/>}
                {round>0&&round<=visibleRound&&<text x={node.x} y={node.y-28}>{round}</text>}
              </g>;
            })}
          </g>
        </svg>
        <div className="network-groups"><span>grupo A</span><span>grupo B</span></div>
      </div>

      <div className="network-controls">
        <div className="network-rule">
          <span>uma pessoa entra quando</span>
          <div>{[1,2,3].map(n=><button key={n} className={threshold===n?"active":""} onClick={()=>{clearRun();setThreshold(n)}}>{n} {n===1?"vizinho":"vizinhos"}</button>)}</div>
          <small>{thresholdText}</small>
        </div>
        <button className={bridge?"network-bridge active":"network-bridge"} onClick={()=>{clearRun();setBridge(v=>!v)}} aria-pressed={bridge}>
          <i/>
          <span><strong>ponte entre os grupos</strong><small>{bridge?"conectada":"cortada"}</small></span>
        </button>
        <button className="network-run" onClick={simulate} disabled={seeds.length===0}>soltar ideia →</button>
      </div>

      {finished&&<div className="network-result">
        <span>{reached} de {netNodes.length}</span>
        <p>{reached===netNodes.length
          ?"A ideia atravessou a rede inteira."
          :reached<=seeds.length
            ?"A ideia parou exatamente onde começou."
            :"Ela andou um pouco e encontrou um limite."}</p>
        <small>Mude só uma regra e tente de novo.</small>
      </div>}
    </section>

    <p className="network-thought">Uma ideia não viaja no vazio. Ela encontra relações, pontes e regras de confirmação.</p>
  </div>;
}

type Criterion="average"|"worst"|"coverage";
type Point={x:number;y:number};
const homes:Point[]=[
  {x:132,y:142},{x:218,y:100},{x:286,y:200},{x:170,y:292},{x:326,y:330},
  {x:394,y:154},{x:438,y:268},{x:556,y:382},{x:742,y:110},{x:812,y:356}
];

const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.y-b.y);
const mapMetrics=(p:Point)=>{
  const ds=homes.map(h=>distance(p,h));
  return {
    average:ds.reduce((a,b)=>a+b,0)/ds.length,
    worst:Math.max(...ds),
    coverage:ds.filter(d=>d<=190).length
  };
};

const criterionCopy:Record<Criterion,{label:string;short:string;thought:string}> = {
  average:{label:"menor distância média",short:"média",thought:"A regra se aproxima da maioria, mesmo que alguém continue longe."},
  worst:{label:"ninguém muito longe",short:"pior caso",thought:"A regra anda em direção aos extremos para reduzir a pior distância."},
  coverage:{label:"mais gente por perto",short:"alcance",thought:"Cobrir mais gente pode deixar quem está isolado ainda mais fora."}
};

function bestPointFor(criterion:Criterion){
  let best={x:450,y:260};
  let bestKey=Infinity;
  for(let x=50;x<=850;x+=10){
    for(let y=50;y<=470;y+=10){
      const p={x,y};
      const m=mapMetrics(p);
      const key=criterion==="average"
        ? m.average
        : criterion==="worst"
          ? m.worst
          : (-m.coverage*10000)+m.average;
      if(key<bestKey){bestKey=key;best=p}
    }
  }
  return best;
}

export function WhereIsCenter(){
  const svgRef=useRef<SVGSVGElement>(null);
  const [point,setPoint]=useState<Point>({x:450,y:260});
  const [placed,setPlaced]=useState(false);
  const [dragging,setDragging]=useState(false);
  const [criterion,setCriterion]=useState<Criterion>("average");
  const [showBest,setShowBest]=useState(false);

  const best=useMemo(()=>bestPointFor(criterion),[criterion]);

  const place=(event:ReactPointerEvent<SVGSVGElement>)=>{
    const rect=svgRef.current?.getBoundingClientRect();
    if(!rect)return;
    const x=Math.max(24,Math.min(876,((event.clientX-rect.left)/rect.width)*900));
    const y=Math.max(24,Math.min(496,((event.clientY-rect.top)/rect.height)*520));
    setPoint({x,y});
    setPlaced(true);
    setShowBest(false);
  };

  const metricText=(p:Point)=>{
    const m=mapMetrics(p);
    if(criterion==="average")return Math.round(m.average)+" de distância média";
    if(criterion==="worst")return Math.round(m.worst)+" até a casa mais distante";
    return m.coverage+" de "+homes.length+" dentro do alcance";
  };

  return <div className="center-lab">
    <div className="instruction-banner"><span>primeiro você</span><p>Coloque o ponto onde parece mais justo. Só depois veja o que cada regra chama de melhor.</p></div>

    <section className="center-card">
      <header className="center-head">
        <div><span>o mapa é o mesmo</span><h2>Centro para quem?</h2></div>
        <div className="center-rule-tag">{criterionCopy[criterion].short}</div>
      </header>

      <div className="center-map-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 900 520"
          className="center-map"
          onPointerDown={e=>{setDragging(true);e.currentTarget.setPointerCapture(e.pointerId);place(e)}}
          onPointerMove={e=>{if(dragging)place(e)}}
          onPointerUp={()=>setDragging(false)}
          onPointerCancel={()=>setDragging(false)}
          role="img"
          aria-label="Mapa abstrato com dez casas. Clique ou arraste para escolher um ponto."
        >
          <path className="center-road" d="M36 374c142-102 232-61 344-145 120-91 248-97 483-40M92 70c125 78 171 171 277 217 126 55 269 57 462 170"/>
          {criterion==="coverage"&&placed&&<circle className="coverage-ring" cx={point.x} cy={point.y} r="190"/>}
          {homes.map((h,i)=><g className="center-home" key={i} transform={"translate("+h.x+" "+h.y+")"}>
            <path d="M-16 4 0-10 16 4v18h-32Z"/>
            <path d="M-5 22V9H5v13"/>
            <text x="0" y="38">{i+1}</text>
          </g>)}

          {placed&&<g className="your-point" transform={"translate("+point.x+" "+point.y+")"}>
            <circle r="17"/><path d="M-25 0H25M0-25V25"/><text x="0" y="-34">você</text>
          </g>}

          {showBest&&<g className="best-point" transform={"translate("+best.x+" "+best.y+")"}>
            <circle r="23"/><circle r="8"/><text x="0" y="-34">pela regra</text>
          </g>}
        </svg>

        {!placed&&<button className="center-place-prompt" onClick={()=>{setPlaced(true);setPoint({x:450,y:260})}}>clique no mapa para escolher</button>}
      </div>

      <div className="center-rules">
        <span>agora mude o significado de “melhor”</span>
        <div>
          {(Object.keys(criterionCopy) as Criterion[]).map(key=><button key={key} className={criterion===key?"active":""} onClick={()=>{setCriterion(key);setShowBest(false)}}>{criterionCopy[key].label}</button>)}
        </div>
      </div>

      <div className="center-readout">
        <div><span>sua escolha</span><strong>{placed?metricText(point):"escolha um ponto"}</strong></div>
        <button onClick={()=>setShowBest(true)} disabled={!placed}>{showBest?"melhor ponto mostrado ✓":"mostrar melhor ponto →"}</button>
        <div><span>pela regra</span><strong>{showBest?metricText(best):"?"}</strong></div>
      </div>

      {showBest&&<div className="center-result">
        <p>{criterionCopy[criterion].thought}</p>
        <small>O mapa não mudou. Só mudou aquilo que você decidiu otimizar.</small>
      </div>}
    </section>

    <p className="center-thought">A matemática encontra um ótimo depois que alguém decide o que “ótimo” quer dizer.</p>
  </div>;
}
