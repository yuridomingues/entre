"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/* 16. Tente ser aleatório */
function longestRun(seq:string[]){
  if(!seq.length)return 0;
  let best=1,run=1;
  for(let i=1;i<seq.length;i++){if(seq[i]===seq[i-1]){run++;best=Math.max(best,run)}else run=1}
  return best;
}
function alternationRate(seq:string[]){
  if(seq.length<2)return 0;
  let changes=0;
  for(let i=1;i<seq.length;i++)if(seq[i]!==seq[i-1])changes++;
  return Math.round(changes/(seq.length-1)*100);
}
function seededBits(seed:number,n:number){
  let x=(seed||1234567)>>>0;
  const out:string[]=[];
  for(let i=0;i<n;i++){x^=x<<13;x^=x>>>17;x^=x<<5;out.push((x>>>0)%2===0?"E":"D")}
  return out;
}
export function HumanRandom(){
  const [seq,setSeq]=useState<string[]>([]);
  const done=seq.length>=30;
  const comparator=useMemo(()=>seededBits(seq.reduce((n,v,i)=>n+(v==="E"?i+3:(i+7)*11),17),30),[done]);
  const add=(v:string)=>{if(!done)setSeq(s=>[...s,v])};
  const alt=alternationRate(seq),rndAlt=alternationRate(comparator);
  const run=longestRun(seq),rndRun=longestRun(comparator);
  return <div className="random-human lab-shell">
    <div className="instruction-banner"><span>missão</span><p>Faça 30 escolhas tentando parecer o mais aleatório possível.</p></div>
    <section className="lab-card tone-card-pink">
      <header className="lab-head"><div><span>não planeje demais</span><h2>Esquerda ou direita?</h2></div><strong>{seq.length}/30</strong></header>
      <div className="binary-stream">{Array.from({length:30}).map((_,i)=><i key={i} className={seq[i]?("filled "+(seq[i]==="E"?"left":"right")):""}>{seq[i]||""}</i>)}</div>
      {!done?<div className="binary-actions"><button onClick={()=>add("E")}>← esquerda</button><button onClick={()=>add("D")}>direita →</button></div>:
      <div className="random-reveal">
        <div className="sequence-compare"><article><span>você</span><div>{seq.map((v,i)=><i key={i} className={v==="E"?"left":"right"}/>)}</div><small>{alt}% de alternâncias · maior sequência igual: {run}</small></article><article><span>um gerador</span><div>{comparator.map((v,i)=><i key={i} className={v==="E"?"left":"right"}/>)}</div><small>{rndAlt}% de alternâncias · maior sequência igual: {rndRun}</small></article></div>
        <p>{alt>60?"Você alternou bastante. Quando tentamos parecer aleatórios, repetições longas costumam parecer suspeitas mesmo quando o acaso as produz.":"Sua sequência aceitou algumas repetições. Compare como o gerador também cria blocos que parecem planejados."}</p>
        <button onClick={()=>setSeq([])}>tentar de novo ↺</button>
      </div>}
    </section>
    <p className="lab-thought">O acaso não tenta parecer aleatório. Nós tentamos.</p>
  </div>;
}

/* 17. Navio de Teseu */
export function Theseus(){
  const [replaced,setReplaced]=useState(0);
  const [threshold,setThreshold]=useState<number|null>(null);
  const [choice,setChoice]=useState<string|null>(null);
  const planks=12;
  const next=()=>setReplaced(v=>Math.min(planks,v+1));
  const reset=()=>{setReplaced(0);setThreshold(null);setChoice(null)};
  return <div className="theseus-lab lab-shell">
    <div className="instruction-banner"><span>uma peça por vez</span><p>Troque as tábuas. Marque o momento em que, para você, ele deixa de ser o mesmo barco.</p></div>
    <section className="lab-card tone-card-sand">
      <header className="lab-head"><div><span>identidade</span><h2>Ainda é o mesmo?</h2></div><strong>{replaced}/{planks}</strong></header>
      <div className="ship-stage">
        <div className="ship">
          <div className="mast"/><div className="sail"/>
          <div className="hull">{Array.from({length:planks}).map((_,i)=><i key={i} className={i<replaced?"new":"old"}/>)}</div>
        </div>
        {replaced===planks&&<div className="ship old-ship"><div className="mast"/><div className="sail"/><div className="hull">{Array.from({length:planks}).map((_,i)=><i key={i} className="old"/>)}</div><span>feito com as peças antigas</span></div>}
      </div>
      {replaced<planks?<div className="theseus-controls">
        <button onClick={next}>trocar uma tábua</button>
        <button className="secondary" disabled={threshold!==null} onClick={()=>setThreshold(replaced)}>{threshold===null?"deixou de ser o mesmo aqui":"marcado em "+threshold+"/"+planks}</button>
      </div>:<div className="theseus-finale">
        <p>Agora existe o barco que continuou viajando, feito de peças novas, e outro remontado com todas as peças antigas.</p>
        <strong>Qual é o original?</strong>
        <div>{["o que continuou","o remontado","os dois","nenhum"].map(v=><button key={v} className={choice===v?"active":""} onClick={()=>setChoice(v)}>{v}</button>)}</div>
        {choice&&<p className="answer-note">Você colocou identidade em uma história de continuidade, em matéria, nas duas coisas ou em nenhuma delas. O objeto não trouxe a resposta pronta.</p>}
        <button className="restart" onClick={reset}>recomeçar ↺</button>
      </div>}
    </section>
    <p className="lab-thought">Mudar uma peça parece pouco. Trocar todas parece muito. O problema é descobrir onde, no meio, a identidade deveria ter ido embora.</p>
  </div>;
}

