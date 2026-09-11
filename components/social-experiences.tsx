"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type NetNode={id:number;x:number;y:number};
const spreadNodes:NetNode[]=[
  {id:0,x:80,y:110},{id:1,x:170,y:65},{id:2,x:270,y:115},{id:3,x:120,y:210},
  {id:4,x:235,y:225},{id:5,x:335,y:175},{id:6,x:85,y:330},{id:7,x:220,y:345},
  {id:8,x:360,y:315},{id:9,x:520,y:300},{id:10,x:565,y:130},{id:11,x:670,y:80},
  {id:12,x:740,y:185},{id:13,x:645,y:245},{id:14,x:755,y:335},{id:15,x:850,y:210}
];
const spreadEdges:[number,number][]=[
  [0,1],[0,3],[1,2],[1,3],[2,4],[2,5],[3,4],[3,6],[4,5],[4,7],[5,8],[6,7],[7,8],
  [9,10],[9,13],[9,14],[10,11],[10,13],[11,12],[12,13],[12,15],[13,14],[13,15],[14,15]
];
const bridge:[number,number]=[8,9];

function distancesFrom(seeds:number[],hasBridge:boolean){
  const edges=hasBridge?[...spreadEdges,bridge]:spreadEdges;
  const out=Array(spreadNodes.length).fill(-1) as number[];
  const queue=[...seeds];
  seeds.forEach(id=>out[id]=0);
  while(queue.length){
    const current=queue.shift()!;
    for(const [a,b] of edges){
      const next=a===current?b:b===current?a:null;
      if(next!==null&&out[next]===-1){
        out[next]=out[current]+1;
        queue.push(next);
      }
    }
  }
  return out;
}

export function IdeaSpread(){
  const [seeds,setSeeds]=useState<number[]>([1]);
  const [hasBridge,setHasBridge]=useState(true);
  const [result,setResult]=useState<number[]|null>(null);
  const [wave,setWave]=useState(-1);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current)},[]);

  const resetRun=()=>{
    if(timer.current)clearInterval(timer.current);
    timer.current=null;
    setResult(null);
    setWave(-1);
  };

  const toggleSeed=(id:number)=>{
    resetRun();
    setSeeds(current=>{
      if(current.includes(id))return current.filter(v=>v!==id);
      if(current.length<3)return [...current,id];
      return [current[1],current[2],id];
    });
  };

  const run=()=>{
    if(seeds.length===0)return;
    resetRun();
    const next=distancesFrom(seeds,hasBridge);
    setResult(next);
    setWave(0);
    const max=Math.max(...next);
    if(max>0){
      timer.current=setInterval(()=>{
        setWave(v=>{
          if(v>=max){
            if(timer.current)clearInterval(timer.current);
            timer.current=null;
            return v;
          }
          return v+1;
        });
      },330);
    }
  };

  const reached=result?result.filter(v=>v>=0&&v<=wave).length:seeds.length;
  const finalReached=result?result.filter(v=>v>=0).length:seeds.length;
  const finished=!!result&&wave>=Math.max(...result);

  return <div className="spread-lab">
    <div className="instruction-banner"><span>experimente</span><p>Escolha até 3 pessoas para começar. Depois corte uma única ponte e rode de novo.</p></div>

    <section className="spread-card">
      <header className="spread-head">
        <div><span>a mesma ideia</span><h2>Quem conhece quem muda o caminho.</h2></div>
        <div className="spread-counter"><strong>{reached}</strong><span>de 16</span></div>
      </header>

      <div className="spread-board">
        <svg viewBox="0 0 930 430" role="img" aria-label="Rede com dezesseis pessoas conectadas">
          <g className="spread-lines">
            {spreadEdges.map(([a,b],i)=><line key={i} x1={spreadNodes[a].x} y1={spreadNodes[a].y} x2={spreadNodes[b].x} y2={spreadNodes[b].y}/>)}
            {hasBridge&&<line className="bridge" x1={spreadNodes[8].x} y1={spreadNodes[8].y} x2={spreadNodes[9].x} y2={spreadNodes[9].y}/>}
          </g>
          <g className="spread-people">
            {spreadNodes.map(node=>{
              const distance=result?.[node.id]??-1;
              const active=result?distance>=0&&distance<=wave:seeds.includes(node.id);
              const seed=seeds.includes(node.id);
              return <g key={node.id} className={(active?"active ":"")+(seed?"seed":"")} role="button" tabIndex={0}
                aria-label={(seed?"Remover":"Escolher")+" pessoa "+(node.id+1)}
                onClick={()=>toggleSeed(node.id)}
                onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")toggleSeed(node.id)}}>
                <circle className="person-ring" cx={node.x} cy={node.y} r="22"/>
                <circle className="person-core" cx={node.x} cy={node.y} r="7"/>
                {seed&&<circle className="seed-mark" cx={node.x} cy={node.y} r="31"/>}
              </g>;
            })}
          </g>
        </svg>
        <div className="spread-labels"><span>grupo 1</span><span>grupo 2</span></div>
      </div>

      <div className="spread-controls">
        <div className="seed-readout"><span>começos</span><strong>{seeds.length}/3</strong><small>clique nos pontos</small></div>
        <button className={hasBridge?"bridge-button on":"bridge-button"} onClick={()=>{resetRun();setHasBridge(v=>!v)}} aria-pressed={hasBridge}>
          <i/><span><strong>ponte entre grupos</strong><small>{hasBridge?"existe":"cortada"}</small></span>
        </button>
        <button className="spread-run" onClick={run} disabled={seeds.length===0}>espalhar →</button>
      </div>

      {finished&&<div className="spread-result">
        <strong>{finalReached===16?"chegou em todo mundo":finalReached+" pessoas alcançadas"}</strong>
        <p>{!hasBridge&&finalReached<16
          ?"Uma linha a menos foi suficiente para separar dois mundos."
          :seeds.length>1
            ?"Mais pontos de partida aceleraram a travessia, mas a estrutura ainda decidiu por onde ela passou."
            :"Uma pessoa bastou porque havia um caminho contínuo até o outro lado."}</p>
        <button onClick={resetRun}>mudar e tentar de novo ↺</button>
      </div>}
    </section>

    <p className="spread-thought">Às vezes o alcance de uma ideia diz menos sobre a ideia do que sobre os caminhos disponíveis para ela.</p>
  </div>;
}

