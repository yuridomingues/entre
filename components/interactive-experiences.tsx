"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const treeMoments=[
  {year:1500,word:"SEMENTE",title:"uma semente começa",text:"O mundo ao redor ainda não sabe o que vai acontecer."},
  {year:1543,word:"CÉU",title:"o céu muda de lugar",text:"Copérnico publica um novo modelo do cosmos."},
  {year:1687,word:"ÓRBITA",title:"o movimento ganha regras",text:"Newton publica os Principia. A árvore continua ali."},
  {year:1859,word:"VIDA",title:"a vida ganha outra história",text:"Darwin publica A origem das espécies."},
  {year:1877,word:"SOM",title:"um som consegue voltar",text:"O fonógrafo permite registrar e reproduzir som."},
  {year:1969,word:"REDE",title:"máquinas começam a conversar",text:"A ARPANET transmite suas primeiras mensagens."},
  {year:1990,word:"WEB",title:"páginas começam a se ligar",text:"A World Wide Web começa a tomar forma."},
  {year:2026,word:"AGORA",title:"você chegou",text:"Cinco séculos passaram. A nossa régua continuou sendo a mesma árvore."}
];

export function TreeTimeline(){
  const ref=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    const update=()=>{
      if(!ref.current)return;
      const rect=ref.current.getBoundingClientRect();
      const total=ref.current.offsetHeight-innerHeight;
      setProgress(Math.max(0,Math.min(1,-rect.top/Math.max(total,1))));
    };
    update();
    addEventListener("scroll",update,{passive:true});
    return()=>removeEventListener("scroll",update);
  },[]);

  const index=Math.min(treeMoments.length-1,Math.floor(progress*treeMoments.length));
  const item=treeMoments[index];
  const year=Math.round(1500+526*progress);
  const skyLight=84-Math.sin(progress*Math.PI)*9;

  return <div className="tree-v2" ref={ref}>
    <div className="tree-v2-stage" style={{background:`hsl(${92+progress*18} 45% ${skyLight}%)`}}>
      <div className="tree-v2-word" aria-hidden="true">{item.word}</div>
      <div className="tree-v2-year"><small>ano</small><strong>{year}</strong></div>
      <div className="tree-v2-sun" style={{transform:`translate(${progress*18}vw,${Math.sin(progress*Math.PI)*-9}vh)`}}/>
      <svg className="tree-v2-art" viewBox="0 0 560 680" aria-hidden="true">
        <path d="M281 660c-10-142-4-264 17-382m-12 116-111-94m113 32 111-113m-117 213-156 19m162 48 145 48" fill="none" stroke="currentColor" strokeWidth={14+progress*10} strokeLinecap="round"/>
        <g fill="currentColor" opacity={.5+progress*.5}>
          <circle cx="150" cy="219" r={58+progress*24}/><circle cx="266" cy="154" r={72+progress*32}/><circle cx="390" cy="224" r={62+progress*28}/>
          <circle cx="112" cy="355" r={48+progress*20}/><circle cx="232" cy="327" r={70+progress*30}/><circle cx="373" cy="345" r={70+progress*28}/><circle cx="452" cy="407" r={43+progress*16}/>
        </g>
      </svg>
      <div className="tree-v2-card" key={item.year}><span>{item.year}</span><h2>{item.title}</h2><p>{item.text}</p></div>
      <div className="tree-v2-progress"><i style={{width:`${progress*100}%`}}/></div>
      <div className="tree-v2-hint">role para continuar ↓</div>
    </div>
    <section className="tree-v2-ending">
      <div className="tree-cut" aria-hidden="true">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div>
      <div><span>526 anos</span><h2>A árvore nunca viu uma linha do tempo.</h2><p>Ela só cresceu. Datas são uma maneira humana de colocar bordas em algo que não para.</p></div>
    </section>
  </div>;
}

type MindChoice="a"|"b"|"same";
const mindSlides=[
  {label:"tamanho",question:"Qual círculo do meio é maior?"},
  {label:"comprimento",question:"Qual linha é maior?"},
  {label:"cor",question:"Qual quadrado é mais escuro?"}
];

