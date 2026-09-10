"use client";
import { useState } from "react";

type Door={label:string;question:string;next:string};
type Node={reply:string;doors:Door[];ending?:string};

const nodes:Record<string,Node>={
  start:{
    reply:"Foi corrido, mas no almoço encontrei uma música que eu não ouvia há anos.",
    doors:[
      {label:"corrido",question:"Corrido como?",next:"rush"},
      {label:"música",question:"Que música?",next:"music"},
      {label:"anos",question:"Há quanto tempo?",next:"years"}
    ]
  },
  rush:{
    reply:"Tive três coisas para resolver ao mesmo tempo. O curioso é que quase não lembro da manhã.",
    doors:[
      {label:"três coisas",question:"O que estava acontecendo?",next:"tasks"},
      {label:"não lembro",question:"Como assim, não lembra?",next:"attention"}
    ]
  },
  music:{
    reply:"Era uma música que tocava muito em casa quando eu era pequeno. Bastou o começo para a sala antiga aparecer na cabeça.",
    doors:[
      {label:"em casa",question:"Você lembra da casa?",next:"home"},
      {label:"aparecer",question:"Veio tudo de uma vez?",next:"memory"}
    ]
  },
  years:{
    reply:"Nem sei quantos. É estranho como algumas coisas somem por muito tempo e voltam com um detalhe só.",
    doors:[
      {label:"somem",question:"O que faz uma coisa sumir?",next:"memory"},
      {label:"detalhe",question:"Qual detalhe voltou primeiro?",next:"detail"}
    ]
  },
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
  const node=nodes[nodeId];

  const follow=(door:Door)=>{
    const next=nodes[door.next];
    setTurns(items=>[...items,{question:door.question,reply:next.reply,label:door.label}]);
    setNodeId(door.next);
  };
  const reset=()=>{setTurns([]);setNodeId("start")};

  return <div className="conversation-game">
    <div className="conversation-rule">
      <span>uma regra</span>
      <p>Você não responde nada. Só escolhe qual detalhe da fala seguir.</p>
    </div>

    <div className="chat-stage">
      <div className="chat-thread">
        <div className="bubble you">Como foi seu dia?</div>
        <div className="bubble other">{nodes.start.reply}</div>

        {turns.map((turn,i)=><div className="chat-turn" key={i}>
          <div className="bubble you">{turn.question}</div>
          <div className="bubble other">{turn.reply}</div>
        </div>)}
      </div>

      {node.doors.length>0?<div className="conversation-doors">
        <small>qual porta você abre?</small>
        <div>{node.doors.map(door=><button key={door.label} onClick={()=>follow(door)}>{door.label}<span>→</span></button>)}</div>
      </div>:<div className="conversation-result">
        <span>{turns.map(turn=>turn.label).join(" → ")}</span>
        <h2>{node.ending}</h2>
        <p>A primeira frase era a mesma. A conversa mudou porque você escolheu o que merecia atenção.</p>
        <button onClick={reset}>tentar outro caminho ↺</button>
      </div>}
    </div>

    <div className="conversation-map" aria-label="Caminho escolhido">
      <strong>como foi seu dia?</strong>
      {turns.map((turn,i)=><span key={i}>→ {turn.label}</span>)}
    </div>
  </div>
}
