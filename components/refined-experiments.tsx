"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChalkEarth, ChalkMemoryIcon, ChalkNetwork, ChalkShip } from "@/components/chalk-scenes";

/* REDE */
type NetNode={id:number;x:number;y:number};
const nodes:NetNode[]=[
  {id:0,x:78,y:92},{id:1,x:166,y:58},{id:2,x:260,y:105},{id:3,x:115,y:184},{id:4,x:222,y:194},
  {id:5,x:332,y:155},{id:6,x:72,y:300},{id:7,x:188,y:322},{id:8,x:304,y:292},{id:9,x:390,y:350},
  {id:10,x:540,y:332},{id:11,x:595,y:100},{id:12,x:688,y:62},{id:13,x:790,y:110},{id:14,x:855,y:198},
  {id:15,x:590,y:210},{id:16,x:704,y:225},{id:17,x:810,y:310},{id:18,x:650,y:355},{id:19,x:760,y:390}
];
const baseEdges:[number,number][]=[
  [0,1],[0,3],[1,2],[1,3],[1,4],[2,4],[2,5],[3,4],[3,6],[4,5],[4,7],[5,8],[6,7],[7,8],[7,9],[8,9],
  [10,15],[10,18],[11,12],[11,15],[12,13],[12,16],[13,14],[13,16],[14,16],[14,17],[15,16],[15,18],[16,17],[16,18],[17,19],[18,19]
];
const bridge:[number,number]=[9,10];

function bfs(seeds:number[],withBridge:boolean){
  const edges=withBridge?[...baseEdges,bridge]:baseEdges;
  const dist=Array(nodes.length).fill(-1) as number[];
  const parent=Array(nodes.length).fill(-1) as number[];
  const q=[...seeds];
  seeds.forEach(s=>dist[s]=0);
  while(q.length){
    const cur=q.shift()!;
    for(const [a,b] of edges){
      const next=a===cur?b:b===cur?a:null;
      if(next!==null&&dist[next]===-1){
        dist[next]=dist[cur]+1;
        parent[next]=cur;
        q.push(next);
      }
    }
  }
  return {dist,parent,edges};
}

export function RefinedIdeaSpread(){
  const [seeds,setSeeds]=useState<number[]>([1]);
  const [withBridge,setWithBridge]=useState(true);
  const [run,setRun]=useState<ReturnType<typeof bfs>|null>(null);
  const [wave,setWave]=useState(-1);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current)},[]);

  const clear=()=>{
    if(timer.current)clearInterval(timer.current);
    timer.current=null;
    setRun(null);
    setWave(-1);
  };

  const toggleSeed=(id:number)=>{
    clear();
    setSeeds(current=>{
      if(current.includes(id))return current.filter(v=>v!==id);
      if(current.length<3)return [...current,id];
      return [current[1],current[2],id];
    });
  };

  const spread=()=>{
    if(!seeds.length)return;
    clear();
    const result=bfs(seeds,withBridge);
    setRun(result);
    setWave(0);
    const max=Math.max(...result.dist);
    let current=0;
    timer.current=setInterval(()=>{
      current++;
      setWave(current);
      if(current>=max){
        if(timer.current)clearInterval(timer.current);
        timer.current=null;
      }
    },260);
  };

  const reached=run?run.dist.filter(d=>d>=0&&d<=wave).length:seeds.length;
  const finalReached=run?run.dist.filter(d=>d>=0).length:seeds.length;
  const maxWave=run?Math.max(...run.dist):0;
  const finished=!!run&&wave>=maxWave;

  return <div className="refined-network lab-shell">
    <div className="instruction-banner"><span>3 passos</span><p><b>1.</b> escolha onde começa <b>2.</b> espalhe <b>3.</b> corte a ponte e rode de novo</p></div>
    <section className="lab-card refined-network-card">
      <header className="lab-head">
        <div><span>uma ideia precisa de caminhos</span><h2>Veja a rede acender.</h2></div>
        <strong>{reached}/20</strong>
      </header>

      <div className="refined-network-board chalk-network-board">
        <ChalkNetwork
          nodes={nodes}
          edges={run?.edges??(withBridge?[...baseEdges,bridge]:baseEdges)}
          seeds={seeds}
          dist={run?.dist??null}
          wave={wave}
        />
        <div className="chalk-network-hits" aria-label="Pessoas da rede">
          {nodes.map(node=>{
            const seed=seeds.includes(node.id);
            return <button
              key={node.id}
              className={seed?"seed":""}
              aria-label={(seed?"Remover":"Escolher")+" ponto "+(node.id+1)}
              onClick={()=>toggleSeed(node.id)}
              style={{left:(node.x/930*100)+"%",top:(node.y/450*100)+"%"}}
            />;
          })}
        </div>
        <div className="network-labels"><span>grupo A</span><span>grupo B</span></div>
      </div>

      <div className="refined-network-controls">
        <div className="seed-status"><span>começos</span><strong>{seeds.length}/3</strong><small>toque nos pontos</small></div>
        <button className={"bridge-switch "+(withBridge?"on":"")} onClick={()=>{clear();setWithBridge(v=>!v)}}>
          <i/><span><strong>a ponte</strong><small>{withBridge?"conecta os grupos":"foi cortada"}</small></span>
        </button>
        <button className="network-go" onClick={spread} disabled={!seeds.length}>espalhar ideia →</button>
      </div>

      {finished&&<div className="network-finish">
        <strong>{finalReached===20?"a rede inteira acendeu":finalReached+" de 20 foram alcançados"}</strong>
        <p>{withBridge
          ?"Uma conexão entre os grupos foi suficiente para existir um caminho contínuo."
          :seeds.some(s=>s>=10)
            ?"Mesmo sem a ponte, você começou dos dois lados. A ideia não precisou atravessar entre os grupos."
            :"Sem a ponte, a ideia encontrou o fim do mundo que conseguia alcançar."}</p>
        <button onClick={clear}>mudar e comparar ↺</button>
      </div>}
    </section>
    <p className="lab-thought">O alcance de uma ideia não pertence só à ideia. Também pertence à forma como as pessoas estão ligadas.</p>
  </div>;
}