type Move="share"|"keep";
type Round={you:Move;them:Move;youGain:number;themGain:number};
const opponents=[
  {name:"pessoa A",reveal:"espelha",description:"Começa dividindo. Depois repete o que você fez na rodada anterior."},
  {name:"pessoa B",reveal:"confia",description:"Divide quase sempre. Só fecha a mão depois de ser passada para trás duas vezes seguidas."},
  {name:"pessoa C",reveal:"desconfiada",description:"Começa guardando. Só passa a dividir depois de ver você dividir duas vezes."}
];

function opponentMove(index:number,history:Round[]):Move{
  if(index===0)return history.length===0?"share":history[history.length-1].you;
  if(index===1){
    if(history.length>=2&&history[history.length-1].you==="keep"&&history[history.length-2].you==="keep")return "keep";
    return "share";
  }
  const shares=history.filter(r=>r.you==="share").length;
  return shares>=2?"share":"keep";
}
function gains(you:Move,them:Move){
  if(you==="share"&&them==="share")return [3,3];
  if(you==="keep"&&them==="share")return [5,0];
  if(you==="share"&&them==="keep")return [0,5];
  return [1,1];
}

export function CooperationGame(){
  const [opponent,setOpponent]=useState(0);
  const [history,setHistory]=useState<Round[]>([]);
  const [totals,setTotals]=useState({you:0,them:0});
  const [complete,setComplete]=useState<{you:number;them:number;opponent:number}[]>([]);
  const round=history.length;
  const finished=round>=5;
  const lastRound=history[history.length-1]??null;

  const choose=(move:Move)=>{
    if(finished)return;
    const them=opponentMove(opponent,history);
    const [youGain,themGain]=gains(move,them);
    const next={you:move,them,youGain,themGain};
    setHistory(v=>[...v,next]);
    setTotals(v=>({you:v.you+youGain,them:v.them+themGain}));
  };

  const nextOpponent=()=>{
    const entry={you:totals.you,them:totals.them,opponent};
    setComplete(v=>[...v,entry]);
    if(opponent<2){
      setOpponent(v=>v+1);
      setHistory([]);
      setTotals({you:0,them:0});
    }
  };

  const restart=()=>{
    setOpponent(0);setHistory([]);setTotals({you:0,them:0});setComplete([]);
  };

  const allDone=complete.length===3;
  if(allDone){
    const yours=complete.reduce((n,r)=>n+r.you,0);
    const theirs=complete.reduce((n,r)=>n+r.them,0);
    return <div className="cooperate-lab">
      <section className="cooperate-finale">
        <span>15 escolhas depois</span>
        <h2>Não existe uma escolha boa fora de uma relação.</h2>
        <div className="final-score"><strong>{yours}</strong><small>suas fichas</small><i/><strong>{theirs}</strong><small>das outras pessoas</small></div>
        <div className="opponent-summary">{complete.map(item=><article key={item.opponent}><span>{opponents[item.opponent].name}</span><strong>{opponents[item.opponent].reveal}</strong><p>{opponents[item.opponent].description}</p></article>)}</div>
        <p>Guardar pode vencer uma rodada. Dividir pode construir uma sequência. O ambiente muda o valor da mesma decisão.</p>
        <button onClick={restart}>jogar de novo ↺</button>
      </section>
    </div>;
  }

  return <div className="cooperate-lab">
    <div className="instruction-banner"><span>regra</span><p>Vocês escolhem ao mesmo tempo. Se os dois dividem, ambos ganham. Se só um divide, o outro leva mais.</p></div>
    <section className="cooperate-card">
      <header>
        <div><span>{opponents[opponent].name} · rodada {Math.min(round+1,5)} de 5</span><h2>Dividir ou guardar?</h2></div>
        <div className="score-pair"><span>você <b>{totals.you}</b></span><span>outra pessoa <b>{totals.them}</b></span></div>
      </header>

      <div className="payoff-note">
        <span>os dois dividem <b>+3 / +3</b></span>
        <span>você guarda sozinho <b>+5 / 0</b></span>
        <span>os dois guardam <b>+1 / +1</b></span>
      </div>

      <div className="cooperate-scene">
        <div className="cooperate-person you">
          <div className="cooperate-head"><i/><b/></div>
          <div className="cooperate-body"/>
          <span>você</span>
          <em className={lastRound?lastRound.you:"waiting"}>{lastRound?(lastRound.you==="share"?"abriu a mão":"guardou"):"?"}</em>
        </div>
        <div className="cooperate-table">
          <div className="token-pile">{Array.from({length:6}).map((_,i)=><i key={i}/>)}</div>
          <span>fichas em jogo</span>
        </div>
        <div className={"cooperate-person other opponent-"+opponent}>
          <div className="cooperate-head"><i/><b/></div>
          <div className="cooperate-body"/>
          <span>{opponents[opponent].name}</span>
          <em className={lastRound?lastRound.them:"waiting"}>{lastRound?(lastRound.them==="share"?"abriu a mão":"guardou"):"?"}</em>
        </div>
      </div>

      <div className="round-track">
        {Array.from({length:5}).map((_,i)=>{
          const r=history[i];
          return <div key={i} className={r?"played":""}>
            <span>{i+1}</span>
            {r&&<><strong>{r.you==="share"?"dividiu":"guardou"}</strong><small>{r.them==="share"?"ela dividiu":"ela guardou"}</small></>}
          </div>;
        })}
      </div>

      {!finished?<div className="cooperate-actions">
        <button className="share" onClick={()=>choose("share")}><span>abrir a mão</span><strong>dividir</strong></button>
        <button className="keep" onClick={()=>choose("keep")}><span>proteger suas fichas</span><strong>guardar</strong></button>
      </div>:<div className="opponent-reveal">
        <span>o padrão apareceu</span>
        <h3>{opponents[opponent].reveal}</h3>
        <p>{opponents[opponent].description}</p>
        <button onClick={nextOpponent}>{opponent<2?"conhecer próxima pessoa →":"ver o que aconteceu →"}</button>
      </div>}
    </section>
  </div>;
}

