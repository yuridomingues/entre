"use client";
import { useEffect, useMemo, useRef, useState } from "react";

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

      <div className="refined-network-board">
        <svg viewBox="0 0 930 450" role="img" aria-label="Rede de vinte pessoas ligadas por conexões">
          <g className="refined-network-edges">
            {(run?.edges??(withBridge?[...baseEdges,bridge]:baseEdges)).map(([a,b],i)=>{
              const da=run?.dist[a]??-1, db=run?.dist[b]??-1;
              const active=run&&da>=0&&db>=0&&Math.max(da,db)<=wave;
              const front=run&&da>=0&&db>=0&&Math.max(da,db)===wave;
              const isBridge=a===bridge[0]&&b===bridge[1];
              return <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} className={(active?"active ":"")+(front?"front ":"")+(isBridge?"bridge":"")}/>;
            })}
          </g>
          <path className="group-divider" d="M465 28c-16 102 12 185-5 286-5 33-2 71 2 107"/>
          <g className="refined-network-nodes">
            {nodes.map(node=>{
              const d=run?.dist[node.id]??-1;
              const active=run?d>=0&&d<=wave:seeds.includes(node.id);
              const justLit=run&&d===wave&&d>0;
              const seed=seeds.includes(node.id);
              return <g key={node.id} className={(active?"active ":"")+(seed?"seed ":"")+(justLit?"just-lit":"")}
                role="button" tabIndex={0} aria-label={(seed?"Remover":"Escolher")+" ponto "+(node.id+1)}
                onClick={()=>toggleSeed(node.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")toggleSeed(node.id)}}>
                {justLit&&<circle className="network-ripple" cx={node.x} cy={node.y} r="20"/>}
                <circle className="network-person" cx={node.x} cy={node.y} r="18"/>
                <circle className="network-core" cx={node.x} cy={node.y} r="6"/>
                {seed&&<circle className="network-seed" cx={node.x} cy={node.y} r="28"/>}
              </g>;
            })}
          </g>
        </svg>
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
  return <svg className={"memory-svg "+className} viewBox="0 0 64 64" aria-hidden="true">
    {kind==="book"&&<><rect x="12" y="8" width="40" height="48" rx="3"/><path d="M23 8v48M29 21h16M29 29h14"/></>}
    {kind==="mug"&&<><path d="M14 14h34v34c0 6-5 10-10 10H24c-6 0-10-4-10-10Z"/><path d="M48 22h5c8 0 8 18 0 18h-5"/></>}
    {kind==="plant"&&<><path d="M22 39h22l-3 19H25Z"/><path d="M33 40V16M33 25c-12 0-16-8-16-13 10-1 16 4 16 13ZM34 31c11 0 16-8 16-14-10-1-16 5-16 14Z"/></>}
    {kind==="clock"&&<><circle cx="32" cy="32" r="24"/><path d="M32 17v16l11 7"/><path d="M32 8v4M32 52v4M8 32h4M52 32h4"/></>}
  </svg>;
}
export function RefinedMemory(){
  const [seed,setSeed]=useState(0);
  const [phase,setPhase]=useState<"ready"|"study"|"recall"|"result">("ready");
  const [seconds,setSeconds]=useState(5);
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const positions=useMemo(()=>memoryPositions(seed),[seed]);

  useEffect(()=>{
    if(phase!=="study")return;
    setSeconds(5);
    const interval=setInterval(()=>setSeconds(v=>Math.max(0,v-1)),1000);
    const timeout=setTimeout(()=>{clearInterval(interval);setPhase("recall");setCurrent(0);setAnswers([])},5200);
    return()=>{clearInterval(interval);clearTimeout(timeout)};
  },[phase,seed]);

  const place=(cell:number)=>{
    if(phase!=="recall"||answers.includes(cell))return;
    const next=[...answers,cell];
    setAnswers(next);
    if(current===memoryThings.length-1)setPhase("result");
    else setCurrent(v=>v+1);
  };
  const score=answers.reduce((n,cell,i)=>n+(cell===positions[i]?1:0),0);

  return <div className="refined-memory lab-shell">
    <div className="instruction-banner"><span>olhe primeiro</span><p>Você terá cinco segundos. Depois a sala some e você reconstrói a posição dos mesmos quatro objetos.</p></div>
    <section className="lab-card refined-memory-card">
      <header className="lab-head">
        <div><span>memória espacial</span><h2>{phase==="recall"?"Monte a cena de volta.":"Uma sala pequena."}</h2></div>
        {phase==="study"&&<strong>{seconds}s</strong>}
      </header>

      <div className={"refined-memory-room "+phase}>
        {Array.from({length:12}).map((_,cell)=>{
          const realIndex=positions.indexOf(cell);
          const guessedIndex=answers.indexOf(cell);
          const occupied=answers.includes(cell);
          return <button key={cell} className={"memory-slot "+(occupied?"occupied":"")} disabled={phase!=="recall"||occupied} onClick={()=>place(cell)}>
            {(phase==="study"||phase==="result")&&realIndex>=0&&<MemoryIcon kind={memoryThings[realIndex].kind} className="real"/>}
            {phase==="result"&&guessedIndex>=0&&answers[guessedIndex]!==positions[guessedIndex]&&<MemoryIcon kind={memoryThings[guessedIndex].kind} className="guess"/>}
          </button>;
        })}
        {phase==="ready"&&<div className="memory-ready"><span>5 segundos · 4 objetos</span><button onClick={()=>setPhase("study")}>ver a sala →</button></div>}
      </div>

      {phase==="recall"&&<div className="memory-prompt">
        <span>{current+1}/4</span><MemoryIcon kind={memoryThings[current].kind}/><div><strong>{memoryThings[current].label}</strong><small>toque numa posição vazia</small></div>
      </div>}

      {phase==="result"&&<div className="memory-summary">
        <div className="memory-legend"><span><i className="real"/>posição real</span><span><i className="guess"/>onde você colocou</span></div>
        <strong>{score}/4</strong>
        <p>{score===4?"Você remontou as quatro posições.":score>=2?"Parte da cena voltou com precisão. O restante parecia lembrança, mas era reconstrução.":"A cena voltou diferente, mesmo depois de apenas cinco segundos."}</p>
        <button onClick={()=>{setSeed(v=>v+1);setPhase("ready");setAnswers([])}}>nova sala ↺</button>
      </div>}
    </section>
    <p className="lab-thought">Lembrar parece olhar para trás. Na prática, parte da memória precisa ser montada de novo no presente.</p>
  </div>;
}

/* ALEATÓRIO */
function longestRun(seq:string[]){
  if(!seq.length)return 0;let best=1,run=1;
  for(let i=1;i<seq.length;i++){if(seq[i]===seq[i-1]){run++;best=Math.max(best,run)}else run=1}
  return best;
}
function alternation(seq:string[]){
  if(seq.length<2)return 0;let n=0;for(let i=1;i<seq.length;i++)if(seq[i]!==seq[i-1])n++;
  return Math.round(n/(seq.length-1)*100);
}
function pseudo(seed:number,n:number){
  let x=(seed||987654321)>>>0;const out:string[]=[];
  for(let i=0;i<n;i++){x^=x<<13;x^=x>>>17;x^=x<<5;out.push((x>>>0)%2?"D":"E")}return out;
}
export function RefinedHumanRandom(){
  const total=24;
  const [seq,setSeq]=useState<string[]>([]);
  const done=seq.length>=total;
  const add=(v:"E"|"D")=>setSeq(s=>s.length>=total?s:[...s,v]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(done||e.repeat)return;
      if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a"){e.preventDefault();add("E")}
      if(e.key==="ArrowRight"||e.key.toLowerCase()==="d"){e.preventDefault();add("D")}
    };
    addEventListener("keydown",onKey);return()=>removeEventListener("keydown",onKey);
  },[done]);
  const generated=useMemo(()=>pseudo(seq.reduce((n,v,i)=>n+(v==="E"?i+7:(i+13)*17),31),total),[done]);
  return <div className="refined-random lab-shell">
    <div className="instruction-banner"><span>não pense demais</span><p>Tente produzir uma sequência aleatória. Toque nos lados ou use ← e → no teclado.</p></div>
    <section className="lab-card refined-random-card">
      <header className="lab-head"><div><span>você contra o acaso</span><h2>Esquerda ou direita?</h2></div><strong>{seq.length}/{total}</strong></header>
      <div className="random-progress">{Array.from({length:total}).map((_,i)=><i key={i} className={seq[i]?(seq[i]==="E"?"left":"right"):""}/>)}</div>
      {!done?<div className="random-big-actions">
        <button onClick={()=>add("E")} aria-keyshortcuts="ArrowLeft A"><span>←</span><strong>esquerda</strong><small>tecla A ou ←</small></button>
        <button onClick={()=>add("D")} aria-keyshortcuts="ArrowRight D"><span>→</span><strong>direita</strong><small>tecla D ou →</small></button>
      </div>:<div className="random-comparison">
        <article><header><span>você</span><strong>{alternation(seq)}% alternou</strong></header><div>{seq.map((v,i)=><i key={i} className={v==="E"?"left":"right"}/>)}</div><small>maior repetição: {longestRun(seq)}</small></article>
        <article><header><span>gerador</span><strong>{alternation(generated)}% alternou</strong></header><div>{generated.map((v,i)=><i key={i} className={v==="E"?"left":"right"}/>)}</div><small>maior repetição: {longestRun(generated)}</small></article>
        <p>Repetições parecem pouco aleatórias para nós. Para o acaso, quatro escolhas iguais seguidas não são um erro de estilo.</p>
        <button onClick={()=>setSeq([])}>tentar outra vez ↺</button>
      </div>}
    </section>
    <p className="lab-thought">Quando tentamos parecer imprevisíveis, nossa ideia de “cara de acaso” começa a deixar uma assinatura.</p>
  </div>;
}

