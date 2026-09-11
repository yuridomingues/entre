"use client";
import { useMemo, useState } from "react";

/* 21. Simpson */
export function Simpson(){
  const [mix,setMix]=useState(15);
  const [picked,setPicked]=useState<string|null>(null);
  const easyA=100-mix, hardA=mix, easyB=mix, hardB=100-mix;
  const aEasy=.80,aHard=.40,bEasy=.90,bHard=.50;
  const aTotal=(easyA*aEasy+hardA*aHard);
  const bTotal=(easyB*bEasy+hardB*bHard);
  const pct=(v:number)=>Math.round(v);
  return <div className="simpson-lab lab-shell">
    <div className="instruction-banner"><span>duas estufas</span><p>A e B recebem plantas fáceis e difíceis em proporções diferentes. Primeiro olhe apenas o total.</p></div>
    <section className="lab-card tone-card-mint">
      <header className="lab-head"><div><span>média agregada</span><h2>Qual parece melhor?</h2></div><strong>A {pct(aTotal)}% · B {pct(bTotal)}%</strong></header>
      <div className="simpson-total"><button className={picked==="A"?"active":""} onClick={()=>setPicked("A")}><span>A</span><i style={{height:pct(aTotal)+"%"}}/><strong>{pct(aTotal)}%</strong></button><button className={picked==="B"?"active":""} onClick={()=>setPicked("B")}><span>B</span><i style={{height:pct(bTotal)+"%"}}/><strong>{pct(bTotal)}%</strong></button></div>
      {picked&&<div className="simpson-split">
        <div className="mix-control"><span>mistura dos casos</span><input type="range" min="5" max="95" value={mix} onChange={e=>setMix(Number(e.target.value))}/><small>A recebe {easyA}% fáceis · B recebe {easyB}% fáceis</small></div>
        <div className="split-table">
          <article><span>casos fáceis</span><strong>A 80%</strong><strong>B 90%</strong></article>
          <article><span>casos difíceis</span><strong>A 40%</strong><strong>B 50%</strong></article>
        </div>
        <p>B é melhor dentro dos dois tipos de caso. Mesmo assim, o total pode fazer A parecer melhor quando A recebe muito mais casos fáceis.</p>
      </div>}
    </section>
    <p className="lab-thought">Uma média não mente sozinha. Às vezes ela só responde a uma pergunta diferente da que você achou que estava fazendo.</p>
  </div>;
}