type Criterion="sum"|"worst"|"reach";
type MapPoint={x:number;y:number};
const residents:MapPoint[]=[
  {x:115,y:105},{x:220,y:80},{x:285,y:180},{x:150,y:275},{x:325,y:325},
  {x:420,y:135},{x:465,y:250},{x:560,y:365},{x:735,y:105},{x:810,y:330}
];
const dist=(a:MapPoint,b:MapPoint)=>Math.hypot(a.x-b.x,a.y-b.y);
function centerMetrics(p:MapPoint){
  const values=residents.map(r=>dist(p,r));
  return {sum:values.reduce((a,b)=>a+b,0),worst:Math.max(...values),reach:values.filter(v=>v<=185).length};
}
function bestFor(c:Criterion){
  let best={x:450,y:250},score=Infinity;
  for(let x=50;x<=850;x+=10)for(let y=50;y<=450;y+=10){
    const m=centerMetrics({x,y});
    const s=c==="sum"?m.sum:c==="worst"?m.worst:(-m.reach*100000)+m.sum;
    if(s<score){score=s;best={x,y}}
  }
  return best;
}
const centerCopy:Record<Criterion,{label:string;line:string}> = {
  sum:{label:"menos passos no total",line:"A maioria pesa bastante. Uma casa distante pode continuar distante."},
  worst:{label:"ninguém tão longe",line:"O ponto anda para proteger quem faria a pior caminhada."},
  reach:{label:"mais casas em 3 min",line:"Cobrir muita gente perto pode abandonar quem vive fora do aglomerado."}
};