/* 18. Qual pergunta vale mais? */
type Creature={id:number;purple:boolean;round:boolean;antenna:boolean;big:boolean};
const creatures:Creature[]=Array.from({length:16},(_,i)=>({id:i+1,purple:!!(i&1),round:!!(i&2),antenna:!!(i&4),big:!!(i&8)}));
const secretCreature=creatures[10];
const questionBank=[
  {label:"é roxa?",fn:(c:Creature)=>c.purple},
  {label:"é redonda?",fn:(c:Creature)=>c.round},
  {label:"tem antena?",fn:(c:Creature)=>c.antenna},
  {label:"é grande?",fn:(c:Creature)=>c.big},
  {label:"é a criatura 7?",fn:(c:Creature)=>c.id===7}
];
export function BetterQuestion(){
  const [remaining,setRemaining]=useState(creatures);
  const [history,setHistory]=useState<{q:string;cut:number;yes:boolean}[]>([]);
  const [finished,setFinished]=useState(false);
  const ask=(q:typeof questionBank[number])=>{
    if(finished)return;
    const yes=q.fn(secretCreature);
    const next=remaining.filter(c=>q.fn(c)===yes);
    setHistory(h=>[...h,{q:q.label,cut:remaining.length-next.length,yes}]);
    setRemaining(next);
    if(next.length<=1||history.length>=3)setFinished(true);
  };
  const reset=()=>{setRemaining(creatures);setHistory([]);setFinished(false)};
  return <div className="question-lab lab-shell">
    <div className="instruction-banner"><span>uma criatura foi escolhida</span><p>Você não precisa adivinhar rápido. Escolha perguntas que eliminem possibilidades.</p></div>
    <section className="lab-card tone-card-mint">
      <header className="lab-head"><div><span>informação</span><h2>Qual pergunta vale mais?</h2></div><strong>{remaining.length} possíveis</strong></header>
      <div className="creature-grid">{creatures.map(c=><div key={c.id} className={"creature "+(!remaining.some(r=>r.id===c.id)?"eliminated ":"")+(c.purple?"purple ":"")+(c.round?"round ":"")+(c.big?"big":"")}><i/>{c.antenna&&<b/>}<span>{c.id}</span></div>)}</div>
      {!finished?<div className="question-options">{questionBank.map(q=><button key={q.label} onClick={()=>ask(q)}>{q.label}</button>)}</div>:
      <div className="question-result"><strong>{remaining.length===1?"encontrou":"restaram "+remaining.length}</strong><p>{history.map((h,i)=><span key={i}>{h.q} → {h.yes?"sim":"não"} · eliminou {h.cut}</span>)}</p><p>Uma pergunta vale pelo quanto ela reduz o espaço de possibilidades, não pelo quanto parece específica.</p><button onClick={reset}>outra vez ↺</button></div>}
    </section>
    <p className="lab-thought">Saber perguntar pode ser uma forma de saber procurar.</p>
  </div>;
}