/* 22. Monty sem aposta */
type DoorState={chosen:number|null;opened:number|null;target:number;resolved:boolean;switched:boolean|null;won:boolean|null};
function newDoorState(seed:number):DoorState{return{chosen:null,opened:null,target:(seed*7+2)%3,resolved:false,switched:null,won:null}}
export function ThreeDoors(){
  const [round,setRound]=useState(0);
  const [state,setState]=useState<DoorState>(()=>newDoorState(0));
  const [stats,setStats]=useState({stay:[0,0],switch:[0,0]});
  const choose=(d:number)=>{
    if(state.chosen!==null)return;
    const candidates=[0,1,2].filter(x=>x!==d&&x!==state.target);
    const opened=candidates[0];
    setState({...state,chosen:d,opened});
  };
  const finish=(doSwitch:boolean)=>{
    if(state.chosen===null||state.opened===null||state.resolved)return;
    const final=doSwitch?[0,1,2].find(x=>x!==state.chosen&&x!==state.opened)!:state.chosen;
    const won=final===state.target;
    const key=doSwitch?"switch":"stay";
    setStats(s=>({...s,[key]:[s[key][0]+(won?1:0),s[key][1]+1]}));
    setState({...state,resolved:true,switched:doSwitch,won});
  };
  const next=()=>{const r=round+1;setRound(r);setState(newDoorState(r))};
  const sim=useMemo(()=>{
    let stay=0,sw=0;
    for(let i=0;i<600;i++){
      const target=(i*37+11)%3,first=(i*19+1)%3;
      if(first===target)stay++;else sw++;
    }
    return {stay,sw};
  },[]);
  return <div className="doors-lab lab-shell">
    <div className="instruction-banner"><span>três portas</span><p>Uma esconde o símbolo. Você escolhe uma. Depois uma porta vazia é aberta de propósito.</p></div>
    <section className="lab-card tone-card-gold">
      <header className="lab-head"><div><span>probabilidade condicional</span><h2>Fica ou troca?</h2></div><strong>rodada {round+1}</strong></header>
      <div className="door-row">{[0,1,2].map(d=><button key={d} className={(state.chosen===d?"chosen ":"")+(state.opened===d?"opened ":"")+(state.resolved&&state.target===d?"target":"")} onClick={()=>choose(d)} disabled={state.chosen!==null}><span>porta {d+1}</span><i>{state.opened===d?"vazia":state.resolved&&state.target===d?"★":"?"}</i></button>)}</div>
      {state.chosen!==null&&!state.resolved&&<div className="door-choice"><p>Uma porta vazia foi removida. Sua primeira escolha ainda carrega a chance que tinha no começo.</p><button onClick={()=>finish(false)}>ficar</button><button onClick={()=>finish(true)}>trocar</button></div>}
      {state.resolved&&<div className="door-result"><strong>{state.won?"encontrou":"não foi dessa vez"}</strong><p>{state.switched?"você trocou":"você ficou"}.</p><button onClick={next}>outra rodada →</button></div>}
      {(stats.stay[1]+stats.switch[1])>=3&&<div className="door-sim"><span>para sair da sorte de poucas rodadas</span><div><strong>600 situações</strong><p>ficar acertaria {sim.stay} · trocar acertaria {sim.sw}</p></div></div>}
    </section>
    <p className="lab-thought">Receber uma informação nova pode mudar o valor de uma escolha antiga sem mudar o que estava escondido desde o começo.</p>
  </div>;
}

/* 23. Condorcet */
const voters=[
  ["A","B","C"],["B","C","A"],["C","A","B"]
];
function pairWinner(a:string,b:string){
  let aa=0,bb=0;
  voters.forEach(v=>{if(v.indexOf(a)<v.indexOf(b))aa++;else bb++});
  return aa>bb?a:b;
}
export function MajorityCycle(){
  const pairs:[string,string][]=[["A","B"],["B","C"],["C","A"]];
  const [done,setDone]=useState<number[]>([]);
  const all=done.length===3;
  return <div className="vote-lab lab-shell">
    <div className="instruction-banner"><span>três grupos</span><p>Cada grupo tem uma ordem de preferência coerente. Faça eleições de dois candidatos por vez.</p></div>
    <section className="lab-card tone-card-coral">
      <header className="lab-head"><div><span>maioria</span><h2>Quem é o favorito?</h2></div><strong>{done.length}/3 eleições</strong></header>
      <div className="voter-preferences">{voters.map((v,i)=><article key={i}><span>grupo {i+1}</span><strong>{v.join(" > ")}</strong></article>)}</div>
      <div className="pair-votes">{pairs.map(([a,b],i)=>{const winner=pairWinner(a,b);return <button key={i} className={done.includes(i)?"done":""} onClick={()=>setDone(d=>d.includes(i)?d:[...d,i])}><span>{a} × {b}</span>{done.includes(i)&&<strong>{winner} vence</strong>}</button>})}</div>
      {all&&<div className="cycle-result"><div><b>A</b><i>vence</i><b>B</b><i>vence</i><b>C</b><i>vence</i><b>A</b></div><p>Cada pessoa pode ter preferências consistentes e, ainda assim, a preferência do grupo formar um ciclo.</p></div>}
    </section>
    <p className="lab-thought">“A maioria quer” parece uma frase simples até perguntarmos maioria entre quais alternativas.</p>
  </div>;
}

