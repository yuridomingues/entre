"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type MemoryKind="book"|"mug"|"plant"|"clock";
const memoryObjects:{kind:MemoryKind;label:string}[]=[
  {kind:"book",label:"livro"},{kind:"mug",label:"caneca"},{kind:"plant",label:"planta"},{kind:"clock",label:"relógio"}
];

function memoryPositions(seed:number){
  const cells=Array.from({length:12},(_,i)=>i);
  let x=(seed+1)*7919;
  for(let i=cells.length-1;i>0;i--){
    x=(x*1103515245+12345)&0x7fffffff;
    const j=x%(i+1);
    [cells[i],cells[j]]=[cells[j],cells[i]];
  }
  return cells.slice(0,4);
}

function MemoryObject({kind}:{kind:MemoryKind}){
  if(kind==="book")return <span className="memory-shape book"><i/><i/></span>;
  if(kind==="mug")return <span className="memory-shape mug"><i/></span>;
  if(kind==="plant")return <span className="memory-shape plant"><i/><i/><i/></span>;
  return <span className="memory-shape clock"><i/><i/></span>;
}

export function MemoryRebuild(){
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
    if(phase!=="recall")return;
    const next=[...answers,cell];
    setAnswers(next);
    if(current>=memoryObjects.length-1)setPhase("result");
    else setCurrent(v=>v+1);
  };

  const score=answers.reduce((n,cell,i)=>n+(cell===positions[i]?1:0),0);

  return <div className="memory-lab">
    <div className="instruction-banner"><span>sem anotar</span><p>Olhe a cena por cinco segundos. Depois reconstrua onde cada coisa estava.</p></div>
    <section className="memory-card">
      <header className="memory-head">
        <div><span>{phase==="study"?"agora olhe":phase==="recall"?"agora lembre":"memória espacial"}</span><h2>{phase==="recall"?"Onde estava?":"Uma sala pequena."}</h2></div>
        {phase==="study"&&<strong className="memory-countdown">{seconds}</strong>}
      </header>

      <div className={"memory-room "+phase}>
        {Array.from({length:12}).map((_,cell)=>{
          const realIndex=positions.indexOf(cell);
          const answerIndex=answers.indexOf(cell);
          return <button key={cell} className="memory-cell" disabled={phase!=="recall"} onClick={()=>place(cell)} aria-label={"posição "+(cell+1)}>
            {(phase==="study"||phase==="result")&&realIndex>=0&&<MemoryObject kind={memoryObjects[realIndex].kind}/>}
            {phase==="result"&&answerIndex>=0&&answers[answerIndex]!==positions[answerIndex]&&<span className="memory-miss"><MemoryObject kind={memoryObjects[answerIndex].kind}/></span>}
          </button>;
        })}
        {phase==="ready"&&<div className="memory-overlay"><span>você terá 5 segundos</span><button onClick={()=>setPhase("study")}>ver a cena →</button></div>}
      </div>

      {phase==="recall"&&<div className="memory-recall">
        <span>{current+1} de 4</span>
        <div><MemoryObject kind={memoryObjects[current].kind}/><strong>{memoryObjects[current].label}</strong></div>
        <p>toque na posição em que você lembra dela</p>
      </div>}

      {phase==="result"&&<div className="memory-result">
        <div><strong>{score}/4</strong><span>posições</span></div>
        <p>{score===4?"Você reconstruiu a cena inteira.":score>=2?"Parte da cena voltou; outra parte foi preenchida pelo melhor palpite.":"A sensação de lembrar pode existir mesmo quando o mapa muda bastante."}</p>
        <button onClick={()=>{setSeed(v=>v+1);setPhase("ready");setAnswers([])}}>nova sala ↺</button>
      </div>}
    </section>
    <p className="memory-thought">Lembrar não é abrir uma fotografia intacta. É reconstruir alguma coisa usando vestígios que sobraram.</p>
  </div>;
}

const attentionEvents=[
  "blue","pink","blue","blue","pink","blue","pink","blue","blue","pink","blue","pink"
] as const;
const attentionBlue=attentionEvents.filter(v=>v==="blue").length;