export function MindLab(){
  const [step,setStep]=useState(0);
  const [answer,setAnswer]=useState<MindChoice|null>(null);
  const next=()=>{setAnswer(null);setStep(v=>Math.min(2,v+1))};
  const restart=()=>{setAnswer(null);setStep(0)};

  return <div className="illusion-room">
    <div className="illusion-top"><span>{step+1} de 3</span><div>{mindSlides.map((_,i)=><i key={i} className={i<=step?"on":""}/>)}</div><strong>{mindSlides[step].label}</strong></div>
    <section className="illusion-card">
      <p>responda antes de revelar</p>
      <h2>{mindSlides[step].question}</h2>

      {step===0&&<div className={`ebbinghaus ${answer?"revealed":""}`}>
        <div className="illusion-option"><span>A</span><div className="cluster cluster-small">{Array.from({length:8}).map((_,i)=><i key={i}/>)}<b/></div></div>
        <div className="illusion-option"><span>B</span><div className="cluster cluster-big">{Array.from({length:6}).map((_,i)=><i key={i}/>)}<b/></div></div>
      </div>}

      {step===1&&<div className={`muller ${answer?"revealed":""}`}>
        <svg viewBox="0 0 720 260" role="img" aria-label="Linhas A e B">
          <text x="76" y="92" fontSize="28" fontWeight="900" fill="currentColor">A</text>
          <text x="76" y="194" fontSize="28" fontWeight="900" fill="currentColor">B</text>
          <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
            <path d="M170 80H550M170 80l45-35M170 80l45 35M550 80l-45-35M550 80l-45 35"/>
            <path d="M170 180H550M170 180l-45-35M170 180l-45 35M550 180l45-35M550 180l45 35"/>
          </g>
          {answer&&<g stroke="currentColor" strokeWidth="2" strokeDasharray="8 8"><path d="M170 25V225M550 25V225"/></g>}
        </svg>
      </div>}

      {step===2&&<div className={`contrast ${answer?"revealed":""}`}>
        <div className="contrast-half light"><span>A</span><b/></div>
        <div className="contrast-half dark"><span>B</span><b/></div>
        {answer&&<em>mesmo cinza</em>}
      </div>}

      {!answer?<div className="illusion-choices"><button onClick={()=>setAnswer("a")}>A</button><button onClick={()=>setAnswer("b")}>B</button><button onClick={()=>setAnswer("same")}>são iguais</button></div>
      :<div className="illusion-reveal">
        <strong>{answer==="same"?"Você desconfiou certo.":"A e B são iguais."}</strong>
        {step===0&&<p>Os círculos ao redor mudam a maneira como o centro parece. O contexto entra junto na percepção do tamanho.</p>}
        {step===1&&<p>As pontas mudam a impressão de comprimento. As linhas A e B começam e terminam exatamente no mesmo lugar.</p>}
        {step===2&&<p>O fundo muda a impressão de brilho. A e B têm o mesmo tom de cinza.</p>}
        {step<2?<button onClick={next}>próxima ilusão →</button>:<button onClick={restart}>ver de novo ↺</button>}
      </div>}
    </section>
    <p className="illusion-end">Ver parece imediato. Mesmo assim, contexto, contraste e comparação entram no que enxergamos.</p>
  </div>;
}

type Layer="pulse"|"bass"|"harmony"|"spark";
const initialLayers:Record<Layer,boolean>={pulse:true,bass:true,harmony:true,spark:true};