/* 24. 2-4-6 */
type Trial={nums:[number,number,number];fits:boolean};
const isRule=(n:[number,number,number])=>n[0]<n[1]&&n[1]<n[2];
export function RuleLab(){
  const [nums,setNums]=useState<[number,number,number]>([2,4,6]);
  const [trials,setTrials]=useState<Trial[]>([]);
  const [guess,setGuess]=useState<string|null>(null);
  const test=()=>{if(trials.length<6)setTrials(t=>[...t,{nums:[...nums] as [number,number,number],fits:isRule(nums)}])};
  const options=["números pares aumentando de 2 em 2","três números em ordem crescente","três números pares","o terceiro é a soma dos dois primeiros"];
  const reset=()=>{setNums([2,4,6]);setTrials([]);setGuess(null)};
  const set=(i:number,v:number)=>setNums(n=>n.map((x,j)=>j===i?v:x) as [number,number,number]);
  return <div className="rule-lab lab-shell">
    <div className="instruction-banner"><span>regra escondida</span><p>2, 4, 6 obedece à regra. Teste outros trios para descobrir qual é.</p></div>
    <section className="lab-card tone-card-ice">
      <header className="lab-head"><div><span>hipóteses</span><h2>Que teste você faz?</h2></div><strong>{trials.length} testes</strong></header>
      <div className="number-test">{nums.map((v,i)=><input key={i} type="number" value={v} onChange={e=>set(i,Number(e.target.value))}/>) }<button onClick={test} disabled={trials.length>=6}>testar</button></div>
      <div className="trial-list">{trials.map((t,i)=><span key={i} className={t.fits?"yes":"no"}>{t.nums.join(", ")} · {t.fits?"serve":"não serve"}</span>)}</div>
      {trials.length>=2&&!guess&&<div className="rule-options">{options.map(o=><button key={o} onClick={()=>setGuess(o)}>{o}</button>)}</div>}
      {guess&&<div className="rule-result"><strong>{guess===options[1]?"essa é a regra.":"a regra era mais ampla."}</strong><p>Qualquer três números estritamente crescentes servem. Testes que só confirmam uma hipótese estreita podem deixar várias outras hipóteses vivas.</p><button onClick={reset}>nova tentativa ↺</button></div>}
    </section>
    <p className="lab-thought">Uma hipótese fica mais interessante quando tentamos quebrá-la, não quando só procuramos exemplos que combinam.</p>
  </div>;
}

/* 25. Viés de sobrevivência */
const damage=[
  [18,35],[24,48],[32,62],[40,42],[48,74],[56,54],[66,68],[73,33],[80,57],[88,46],
  [31,31],[47,29],[63,38],[75,73],[54,78],[26,70],[84,66]
];
export function Survivorship(){
  const [choice,setChoice]=useState<string|null>(null);
  const zones=["asas","centro","motores"];
  return <div className="survivor-lab lab-shell">
    <div className="instruction-banner"><span>só vemos quem voltou</span><p>Robôs de exploração retornaram de uma tempestade com estas marcas. Onde você reforçaria a próxima geração?</p></div>
    <section className="lab-card tone-card-sand">
      <header className="lab-head"><div><span>amostra incompleta</span><h2>Olhe para os buracos. E para onde não há buracos.</h2></div></header>
      <div className="robot-diagram">
        <svg viewBox="0 0 900 390" role="img" aria-label="Robô voador abstrato com marcas de dano">
          <path className="craft" d="M386 122h128l45 73 257 47-17 66-252-20-33 68H386l-33-68-252 20-17-66 257-47Z"/>
          <circle className="engine" cx="418" cy="238" r="34"/><circle className="engine" cx="482" cy="238" r="34"/>
          {damage.map(([x,y],i)=><circle key={i} className="damage" cx={x*9} cy={y*3.7} r="7"/>)}
        </svg>
      </div>
      <div className="survivor-options">{zones.map(z=><button key={z} className={choice===z?"active":""} onClick={()=>setChoice(z)}>{z}</button>)}</div>
      {choice&&<div className="survivor-result"><strong>{choice==="motores"?"você olhou para a ausência.":"as marcas chamam atenção, mas são marcas de quem conseguiu voltar."}</strong><p>Se danos nos motores impedem o retorno, quase nenhum robô com esse tipo de dano aparece nos dados. A amostra mostra sobreviventes, não todas as tentativas.</p></div>}
    </section>
    <p className="lab-thought">Às vezes os dados mais importantes são justamente os que não conseguiram chegar até a tabela.</p>
  </div>;
}