/* MEMÓRIA */
type MemoryKind="book"|"mug"|"plant"|"clock";
const memoryThings:{kind:MemoryKind;label:string}[]=[
  {kind:"book",label:"livro"},{kind:"mug",label:"caneca"},{kind:"plant",label:"planta"},{kind:"clock",label:"relógio"}
];
function memoryPositions(seed:number){
  const cells=Array.from({length:12},(_,i)=>i);
  let x=(seed+11)*48271;
  for(let i=cells.length-1;i>0;i--){x=(x*48271)%2147483647;const j=x%(i+1);[cells[i],cells[j]]=[cells[j],cells[i]]}
  return cells.slice(0,4);
}
function MemoryIcon({kind,className=""}:{kind:MemoryKind;className?:string}){
  return <ChalkMemoryIcon kind={kind} className={className}/>;
}
function ShipDrawing({replaced,onPart,allOld=false}:{replaced:Set<number>;onPart?:(id:number)=>void;allOld?:boolean}){
  return <ChalkShip replaced={replaced} onPart={onPart} allOld={allOld}/>;
}
          <ChalkEarth depth={depth} angle={angle} onPick={pick}/>mport { useEffect, useMemo, useRef, useState } from "react";
import { ChalkEarth, ChalkMemoryIcon, ChalkNetwork, ChalkShip } from "@/components/chalk-scenes";

/* REDE */
type NetNode={id:number;x:number;y:number};
const nodes:NetNode[]=[
  {id:0,x:78,y:92},{id:1,x:166,y:58},{id:2,x:260,y:105},{id:3,x:115,y:184},{id:4,x:222,y:194},
  {id:5,x:332,y:155},{id:6,x:72,y:300},{id:7,x:188,y:322},{id:8,x:304,y:292},{id:9,x:390,y:350},
  {id:10,x:540,y:332},{id:11,x:595,y:100},{id:12,x:688,y:62},{id:13,x:790,y:110},{id:14,x:855,y:198},
  {id:15,x:590,y:210},{id:16,x:704,y:225},{id:17,x:810,y:310},{id:18,x:650,y:355},{id:19,x:760,y:390}
];
const baseEdges:[number,number][]=[
  [0,1],[0,3],[1,2],[1,3],[1,4],[2,4],[2,5],[3,4],[3,6],[4,5],[4,7],[5,8],[6,7],[7,8],[7,9],[8,9],
  [10,15],[10,18],[11,12],[11,15],[12,13],[12,16],[13,14],[13,16],[14,16],[14,17],[15,16],[15,18],[16,17],[16,18],[17,19],[18,19]
];
const bridge:[number,number]=[9,10];

function bfs(seeds:number[],withBridge:boolean){
  const edges=withBridge?[...baseEdges,bridge]:baseEdges;
  const dist=Array(nodes.length).fill(-1) as number[];
  const parent=Array(nodes.length).fill(-1) as number[];
  const q=[...seeds];
  seeds.forEach(s=>dist[s]=0);
  while(q.length){
    const cur=q.shift()!;
    for(const [a,b] of edges){
      const next=a===cur?b:b===cur?a:null;
      if(next!==null&&dist[next]===-1){
        dist[next]=dist[cur]+1;
        parent[next]=cur;
        q.push(next);
      }
    }
  }
  return {dist,parent,edges};
}