export function MusicLab(){
  const ctx=useRef<AudioContext|null>(null);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null);
  const [playing,setPlaying]=useState(false);
  const [layers,setLayers]=useState(initialLayers);
  const [wave,setWave]=useState<OscillatorType>("sine");
  const layersRef=useRef(layers);
  const waveRef=useRef(wave);

  useEffect(()=>{layersRef.current=layers},[layers]);
  useEffect(()=>{waveRef.current=wave},[wave]);
  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current);ctx.current?.close()},[]);

  const stop=()=>{if(timer.current)clearInterval(timer.current);timer.current=null;setPlaying(false)};
  const tone=(freq:number,dur=.16,vol=.035,type:OscillatorType=waveRef.current)=>{
    if(!ctx.current)return;
    const c=ctx.current,o=c.createOscillator(),g=c.createGain();
    o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);
    o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur);
  };
  const tick=()=>{
    const l=layersRef.current;
    if(l.pulse)tone(110,.08,.018,"sine");
    if(l.bass)tone(146.83,.32,.028,"triangle");
    if(l.harmony){tone(293.66,.45,.018);tone(369.99,.45,.014);tone(440,.45,.012)}
    if(l.spark)tone([587.33,659.25,739.99,880][Math.floor(Math.random()*4)],.12,.012,waveRef.current);
  };
  const start=async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tick();timer.current=setInterval(tick,620);setPlaying(true)};
  const toggle=(k:Layer)=>setLayers(v=>({...v,[k]:!v[k]}));

  return <div className="music-lab">
    <div className="instruction-banner"><span>como usar</span><p><strong>1.</strong> ouça tudo junto <strong>2.</strong> desligue uma camada <strong>3.</strong> compare o que mudou</p></div>
    <section className="sound-console">
      <div className="now-playing"><span className={playing?"pulse-dot active":"pulse-dot"}/><div><small>composição</small><strong>{playing?"tocando":"em silêncio"}</strong></div></div>
      <button className="play-button" onClick={playing?stop:start} aria-pressed={playing}>{playing?"■ parar":"▶ ouvir composição"}</button>
      <div className="equalizer" aria-hidden="true">{Array.from({length:20}).map((_,i)=><i key={i} style={{height:playing?`${25+(i*37)%72}%`:"8%"}}/>)}</div>
    </section>
    <section className="mixer"><p className="step-label">parte 1 · camadas</p><h2>Uma música pode parecer uma coisa só.</h2><p>Desligue uma parte por vez e ouça o espaço que ela ocupava.</p>
      {([["pulse","pulso","marca a repetição"],["bass","baixo","dá uma referência grave"],["harmony","harmonia","empilha notas"],["spark","melodia","desenha movimento"]] as [Layer,string,string][]).map(([k,n,d])=><button key={k} onClick={()=>toggle(k)} className={layers[k]?"track on":"track"} aria-pressed={layers[k]}><span>{layers[k]?"ligada":"desligada"}</span><strong>{n}</strong><small>{d}</small></button>)}
    </section>
    <section className="wave-lab"><div><p className="step-label">parte 2 · timbre</p><h2>A mesma nota pode ter texturas diferentes.</h2><p>Escolha uma forma e toque a mesma nota. A altura continua igual, mas a textura muda.</p></div><div className="wave-controls"><label htmlFor="wave">forma do som</label><select id="wave" value={wave} onChange={e=>setWave(e.target.value as OscillatorType)}><option value="sine">senoidal, mais pura</option><option value="triangle">triangular, mais macia</option><option value="square">quadrada, mais áspera</option><option value="sawtooth">serrilhada, mais brilhante</option></select><button className="pill-button" onClick={async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tone(440,.8,.05,wave)}}>ouvir a mesma nota</button></div></section>
    <aside className="source-note">Todo o som é criado na hora. Nenhuma gravação é usada.</aside>
  </div>;
}

type Door={label:string;question:string;next:string};
type ConversationNode={reply:string;doors:Door[];ending?:string};
const conversationNodes:Record<string,ConversationNode>={
  start:{reply:"Foi corrido, mas no almoço encontrei uma música que eu não ouvia há anos.",doors:[{label:"corrido",question:"Corrido como?",next:"rush"},{label:"música",question:"Que música?",next:"music"},{label:"anos",question:"Há quanto tempo?",next:"years"}]},
  rush:{reply:"Tive três coisas para resolver ao mesmo tempo. O curioso é que quase não lembro da manhã.",doors:[{label:"três coisas",question:"O que estava acontecendo?",next:"tasks"},{label:"não lembro",question:"Como assim, não lembra?",next:"attention"}]},
  music:{reply:"Era uma música que tocava muito em casa quando eu era pequeno. Bastou o começo para a sala antiga aparecer na cabeça.",doors:[{label:"em casa",question:"Você lembra da casa?",next:"home"},{label:"aparecer",question:"Veio tudo de uma vez?",next:"memory"}]},
  years:{reply:"Nem sei quantos. É estranho como algumas coisas somem por muito tempo e voltam com um detalhe só.",doors:[{label:"somem",question:"O que faz uma coisa sumir?",next:"memory"},{label:"detalhe",question:"Qual detalhe voltou primeiro?",next:"detail"}]},
  tasks:{reply:"Nada dramático. Mensagem, prazo, ligação. Quando tudo compete ao mesmo tempo, o dia vira uma lista.",doors:[],ending:"Uma palavra levou a conversa para rotina e atenção."},
  attention:{reply:"Lembro de pedaços, não da sequência. Parece que a manhã aconteceu sem eu estar olhando direito para ela.",doors:[],ending:"Uma palavra levou a conversa para memória e presença."},
  home:{reply:"Lembro da luz da janela e de uma mesa que nem existe mais. A música puxou o resto.",doors:[],ending:"Uma palavra levou a conversa para lugares e lembranças."},
  memory:{reply:"Primeiro veio uma sensação. Depois apareceram cenas. A ordem parece ter sido inventada depois.",doors:[],ending:"Uma palavra levou a conversa para o jeito como lembramos."},
  detail:{reply:"O barulho do começo da música. Engraçado que o som veio antes da imagem.",doors:[],ending:"Uma palavra levou a conversa para um detalhe quase esquecido."}
};
type Turn={question:string;reply:string;label:string};