export function WhereIsCenter(){
  const svgRef=useRef<SVGSVGElement>(null);
  const [point,setPoint]=useState<MapPoint>({x:440,y:245});
  const [placed,setPlaced]=useState(false);
  const [dragging,setDragging]=useState(false);
  const [criterion,setCriterion]=useState<Criterion>("sum");
  const [revealed,setRevealed]=useState(false);
  const best=useMemo(()=>bestFor(criterion),[criterion]);

  const place=(e:ReactPointerEvent<SVGSVGElement>)=>{
    const rect=svgRef.current?.getBoundingClientRect();
    if(!rect)return;
    setPoint({
      x:Math.max(30,Math.min(870,(e.clientX-rect.left)/rect.width*900)),
      y:Math.max(30,Math.min(470,(e.clientY-rect.top)/rect.height*500))
    });
    setPlaced(true);setRevealed(false);
  };
  const chosen=placed?point:{x:440,y:245};
  const linesTo=revealed?best:chosen;

  return <div className="center-lab">
    <div className="instruction-banner"><span>situação</span><p>Este bairro ganhou um único bebedouro. Coloque onde parece mais justo.</p></div>
    <section className="center-card">
      <header className="center-head"><div><span>10 casas · 1 bebedouro</span><h2>Onde você colocaria?</h2></div><div className="center-tag">{centerCopy[criterion].label}</div></header>

      <div className="center-map-wrap">
        <svg ref={svgRef} className="center-map" viewBox="0 0 900 500"
          onPointerDown={e=>{setDragging(true);e.currentTarget.setPointerCapture(e.pointerId);place(e)}}
          onPointerMove={e=>{if(dragging)place(e)}} onPointerUp={()=>setDragging(false)} onPointerCancel={()=>setDragging(false)}
          role="img" aria-label="Mapa com dez casas onde você pode posicionar um bebedouro">
          <path className="center-street" d="M30 382c130-89 249-74 368-159 122-88 244-87 469-39M90 48c111 70 183 174 286 218 126 54 282 50 449 173"/>
          {placed&&<g className="walk-lines">{residents.map((r,i)=><line key={i} x1={r.x} y1={r.y} x2={linesTo.x} y2={linesTo.y}/>)}</g>}
          {residents.map((r,i)=><g className="resident" key={i} transform={"translate("+r.x+" "+r.y+")"}><circle r="13"/><path d="M-18 20 0 4l18 16v17h-36Z"/></g>)}
          {placed&&<g className="fountain your-fountain" transform={"translate("+point.x+" "+point.y+")"}><circle r="20"/><path d="M-8 7h16M0-10v17"/><text y="-31">você</text></g>}
          {revealed&&<g className="fountain best-fountain" transform={"translate("+best.x+" "+best.y+")"}><circle r="25"/><circle r="9"/><text y="-35">pela regra</text></g>}
        </svg>
        {!placed&&<div className="center-overlay">clique em qualquer lugar do mapa</div>}
      </div>

      <div className="center-criteria">
        <span>depois escolha o que “justo” quer dizer</span>
        <div>{(Object.keys(centerCopy) as Criterion[]).map(c=><button key={c} className={criterion===c?"active":""} onClick={()=>{setCriterion(c);setRevealed(false)}}>{centerCopy[c].label}</button>)}</div>
      </div>

      <div className="center-actions">
        <div><span>sua posição</span><strong>{placed?Math.round(centerMetrics(point).worst)+" passos até a casa mais distante":"ainda não escolhida"}</strong></div>
        <button onClick={()=>setRevealed(true)} disabled={!placed}>comparar com a regra →</button>
      </div>

      {revealed&&<div className="center-result"><p>{centerCopy[criterion].line}</p><strong>O bairro não mudou. Só mudou a definição de melhor.</strong></div>}
    </section>
    <p className="center-thought">Todo centro responde a uma pergunta. Antes de encontrar o ponto, alguém precisa decidir quem e o que conta.</p>
  </div>;
}