export function RefinedIdeaSpread(){
  const [seeds,setSeeds]=useState<number[]>([1]);
  const [withBridge,setWithBridge]=useState(true);
  const [run,setRun]=useState<ReturnType<typeof bfs>|null>(null);
  const [wave,setWave]=useState(-1);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current)},[]);

  const clear=()=>{
    if(timer.current)clearInterval(timer.current);
    timer.current=null;
    setRun(null);
    setWave(-1);
  };

  const toggleSeed=(id:number)=>{
    clear();
    setSeeds(current=>{
      if(current.includes(id))return current.filter(v=>v!==id);
      if(current.length<3)return [...current,id];
      return [current[1],current[2],id];
    });
  };

  const spread=()=>{
    if(!seeds.length)return;
    clear();
    const result=bfs(seeds,withBridge);
    setRun(result);
    setWave(0);
    const max=Math.max(...result.dist);
    let current=0;
    timer.current=setInterval(()=>{
      current++;
      setWave(current);
      if(current>=max){
        if(timer.current)clearInterval(timer.current);
        timer.current=null;
      }
    },260);
  };

  const reached=run?run.dist.filter(d=>d>=0&&d<=wave).length:seeds.length;
  const finalReached=run?run.dist.filter(d=>d>=0).length:seeds.length;
  const maxWave=run?Math.max(...run.dist):0;
  const finished=!!run&&wave>=maxWave;

  return <div className="refined-network lab-shell">
    <div className="instruction-banner"><span>3 passos</span><p><b>1.</b> escolha onde começa <b>2.</b> espalhe <b>3.</b> corte a ponte e rode de novo</p></div>
    <section className="lab-card refined-network-card">
      <header className="lab-head">
        <div><span>uma ideia precisa de caminhos</span><h2>Veja a rede acender.</h2></div>
        <strong>{reached}/20</strong>
      </header>

      <div className="refined-network-board chalk-network-board">
        <ChalkNetwork
          nodes={nodes}
          edges={run?.edges??(withBridge?[...baseEdges,bridge]:baseEdges)}
          seeds={seeds}
          dist={run?.dist??null}
          wave={wave}
        />
        <div className="chalk-network-hits" aria-label="Pessoas da rede">
          {nodes.map(node=>{
            const seed=seeds.includes(node.id);
            return <button
              key={node.id}
              className={seed?"seed":""}
              aria-label={(seed?"Remover":"Escolher")+" ponto "+(node.id+1)}
              onClick={()=>toggleSeed(node.id)}
              style={{left:(node.x/930*100)+"%",top:(node.y/450*100)+"%"}}
            />;
          })}
        </div>
        <div className="network-labels"><span>grupo A</span><span>grupo B</span></div>
      </div>

      <div className="refined-network-controls">
        <div className="seed-status"><span>começos</span><strong>{seeds.length}/3</strong><small>toque nos pontos</small></div>
        <button className={"bridge-switch "+(withBridge?"on":"")} onClick={()=>{clear();setWithBridge(v=>!v)}}>
          <i/><span><strong>a ponte</strong><small>{withBridge?"conecta os grupos":"foi cortada"}</small></span>
        </button>
        <button className="network-go" onClick={spread} disabled={!seeds.length}>espalhar ideia →</button>
      </div>

      {finished&&<div className="network-finish">
        <strong>{finalReached===20?"a rede inteira acendeu":finalReached+" de 20 foram alcançados"}</strong>
        <p>{withBridge
          ?"Uma conexão entre os grupos foi suficiente para existir um caminho contínuo."
          :seeds.some(s=>s>=10)
            ?"Mesmo sem a ponte, você começou dos dois lados. A ideia não precisou atravessar entre os grupos."
            :"Sem a ponte, a ideia encontrou o fim do mundo que conseguia alcançar."}</p>
        <button onClick={clear}>mudar e comparar ↺</button>
      </div>}
    </section>
    <p className="lab-thought">O alcance de uma ideia não pertence só à ideia. Também pertence à forma como as pessoas estão ligadas.</p>
  </div>;
}

/* MEMÓRIA */
type MemoryKind="book"|"mug"|"plant"|"clock";
const memoryThings:{kind:MemoryKind;label:string}[]=[
  {kind:"book",label:"livro"},{kind:"mug",label:"caneca"},{kind:"plant",label:"planta"},{kind:"clock",label:"relógio"}
];
function memoryPositions(seed:number){
  const cells=Array.from({length:12},(_,i)=>i);
  let x=(seed+11)*48271;
  for(let i=cells.length-1;i>0;i--){x=(x*48271)%2147483647;const j=x%(i+1);[cells[i],cells[j]]=[cells[j],cells[i]]}
  return cells.slice(0,4);
}
function MemoryIcon({kind,className=""}:{kind:MemoryKind;className?:string}){
  return <ChalkMemoryIcon kind={kind} className={className}/>;
}
function ShipDrawing({replaced,onPart,allOld=false}:{replaced:Set<number>;onPart?:(id:number)=>void;allOld?:boolean}){
  return <ChalkShip replaced={replaced} onPart={onPart} allOld={allOld}/>;
}