export function ConversationDive(){
  const [nodeId,setNodeId]=useState("start");
  const [turns,setTurns]=useState<Turn[]>([]);
  const node=conversationNodes[nodeId];

  const follow=(door:Door)=>{
    const next=conversationNodes[door.next];
    setTurns(items=>[...items,{question:door.question,reply:next.reply,label:door.label}]);
    setNodeId(door.next);
  };
  const reset=()=>{setTurns([]);setNodeId("start")};

  return <div className="conversation-game">
    <div className="conversation-rule"><span>uma regra</span><p>Você não responde nada. Só escolhe qual detalhe da fala seguir.</p></div>
    <div className="chat-stage">
      <div className="chat-thread">
        <div className="bubble you">Como foi seu dia?</div><div className="bubble other">{conversationNodes.start.reply}</div>
        {turns.map((turn,i)=><div className="chat-turn" key={i}><div className="bubble you">{turn.question}</div><div className="bubble other">{turn.reply}</div></div>)}
      </div>
      {node.doors.length>0?<div className="conversation-doors"><small>qual porta você abre?</small><div>{node.doors.map(door=><button key={door.label} onClick={()=>follow(door)}>{door.label}<span>→</span></button>)}</div></div>
      :<div className="conversation-result"><span>{turns.map(turn=>turn.label).join(" → ")}</span><h2>{node.ending}</h2><p>A primeira frase era a mesma. A conversa mudou porque você escolheu o que merecia atenção.</p><button onClick={reset}>tentar outro caminho ↺</button></div>}
    </div>
    <div className="conversation-map" aria-label="Caminho escolhido"><strong>como foi seu dia?</strong>{turns.map((turn,i)=><span key={i}>→ {turn.label}</span>)}</div>
  </div>;
}

export function LifeWeeks(){
  const [years,setYears]=useState(5);
  const weeks=years*52;
  const dots=useMemo(()=>Array.from({length:520},(_,i)=>i),[]);
  return <div className="life-weeks">
    <section className="year-control"><p className="step-label">mexa na escala</p><h2><strong>{years}</strong> {years===1?"ano":"anos"} <span>≈ {weeks.toLocaleString("pt-BR")} semanas</span></h2><p>Arraste o controle ou escolha um atalho. Cada ponto abaixo representa uma semana.</p><input aria-label="Quantidade de anos" type="range" min="1" max="10" value={years} onChange={e=>setYears(Number(e.target.value))}/><div className="range-labels"><span>1 ano</span><span>10 anos</span></div><div className="quick-years">{[1,5,10].map(n=><button key={n} className={years===n?"active":""} onClick={()=>setYears(n)}>{n} {n===1?"ano":"anos"}</button>)}</div></section>
    <div className="weeks-readout"><strong aria-live="polite">{weeks}</strong><span>pontos preenchidos</span></div>
    <div className="weeks-grid" aria-label={`${weeks} semanas representadas visualmente`}>{dots.map(i=><i key={i} className={i<weeks?"filled":""}/>)}</div>
    <section className="time-prompts"><article><span>52</span><h3>semanas fazem um ano parecer diferente.</h3><p>Uma unidade menor torna repetição e intervalo mais fáceis de enxergar.</p></article><article><span>igual</span><h3>no gráfico, diferente na experiência.</h3><p>Uma semana memorável e uma semana rotineira ocupam o mesmo ponto. Medir duração não mede significado.</p></article><article><span>sem meta</span><h3>isto não é uma planilha de produtividade.</h3><p>Descanso, espera, brincadeira, estudo, conversa e silêncio também são tempo vivido.</p></article></section>
    <blockquote className="life-quote">A pergunta não é “como preencher todos os pontos?”.<br/><strong>Que tipo de coisa merece virar tempo?</strong></blockquote>
  </div>;
}

const scaleItems=[
  {name:"grão de areia",size:"1 mm",note:"cabe na ponta do dedo",visual:7},
  {name:"formiga",size:"5 mm",note:"alguns passos já viram centímetros",visual:12},
  {name:"moeda",size:"2,5 cm",note:"agora o grão quase desaparece",visual:20},
  {name:"mão",size:"18 cm",note:"uma escala que o corpo reconhece",visual:31},
  {name:"pessoa",size:"1,7 m",note:"o metro começa a fazer sentido",visual:43},
  {name:"ônibus",size:"12 m",note:"uma pessoa vira detalhe",visual:56},
  {name:"sequoia",size:"80 m",note:"um prédio cabe na comparação",visual:69},
  {name:"Everest",size:"8,8 km",note:"árvores somem na montanha",visual:82},
  {name:"Terra",size:"12.742 km",note:"a montanha vira uma pequena rugosidade",visual:96}
];

