"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/* 26. tempo interno */
export function InnerTime(){
  const [target,setTarget]=useState(10);
  const [running,setRunning]=useState(false);
  const [elapsed,setElapsed]=useState<number|null>(null);
  const startRef=useRef(0);
  const start=()=>{startRef.current=performance.now();setElapsed(null);setRunning(true)};
  const stop=()=>{if(!running)return;setElapsed((performance.now()-startRef.current)/1000);setRunning(false)};
  const error=elapsed===null?0:elapsed-target;
  return <div className="inner-time-lab lab-shell">
    <div className="instruction-banner"><span>sem relógio</span><p>Comece. Pare quando sentir que o intervalo terminou. Não conte olhando para nada.</p></div>
    <section className="lab-card tone-card-clay">
      <header className="lab-head"><div><span>tempo percebido</span><h2>Quanto dura {target} segundos?</h2></div></header>
      <div className={"time-void "+(running?"running":"")}>{running?<button onClick={stop}>parar agora</button>:<button onClick={start}>{elapsed===null?"começar":"tentar de novo"}</button>}</div>
      {!running&&elapsed===null&&<div className="time-targets">{[10,20,30].map(n=><button key={n} className={target===n?"active":""} onClick={()=>setTarget(n)}>{n}s</button>)}</div>}
      {elapsed!==null&&!running&&<div className="time-result"><strong>{elapsed.toFixed(2)} s</strong><span>{Math.abs(error)<.5?"quase cravado":error>0?"você esperou "+Math.abs(error).toFixed(1)+" s a mais":"você parou "+Math.abs(error).toFixed(1)+" s antes"}</span><p>O relógio mede intervalos. A experiência desses intervalos acontece por outro caminho.</p></div>}
    </section>
    <p className="lab-thought">Tempo físico passa sem pedir opinião. Tempo vivido raramente parece tão regular.</p>
  </div>;
}

/* 27. Stroop */
type Ink="azul"|"verde"|"rosa"|"amarelo";
const inkHex:Record<Ink,string>={azul:"#4c8ef7",verde:"#6cad58",rosa:"#ef6d9b",amarelo:"#e0b72e"};
const stroopTrials:{word:Ink;ink:Ink}[]=[
  {word:"azul",ink:"azul"},{word:"verde",ink:"verde"},{word:"rosa",ink:"rosa"},
  {word:"azul",ink:"verde"},{word:"amarelo",ink:"rosa"},{word:"verde",ink:"azul"},
  {word:"rosa",ink:"amarelo"},{word:"azul",ink:"rosa"},{word:"verde",ink:"amarelo"},
  {word:"amarelo",ink:"amarelo"},{word:"rosa",ink:"rosa"},{word:"azul",ink:"verde"}
];
export function StroopLab(){
  const [started,setStarted]=useState(false);
  const [index,setIndex]=useState(0);
  const [times,setTimes]=useState<number[]>([]);
  const [errors,setErrors]=useState(0);
  const startedAt=useRef(0);
  useEffect(()=>{if(started&&index<stroopTrials.length)startedAt.current=performance.now()},[started,index]);
  const answer=(ink:Ink)=>{
    if(!started||index>=stroopTrials.length)return;
    if(ink!==stroopTrials[index].ink){setErrors(v=>v+1);return}
    setTimes(v=>[...v,performance.now()-startedAt.current]);
    setIndex(v=>v+1);
  };
  const done=index>=stroopTrials.length;
  const congruent=times.filter((_,i)=>stroopTrials[i]?.word===stroopTrials[i]?.ink);
  const incongruent=times.filter((_,i)=>stroopTrials[i]?.word!==stroopTrials[i]?.ink);
  const avg=(a:number[])=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const reset=()=>{setStarted(false);setIndex(0);setTimes([]);setErrors(0)};
  return <div className="stroop-lab lab-shell">
    <div className="instruction-banner"><span>ignore a palavra</span><p>Responda à cor da tinta. Não ao que está escrito.</p></div>
    <section className="lab-card tone-card-violet">
      <header className="lab-head"><div><span>interferência</span><h2>Leia menos. Veja mais.</h2></div><strong>{Math.min(index+1,12)}/12</strong></header>
      {!started?<div className="stroop-start"><button onClick={()=>setStarted(true)}>começar →</button></div>:!done?<div className="stroop-stage"><strong style={{color:inkHex[stroopTrials[index].ink]}}>{stroopTrials[index].word}</strong><div>{(Object.keys(inkHex) as Ink[]).map(c=><button key={c} style={{background:inkHex[c]}} aria-label={c} onClick={()=>answer(c)}/>)}</div></div>:
      <div className="stroop-result"><div><article><span>quando combinava</span><strong>{Math.round(avg(congruent))} ms</strong></article><article><span>quando conflitava</span><strong>{Math.round(avg(incongruent))} ms</strong></article></div><p>{avg(incongruent)>avg(congruent)?"A palavra entrou no caminho mesmo quando a tarefa era ignorá-la.":"Nesta rodada a diferença foi pequena. O conflito ainda estava presente na tarefa, mas seu tempo não separou muito os grupos."}</p><small>{errors} erro(s) antes de acertar</small><button onClick={reset}>outra rodada ↺</button></div>}
    </section>
    <p className="lab-thought">Algumas coisas que aprendemos a fazer muito bem começam a acontecer antes mesmo de pedirmos.</p>
  </div>;
}

