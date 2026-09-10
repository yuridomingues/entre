"use client";
import { useState } from "react";
const levels=[
 {m:"0 m",name:"contato",q:["calor hoje, né?","como foi seu dia?"],idea:"Small talk não é conversa 'vazia': ele pode sinalizar disponibilidade, segurança e pertencimento."},
 {m:"20 m",name:"preferências",q:["que música você tem ouvido?","qual lugar você sempre gostaria de voltar?"],idea:"Gostos são atalhos para histórias. Uma pergunta concreta costuma ser mais fácil de responder do que uma pergunta enorme."},
 {m:"100 m",name:"histórias",q:["qual coisa você aprendeu tarde?","qual memória pequena ainda aparece do nada?"],idea:"Narrativas organizam experiência: escolhem começo, detalhe, causa e significado. Contar já é interpretar."},
 {m:"300 m",name:"valores",q:["o que faz alguém ser uma boa pessoa?","o que você não gostaria de perder em si?"],idea:"Quando falamos de valores, deixamos de trocar apenas fatos e começamos a revelar critérios usados para interpretar o mundo."},
 {m:"600 m",name:"sentido",q:["o que faz um dia valer a pena?","que pergunta você gostaria de saber responder melhor?"],idea:"Profundidade não exige confissão. Pode existir numa pergunta honesta, numa pausa e na disposição de escutar sem transformar tudo em conselho."}
];
export function ConversationDive(){const [level,setLevel]=useState(0),[chosen,setChosen]=useState<string[]>([]);const pick=(q:string)=>{setChosen(v=>[...v,q]);setTimeout(()=>setLevel(l=>Math.min(levels.length-1,l+1)),220)};return <div className="conversation-dive">
 <div className="depth-meter" aria-label={`Profundidade ${levels[level].m}`}><span style={{height:`${(level+1)/levels.length*100}%`}}/><b>{levels[level].m}</b></div>
 <section className="conversation-stage"><p className="overline">{levels[level].name}</p><h2>O que você perguntaria?</h2><div className="question-pair">{levels[level].q.map(q=><button key={q} onClick={()=>pick(q)}>“{q}”</button>)}</div><p className="concept-card">{levels[level].idea}</p>{level<levels.length-1?<small>Escolha uma pergunta para descer.</small>:<div className="conversation-ending"><strong>Você chegou ao fundo?</strong><p>Não existe fundo. Pessoas mudam, relações mudam e a mesma pergunta pode ser superficial hoje e importante daqui a anos.</p></div>}</section>
 <aside className="conversation-log"><span>sua trilha</span>{chosen.length===0?<p>nenhuma pergunta escolhida ainda</p>:chosen.map((q,i)=><p key={i}>{i+1}. {q}</p>)}</aside>
 </div>}