/* TESEU */
type ShipPart={id:number;name:string;type:"plank"|"mast"|"sail"|"rudder"|"flag"};
const shipParts:ShipPart[]=[
  ...Array.from({length:8},(_,i)=>({id:i,name:"tábua "+(i+1),type:"plank" as const})),
  {id:8,name:"mastro",type:"mast"},{id:9,name:"vela",type:"sail"},{id:10,name:"leme",type:"rudder"},{id:11,name:"bandeira",type:"flag"}
];
function ShipSvg({replaced,onPart,allOld=false}:{replaced:Set<number>;onPart?:(id:number)=>void;allOld?:boolean}){
  const isNew=(id:number)=>!allOld&&replaced.has(id);
  return <svg className="theseus-ship-svg" viewBox="0 0 720 360" role="img" aria-label="Barco dividido em doze partes substituíveis">
    <path className={"ship-part sail "+(isNew(9)?"new":"")} d="M350 62 350 204 506 204Z" onClick={()=>onPart?.(9)}/>
    <rect className={"ship-part mast "+(isNew(8)?"new":"")} x="338" y="50" width="18" height="184" rx="5" onClick={()=>onPart?.(8)}/>
    <path className={"ship-part flag "+(isNew(11)?"new":"")} d="M350 52h92l-28 28 28 28h-92Z" onClick={()=>onPart?.(11)}/>
    <path className={"ship-part rudder "+(isNew(10)?"new":"")} d="M544 230h50l-15 86h-42Z" onClick={()=>onPart?.(10)}/>
    {Array.from({length:8},(_,i)=>{
      const x=112+i*58;
      return <path key={i} className={"ship-part plank "+(isNew(i)?"new":"")} d={"M"+x+" 218h60l-10 72h-50Z"} onClick={()=>onPart?.(i)}/>;
    })}
    <path className="ship-outline" d="M94 218h514l-58 92H158Z"/>
  </svg>;
}
export function RefinedTheseus(){
  const [replaced,setReplaced]=useState<Set<number>>(new Set());
  const [threshold,setThreshold]=useState<number|null>(null);
  const [choice,setChoice]=useState<string|null>(null);
  const count=replaced.size;
  const replace=(id:number)=>{
    if(replaced.has(id)||count>=12)return;
    setReplaced(prev=>new Set([...prev,id]));
  };
  const reset=()=>{setReplaced(new Set());setThreshold(null);setChoice(null)};
  return <div className="refined-theseus lab-shell">
    <div className="instruction-banner"><span>toque nas peças</span><p>Substitua o barco aos poucos. Quando sentir que ele deixou de ser o mesmo, marque esse momento. Depois continue.</p></div>
    <section className="lab-card refined-theseus-card">
      <header className="lab-head"><div><span>identidade</span><h2>{count<12?"Ainda é o mesmo barco?":"Agora existem dois."}</h2></div><strong>{count}/12 trocadas</strong></header>
      {count<12?<div className="theseus-workbench">
        <div className="theseus-ship"><ShipSvg replaced={replaced} onPart={replace}/><span>peças novas ficam verdes</span></div>
        <div className="old-parts-tray"><span>peças antigas</span><div>{shipParts.filter(p=>replaced.has(p.id)).map(p=><i key={p.id}>{p.name}</i>)}</div></div>
      </div>:<div className="two-ships">
        <article><span>continuou viajando</span><ShipSvg replaced={new Set(shipParts.map(p=>p.id))}/><strong>todas as peças novas</strong></article>
        <article><span>remontado depois</span><ShipSvg replaced={new Set()} allOld/><strong>todas as peças antigas</strong></article>
      </div>}

      {count<12?<div className="theseus-decision">
        <div><span>seu limite</span><strong>{threshold===null?"ainda não marcado":threshold+" de 12 peças"}</strong></div>
        <button disabled={threshold!==null||count===0} onClick={()=>setThreshold(count)}>deixou de ser o mesmo agora</button>
        <small>Você pode continuar trocando mesmo depois de marcar.</small>
      </div>:<div className="theseus-question">
        <span>qual é o original?</span>
        <div>{["o que continuou","o remontado","os dois","nenhum"].map(v=><button key={v} className={choice===v?"active":""} onClick={()=>setChoice(v)}>{v}</button>)}</div>
        {choice&&<p>Seu limite anterior foi {threshold===null?"nunca marcado":threshold+" peças"}. Agora matéria e continuidade apontam para barcos diferentes.</p>}
        <button className="restart" onClick={reset}>recomeçar ↺</button>
      </div>}
    </section>
    <p className="lab-thought">Se identidade mora nas peças, o barco remontado parece original. Se mora na continuidade, talvez seja o outro. A dificuldade é que usamos a mesma palavra para critérios diferentes.</p>
  </div>;
}