/* 28. aniversário */
function birthdayProbability(n:number){
  if(n<=1)return 0;
  let unique=1;
  for(let i=0;i<n;i++)unique*=Math.max(0,(365-i)/365);
  return 1-unique;
}
export function BirthdayRoom(){
  const [guess,setGuess]=useState(45);
  const [revealed,setRevealed]=useState(false);
  const prob=birthdayProbability(guess);
  const people=Array.from({length:60});
  return <div className="birthday-lab lab-shell">
    <div className="instruction-banner"><span>uma coincidência</span><p>Quantas pessoas são necessárias para a chance de duas compartilharem aniversário passar de 50%?</p></div>
    <section className="lab-card tone-card-coral">
      <header className="lab-head"><div><span>pares crescem rápido</span><h2>Faça seu palpite.</h2></div><strong>{guess} pessoas</strong></header>
      <div className="people-room">{people.map((_,i)=><i key={i} className={i<guess?"in":""}/>)}</div>
      <div className="birthday-control"><input type="range" min="2" max="60" value={guess} onChange={e=>{setGuess(Number(e.target.value));setRevealed(false)}}/><button onClick={()=>setRevealed(true)}>revelar</button></div>
      {revealed&&<div className="birthday-result"><strong>{guess===23?"23. exatamente.":guess<23?"seu palpite ficou abaixo de 23.":"seu palpite ficou acima de 23."}</strong><p>Com 23 pessoas, a chance já passa de 50%. Em um grupo com {guess}, ela é de aproximadamente {Math.round(prob*100)}%.</p><div className="birthday-curve">{Array.from({length:59},(_,i)=>i+2).map(n=><i key={n} className={n===23?"mark":""} style={{height:(birthdayProbability(n)*100)+"%"}}/>)}</div></div>}
    </section>
    <p className="lab-thought">Não estamos comparando uma pessoa com 365 dias. Estamos criando pares entre todas as pessoas da sala.</p>
  </div>;
}

/* 29. Mercator */
export function ProjectionLab(){
  const [lat,setLat]=useState(0);
  const rad=Math.abs(lat)*Math.PI/180;
  const scale=Math.min(5.8,1/Math.max(.17,Math.cos(rad)));
  const area=scale*scale;
  return <div className="projection-lab lab-shell">
    <div className="instruction-banner"><span>o mesmo pedaço de terra</span><p>Mova-o do equador em direção ao polo numa projeção de Mercator.</p></div>
    <section className="lab-card tone-card-ice">
      <header className="lab-head"><div><span>mapas</span><h2>Um mapa precisa deformar alguma coisa.</h2></div><strong>{Math.abs(lat)}°</strong></header>
      <div className="mercator-stage">
        <div className="mercator-grid">{Array.from({length:8}).map((_,i)=><i key={"v"+i} className="v" style={{left:(i/7*100)+"%"}}/>)}{Array.from({length:7}).map((_,i)=><i key={"h"+i} className="h" style={{top:(i/6*100)+"%"}}/>)}</div>
        <div className="map-patch" style={{transform:"translate(-50%,-50%) scale("+scale+")"}}><span>mesma área real</span></div>
      </div>
      <div className="projection-control"><label>latitude <b>{lat>=0?lat+"° N":Math.abs(lat)+"° S"}</b></label><input type="range" min="-80" max="80" value={lat} onChange={e=>setLat(Number(e.target.value))}/><div><span>80° S</span><span>equador</span><span>80° N</span></div></div>
      <div className="projection-readout"><span>escala linear aparente</span><strong>{scale.toFixed(2)}×</strong><span>área aparente</span><strong>{area.toFixed(1)}×</strong></div>
    </section>
    <p className="lab-thought">Todo mapa é uma negociação entre propriedades que não cabem intactas quando uma esfera vira uma folha.</p>
  </div>;
}