/* 19. Cegueira à mudança */
const sceneTargets=["janela","planta","relógio","livro","luminária"];
export function ChangeBlindness(){
  const [running,setRunning]=useState(false);
  const [variant,setVariant]=useState(false);
  const [attempts,setAttempts]=useState(0);
  const [found,setFound]=useState(false);
  const started=useRef(0);
  const [elapsed,setElapsed]=useState(0);
  useEffect(()=>{
    if(!running||found)return;
    started.current=performance.now();
    const t=setInterval(()=>setVariant(v=>!v),520);
    return()=>clearInterval(t);
  },[running,found]);
  const guess=(name:string)=>{
    if(!running||found)return;
    setAttempts(v=>v+1);
    if(name==="luminária"){setFound(true);setRunning(false);setElapsed((performance.now()-started.current)/1000)}
  };
  const reset=()=>{setRunning(false);setVariant(false);setAttempts(0);setFound(false);setElapsed(0)};
  return <div className="blindness-lab lab-shell">
    <div className="instruction-banner"><span>uma coisa muda</span><p>As duas cenas alternam. Toque no objeto que muda.</p></div>
    <section className="lab-card tone-card-lilac">
      <header className="lab-head"><div><span>mudança</span><h2>Você percebe quando acontece?</h2></div><strong>{attempts} tentativas</strong></header>
      <div className={"flicker-scene "+(variant?"variant":"")}>
        <div className="window"/><div className="plant"><i/><i/><i/></div><div className="clock"/><div className="books"><i/><i/><i/></div><div className="lamp"/><div className="table"/>
        {!running&&!found&&<div className="flicker-overlay"><button onClick={()=>setRunning(true)}>começar →</button></div>}
      </div>
      {running&&<div className="scene-guesses">{sceneTargets.map(v=><button key={v} onClick={()=>guess(v)}>{v}</button>)}</div>}
      {found&&<div className="blindness-result"><strong>era a luminária.</strong><p>Sem a interrupção entre as cenas, a mudança parece óbvia. Com o corte, o cérebro precisa reencontrar o que comparar.</p><small>{attempts} tentativa(s) · cerca de {elapsed.toFixed(1)} s</small><button onClick={reset}>ver de novo ↺</button></div>}
    </section>
    <p className="lab-thought">Olhar para uma cena não significa guardar cada detalhe dela.</p>
  </div>;
}

/* 20. Sorites */
export function Sorites(){
  const [count,setCount]=useState(1);
  const [upMark,setUpMark]=useState<number|null>(null);
  const [downMark,setDownMark]=useState<number|null>(null);
  const phase=upMark===null?"up":downMark===null?"down":"done";
  const dots=Math.min(180,count);
  const add=(n:number)=>setCount(v=>Math.min(300,v+n));
  const remove=(n:number)=>setCount(v=>Math.max(1,v-n));
  const reset=()=>{setCount(1);setUpMark(null);setDownMark(null)};
  return <div className="sorites-lab lab-shell">
    <div className="instruction-banner"><span>sem resposta oficial</span><p>{phase==="up"?"Adicione grãos. Marque o instante em que isso vira um monte.":"Agora retire. Marque quando deixa de ser um monte."}</p></div>
    <section className="lab-card tone-card-gold">
      <header className="lab-head"><div><span>limites vagos</span><h2>{phase==="done"?"Dois limites para a mesma palavra.":"Isso é um monte?"}</h2></div><strong>{count} grãos</strong></header>
      <div className="grain-stage">{Array.from({length:dots}).map((_,i)=>{const row=Math.floor(Math.sqrt(i));const x=(i*37)%88;return <i key={i} style={{left:(6+x)+"%",bottom:(8+row*2.4)+"%"}}/>})}</div>
      {phase==="up"&&<div className="grain-controls"><div><button onClick={()=>add(1)}>+1</button><button onClick={()=>add(10)}>+10</button><button onClick={()=>add(50)}>+50</button></div><button className="primary" onClick={()=>{setUpMark(count);setCount(300)}}>agora virou um monte</button></div>}
      {phase==="down"&&<div className="grain-controls"><div><button onClick={()=>remove(1)}>-1</button><button onClick={()=>remove(10)}>-10</button><button onClick={()=>remove(50)}>-50</button></div><button className="primary" onClick={()=>setDownMark(count)}>agora deixou de ser</button></div>}
      {phase==="done"&&<div className="sorites-result"><div><span>virou monte</span><strong>{upMark}</strong></div><div><span>deixou de ser</span><strong>{downMark}</strong></div><p>Se os números não coincidem, sua própria fronteira dependeu do caminho usado para chegar nela.</p><button onClick={reset}>recomeçar ↺</button></div>}
    </section>
    <p className="lab-thought">Algumas palavras parecem exigir uma linha que o mundo nunca desenhou.</p>
  </div>;
}