/* PROFUNDIDADE */
type DepthMark={d:number;title:string;layer:string;text:string};
const depthMarks:DepthMark[]=[
  {d:0,title:"superfície",layer:"superfície",text:"Praticamente toda a nossa experiência cotidiana acontece numa película muito fina do planeta."},
  {d:12.26,title:"Poço de Kola",layer:"crosta",text:"A perfuração humana mais profunda chegou a cerca de 12,26 km. Em escala planetária, mal atravessamos a pele."},
  {d:35,title:"base aproximada da crosta continental",layer:"crosta",text:"A crosta continental costuma ter dezenas de quilômetros de espessura. Abaixo dela começa o manto."},
  {d:100,title:"litosfera",layer:"manto superior",text:"A camada rígida externa inclui a crosta e a parte mais alta do manto."},
  {d:660,title:"zona de transição",layer:"manto",text:"Pressão crescente muda a estrutura dos minerais. A rocha é sólida, mas pode deformar lentamente em escalas geológicas."},
  {d:2900,title:"núcleo externo",layer:"núcleo externo",text:"Aqui o material metálico é líquido. Seu movimento participa da geração do campo magnético da Terra."},
  {d:5150,title:"núcleo interno",layer:"núcleo interno",text:"Mesmo extremamente quente, a pressão é suficiente para manter a região mais interna sólida."},
  {d:6371,title:"centro da Terra",layer:"centro",text:"Você percorreu aproximadamente um raio inteiro da Terra: cerca de 6.371 km."}
];
function markForDepth(d:number){let m=depthMarks[0];for(const x of depthMarks)if(d>=x.d)m=x;return m}
export function RefinedEarthDepth(){
  const [depth,setDepth]=useState(0);
  const [angle,setAngle]=useState(-Math.PI/2);
  const svgRef=useRef<SVGSVGElement>(null);
  const mark=markForDepth(depth);
  const R=240;
  const r=R*(1-depth/6371);
  const px=300+Math.cos(angle)*r, py=300+Math.sin(angle)*r;
  const pct=depth/6371*100;

  const pick=(e:React.PointerEvent<SVGSVGElement>)=>{
    const box=svgRef.current?.getBoundingClientRect();if(!box)return;
    const x=(e.clientX-box.left)/box.width*600-300;
    const y=(e.clientY-box.top)/box.height*600-300;
    const rr=Math.min(R,Math.hypot(x,y));
    const d=(1-rr/R)*6371;
    setDepth(Math.max(0,Math.min(6371,d)));
    setAngle(Math.atan2(y,x));
  };
  const nextIndex=Math.min(depthMarks.length-1,depthMarks.findIndex(m=>m.d>depth)===-1?depthMarks.length-1:depthMarks.findIndex(m=>m.d>depth));
  const next=()=>{const m=depthMarks[nextIndex];setDepth(m.d);setAngle(-Math.PI/2)};

  return <div className="refined-depth lab-shell">
    <div className="instruction-banner"><span>viagem ao centro</span><p>Arraste a profundidade, toque dentro do planeta ou pule entre os marcos. Tudo controla a mesma viagem.</p></div>
    <section className="lab-card refined-depth-card">
      <header className="lab-head"><div><span>{mark.layer}</span><h2>{mark.title}</h2></div><strong>{depth<20?depth.toFixed(2):Math.round(depth)} km</strong></header>

      <div className="depth-interactive-grid">
        <div className="depth-map">
          <svg ref={svgRef} viewBox="0 0 600 600" onPointerDown={pick} onPointerMove={e=>{if(e.buttons===1)pick(e)}} role="img" aria-label="Corte interativo da Terra. Toque em uma profundidade para explorá-la.">
            <circle className="earth-shell mantle" cx="300" cy="300" r="240"/>
            <circle className="earth-shell outer" cx="300" cy="300" r={240*(1-2900/6371)}/>
            <circle className="earth-shell inner" cx="300" cy="300" r={240*(1-5150/6371)}/>
            <circle className="earth-shell core" cx="300" cy="300" r="5"/>
            <circle className="earth-crust-ring" cx="300" cy="300" r="238"/>
            <line className="probe-line" x1="300" y1="60" x2={px} y2={py}/>
            <circle className="depth-probe" cx={px} cy={py} r="12"/>
            <text className="earth-label" x="300" y="28">superfície</text>
            <text className="earth-label" x="300" y="590">clique em qualquer ponto do corte</text>
          </svg>
        </div>

        <aside className="depth-panel">
          <div className="depth-description"><span>{mark.layer}</span><h3>{mark.title}</h3><p>{mark.text}</p></div>
          <div className="depth-slider">
            <label><span>profundidade</span><b>{pct.toFixed(1)}% do raio</b></label>
            <input type="range" min="0" max="6371" step="1" value={Math.round(depth)} onChange={e=>{setDepth(Number(e.target.value));setAngle(-Math.PI/2)}}/>
            <div><span>0 km</span><span>6.371 km</span></div>
          </div>
          <button className="depth-next" onClick={next} disabled={depth>=6371}>{depth>=6371?"chegou ao centro":"próximo marco ↓"}</button>
        </aside>
      </div>

      <div className="depth-milestones">{depthMarks.map(m=><button key={m.d} className={Math.abs(depth-m.d)<2?"active":""} onClick={()=>{setDepth(m.d);setAngle(-Math.PI/2)}}><strong>{m.d===0?"0":m.d<20?m.d.toFixed(2):Math.round(m.d)} km</strong><span>{m.title}</span></button>)}</div>
    </section>
    <p className="lab-thought">A distância entre a superfície e tudo que já perfuramos é enorme para uma pessoa. Para a Terra, ainda é quase nada.</p>
  </div>;
}