/* 30. abaixo dos pés */
const depthMarks=[
  {d:0,title:"superfície",text:"Tudo o que chamamos de cotidiano ocupa uma película quase invisível na escala do planeta."},
  {d:12.26,title:"12,26 km",text:"O poço superprofundo de Kola chegou aproximadamente até aqui. Ainda estamos dentro da crosta."},
  {d:35,title:"crosta continental",text:"Sob continentes, a crosta costuma ter dezenas de quilômetros. Depois começa o manto."},
  {d:100,title:"litosfera",text:"A parte rígida externa inclui a crosta e o topo do manto."},
  {d:660,title:"manto profundo",text:"A pressão muda os minerais. A rocha continua sólida, mas pode deformar lentamente ao longo de tempos geológicos."},
  {d:2900,title:"núcleo externo",text:"Aqui começa uma região metálica líquida. Seu movimento participa da geração do campo magnético terrestre."},
  {d:5150,title:"núcleo interno",text:"Apesar da temperatura enorme, a pressão mantém o centro mais interno em estado sólido."},
  {d:6371,title:"centro da Terra",text:"Você percorreu aproximadamente um raio inteiro do planeta."}
];
function depthFromProgress(p:number){
  return (Math.exp(p*Math.log(6372))-1);
}
export function EarthDepth(){
  const ref=useRef<HTMLDivElement>(null);
  const [p,setP]=useState(0);
  useEffect(()=>{
    const update=()=>{
      if(!ref.current)return;
      const r=ref.current.getBoundingClientRect();
      const total=Math.max(1,ref.current.offsetHeight-innerHeight);
      setP(Math.max(0,Math.min(1,-r.top/total)));
    };
    update();addEventListener("scroll",update,{passive:true});
    return()=>removeEventListener("scroll",update);
  },[]);
  const depth=depthFromProgress(p);
  let mark=depthMarks[0];
  for(const m of depthMarks)if(depth>=m.d)mark=m;
  const layer=depth<35?"crust":depth<2900?"mantle":depth<5150?"outer-core":"inner-core";
  return <div className="earth-depth" ref={ref}>
    <div className={"earth-depth-stage "+layer}>
      <div className="depth-scale-note">escala vertical comprimida para mostrar superfície e centro na mesma viagem</div>
      <div className="depth-meter"><span>profundidade</span><strong>{depth<10?depth.toFixed(1):Math.round(depth)} km</strong><i><b style={{height:(p*100)+"%"}}/></i></div>
      <div className="earth-cutaway"><div className="earth-ring r1"/><div className="earth-ring r2"/><div className="earth-ring r3"/><div className="earth-core"/><span style={{top:(12+p*72)+"%"}}/></div>
      <article key={mark.title} className="depth-note"><span>{mark.title}</span><p>{mark.text}</p></article>
      <div className="depth-progress"><i style={{width:(p*100)+"%"}}/></div>
    </div>
    <section className="earth-finale"><span>~6.371 km</span><h2>Quase tudo que conhecemos diretamente acontece perto demais da superfície para aparecer em escala.</h2><p>Grande parte do interior da Terra é conhecida indiretamente, especialmente pelo comportamento de ondas sísmicas e por experimentos com materiais sob alta pressão.</p></section>
  </div>;
}