export function AttentionTest(){
  const [phase,setPhase]=useState<"ready"|"run"|"count"|"noticed"|"result">("ready");
  const [tick,setTick]=useState(-1);
  const [countGuess,setCountGuess]=useState<number|null>(null);
  const [noticed,setNoticed]=useState<boolean|null>(null);

  useEffect(()=>{
    if(phase!=="run")return;
    setTick(0);
    let value=0;
    const interval=setInterval(()=>{
      value++;
      if(value>=attentionEvents.length){
        clearInterval(interval);
        setTimeout(()=>setPhase("count"),350);
      }else setTick(value);
    },610);
    return()=>clearInterval(interval);
  },[phase]);

  const restart=()=>{setPhase("ready");setTick(-1);setCountGuess(null);setNoticed(null)};

  return <div className="attention-lab">
    <div className="instruction-banner"><span>missão</span><p>Conte apenas quantos círculos azuis atravessam a linha do meio.</p></div>
    <section className="attention-card">
      <header><span>atenção seletiva</span><h2>{phase==="run"?"não perca a conta":"O que passou sem entrar?"}</h2></header>

      <div className="attention-stage">
        <div className="attention-line"/>
        {phase==="run"&&tick>=0&&<span key={tick} className={"attention-token "+attentionEvents[tick]+(tick%2?" reverse":"")}/>}
        {phase==="run"&&tick>=5&&tick<=8&&<div className="attention-stranger" aria-hidden="true"><span>△</span></div>}
        {phase==="ready"&&<div className="attention-overlay"><button onClick={()=>setPhase("run")}>começar contagem →</button></div>}
      </div>

      {phase==="count"&&<div className="attention-question">
        <span>primeiro</span><h3>Quantos azuis atravessaram?</h3>
        <div>{[5,6,7,8,9].map(n=><button key={n} onClick={()=>{setCountGuess(n);setPhase("noticed")}}>{n}</button>)}</div>
      </div>}

      {phase==="noticed"&&<div className="attention-question">
        <span>agora outra coisa</span><h3>Você viu um triângulo enorme atravessar a cena?</h3>
        <div><button onClick={()=>{setNoticed(true);setPhase("result")}}>vi</button><button onClick={()=>{setNoticed(false);setPhase("result")}}>não vi</button></div>
      </div>}

      {phase==="result"&&<div className="attention-result">
        <div><strong>{countGuess===attentionBlue?"contagem certa":"eram "+attentionBlue}</strong><span>{noticed?"e você viu o intruso":"e o intruso passou fora da sua tarefa"}</span></div>
        <p>Aquilo que recebe atenção fica nítido. Isso não significa que todo o resto também entre na experiência consciente.</p>
        <button onClick={restart}>tentar de novo ↺</button>
      </div>}
    </section>
    <p className="attention-thought">Prestar atenção não é iluminar tudo. É escolher o que merece luz e aceitar que alguma coisa ficará escura.</p>
  </div>;
}

type Marble="purple"|"green";
function makeEvidence(seed:number,secret:0|1){
  let x=(seed+3)*104729;
  const purpleChance=secret===0?.75:.25;
  return Array.from({length:6},()=>{
    x=(x*48271)%2147483647;
    return (x/2147483647)<purpleChance?"purple":"green" as Marble;
  });
}

export function EvidenceLab(){
  const [run,setRun]=useState(0);
  const secret=(run%2) as 0|1;
  const samples=useMemo(()=>makeEvidence(run,secret),[run,secret]);
  const [drawn,setDrawn]=useState<Marble[]>([]);
  const [belief,setBelief]=useState(50);
  const [history,setHistory]=useState<number[]>([]);
  const [revealed,setRevealed]=useState(false);

  const draw=()=>{
    if(drawn.length>=6||revealed)return;
    setHistory(v=>[...v,belief]);
    setDrawn(v=>[...v,samples[v.length]]);
  };
  const reveal=()=>{
    setHistory(v=>history.length<drawn.length?[...v,belief]:v);
    setRevealed(true);
  };
  const restart=()=>{
    setRun(v=>v+1);setDrawn([]);setBelief(50);setHistory([]);setRevealed(false);
  };

  return <div className="evidence-lab">
    <div className="instruction-banner"><span>duas caixas</span><p>Uma delas foi escolhida em segredo. Puxe pistas e mova sua certeza sempre que quiser.</p></div>
    <section className="evidence-card">
      <header><div><span>qual caixa está sendo usada?</span><h2>Deixe a certeza se mover.</h2></div><strong>{drawn.length}/6 pistas</strong></header>

      <div className="jar-row">
        <div className="jar"><span>caixa A</span><div>{Array.from({length:8}).map((_,i)=><i key={i} className={i<6?"purple":"green"}/>)}</div><small>mais roxa</small></div>
        <div className="evidence-stream">
          {drawn.length===0?<span>nenhuma pista ainda</span>:drawn.map((m,i)=><i key={i} className={m}/>)}
        </div>
        <div className="jar"><span>caixa B</span><div>{Array.from({length:8}).map((_,i)=><i key={i} className={i<2?"purple":"green"}/>)}</div><small>mais verde</small></div>
      </div>

      <div className="belief-control">
        <div><span>A</span><strong>{belief<50?100-belief+"%":"?"}</strong></div>
        <label><span>sua aposta agora</span><input type="range" min="0" max="100" value={belief} onChange={e=>setBelief(Number(e.target.value))}/><i style={{left:belief+"%"}}/></label>
        <div><span>B</span><strong>{belief>50?belief+"%":"?"}</strong></div>
      </div>

      <div className="evidence-actions">
        <button onClick={draw} disabled={drawn.length>=6||revealed}>puxar uma pista</button>
        <button className="primary" onClick={reveal} disabled={drawn.length===0||revealed}>revelar caixa</button>
      </div>

      {revealed&&<div className="evidence-result">
        <strong>era a caixa {secret===0?"A":"B"}</strong>
        <p>{(secret===0&&belief<50)||(secret===1&&belief>50)?"Sua última inclinação apontava para ela.":"Sua última inclinação apontava para a outra. Uma sequência curta ainda pode enganar."}</p>
        <div className="belief-history">{history.map((v,i)=><i key={i} style={{left:v+"%"}} title={"pista "+(i+1)}/>)}</div>
        <button onClick={restart}>outra sequência ↺</button>
      </div>}
    </section>
    <p className="evidence-thought">Mudar de ideia não precisa ser derrota. Às vezes é só uma crença fazendo o que deveria quando o mundo entrega informação nova.</p>
  </div>;
}