export function ScaleExplorer(){
  const [index,setIndex]=useState(3);
  const item=scaleItems[index];
  return <div className="scale-explorer">
    <section className="scale-stage"><div className="scale-copy"><span>escala {index+1} de {scaleItems.length}</span><h2>{item.name}</h2><strong>{item.size}</strong><p>{item.note}</p></div><div className="scale-orbit" aria-hidden="true"><i style={{width:`${item.visual}%`,height:`${item.visual}%`}}/><b>{item.name}</b></div></section>
    <div className="scale-control"><label htmlFor="scale-range">arraste para aumentar a régua</label><input id="scale-range" type="range" min="0" max={scaleItems.length-1} value={index} onChange={e=>setIndex(Number(e.target.value))}/><div><span>1 mm</span><span>12.742 km</span></div></div>
    <p className="scale-ending">Grande e pequeno não são propriedades soltas. Quase sempre são comparações.</p>
  </div>;
}

const WALKERS=81;
const STEPS=32;

export function RandomWalk(){
  const [positions,setPositions]=useState<number[]>(Array(WALKERS).fill(0));
  const [step,setStep]=useState(0);
  const [running,setRunning]=useState(false);

  useEffect(()=>{
    if(!running)return;
    if(step>=STEPS){setRunning(false);return}
    const id=setTimeout(()=>{setPositions(values=>values.map(v=>v+(Math.random()<.5?-1:1)));setStep(v=>v+1)},70);
    return()=>clearTimeout(id);
  },[running,step]);

  const bins=useMemo(()=>{
    const result=Array.from({length:STEPS+1},()=>0);
    positions.forEach(pos=>{const normalized=Math.round((pos+STEPS)/2);if(result[normalized]!==undefined)result[normalized]++});
    return result;
  },[positions]);

  const start=()=>{setPositions(Array(WALKERS).fill(0));setStep(0);setRunning(true)};

  return <div className="random-lab">
    <section className="random-stage"><div className="random-head"><span>{step} de {STEPS} escolhas</span><h2>{running?"cada ponto escolhe um lado":step===STEPS?"olhe onde eles chegaram":"81 pontos no mesmo lugar"}</h2></div>
      <div className="random-bars" aria-label="Distribuição dos pontos">{bins.map((count,i)=><div key={i} className="random-column"><i style={{height:`${Math.max(2,count*9)}px`}}/><small>{count||""}</small></div>)}</div>
      <div className="random-axis"><span>mais para A</span><b>início</b><span>mais para B</span></div>
      <button onClick={start} disabled={running}>{running?"andando...":step===0?"soltar os pontos":"soltar de novo"}</button>
    </section>
    <p className="random-ending">{step===STEPS?"Cada escolha foi imprevisível. O conjunto, porém, criou uma forma bem menos caótica do que parece.":"Todos começam juntos. Em cada passo, cada ponto tem a mesma chance de ir para A ou B."}</p>
  </div>;
}

export function NightSky(){
  const [light,setLight]=useState(82);
  const stars=useMemo(()=>Array.from({length:88},(_,i)=>({left:(i*47)%97,top:4+((i*71)%62),size:1+(i%4),threshold:(i*31)%100})),[]);
  const darkness=100-light;

  return <div className="night-lab">
    <section className="night-stage" style={{background:`rgb(${12+light*.55},${18+light*.48},${42+light*.42})`}}>
      <div className="stars" aria-hidden="true">{stars.map((star,i)=><i key={i} style={{left:`${star.left}%`,top:`${star.top}%`,width:star.size,height:star.size,opacity:darkness>star.threshold?1:.05}}/>)}</div>
      <div className="night-title"><span>luz da cidade {light}%</span><h2>{light>65?"o céu parece quase vazio":light>30?"algumas estrelas voltam":"o céu estava cheio o tempo todo"}</h2></div>
      <div className="skyline" aria-hidden="true">{[38,55,31,68,44,60,35,73,48,57,40].map((h,i)=><b key={i} style={{height:`${h}%`}}><em style={{opacity:light/100}}/></b>)}</div>
    </section>
    <div className="night-control"><label htmlFor="city-light">luzes da cidade</label><input id="city-light" type="range" min="0" max="100" value={light} onChange={e=>setLight(Number(e.target.value))}/><div><span>apagadas</span><span>acesas</span></div></div>
    <p className="night-ending">As estrelas não aparecem porque ficaram mais brilhantes. O fundo ficou menos claro.</p>
  </div>;
}
