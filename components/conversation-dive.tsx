"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMotionTimers, useReducedMotion } from "@/lib/use-motion";

type Door = { label: string; question: string; next: string };
type Node = { reply: string; doors: Door[]; ending?: string };

const nodes: Record<string, Node> = {
  start: {
    reply: "Foi corrido, mas no almoço encontrei uma música que eu não ouvia há anos.",
    doors: [
      { label: "corrido", question: "Corrido como?", next: "rush" },
      { label: "música", question: "Que música?", next: "music" },
      { label: "anos", question: "Há quanto tempo?", next: "years" },
    ],
  },
  rush: {
    reply: "Tive três coisas para resolver ao mesmo tempo. O curioso é que quase não lembro da manhã.",
    doors: [
      { label: "três coisas", question: "O que estava acontecendo?", next: "tasks" },
      { label: "não lembro", question: "Como assim, não lembra?", next: "attention" },
    ],
  },
  music: {
    reply: "Era uma música que tocava muito em casa quando eu era pequeno. Bastou o começo para a sala antiga aparecer na cabeça.",
    doors: [
      { label: "em casa", question: "Você lembra da casa?", next: "home" },
      { label: "aparecer", question: "Veio tudo de uma vez?", next: "memory" },
    ],
  },
  years: {
    reply: "Nem sei quantos. É estranho como algumas coisas somem por muito tempo e voltam com um detalhe só.",
    doors: [
      { label: "somem", question: "O que faz uma coisa sumir?", next: "memory" },
      { label: "detalhe", question: "Qual detalhe voltou primeiro?", next: "detail" },
    ],
  },
  tasks: {
    reply: "Nada dramático. Mensagem, prazo, ligação. Quando tudo compete ao mesmo tempo, o dia vira uma lista.",
    doors: [],
    ending: "Uma palavra levou a conversa para rotina e atenção.",
  },
  attention: {
    reply: "Lembro de pedaços, não da sequência. Parece que a manhã aconteceu sem eu estar olhando direito para ela.",
    doors: [],
    ending: "Uma palavra levou a conversa para memória e presença.",
  },
  home: {
    reply: "Lembro da luz da janela e de uma mesa que nem existe mais. A música puxou o resto.",
    doors: [],
    ending: "Uma palavra levou a conversa para lugares e lembranças.",
  },
  memory: {
    reply: "Primeiro veio uma sensação. Depois apareceram cenas. A ordem parece ter sido inventada depois.",
    doors: [],
    ending: "Uma palavra levou a conversa para o jeito como lembramos.",
  },
  detail: {
    reply: "O barulho do começo da música. Engraçado que o som veio antes da imagem.",
    doors: [],
    ending: "Uma palavra levou a conversa para um detalhe quase esquecido.",
  },
};

type Turn = { id: string; question: string; reply: string; label: string };
type PendingPhase = "sending" | "typing" | "reply";
type Pending = { question: string; reply: string; label: string; nextId: string; phase: PendingPhase };

function typingMs(text: string, reduced: boolean) {
  if (reduced) return 0;
  return Math.min(2400, 520 + text.length * 32);
}

function TypingDots() {
  return (
    <span className="typing-dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function ConversationDive() {
  const reduced = useReducedMotion();
  const { schedule, clear: clearTimers } = useMotionTimers();
  const uid = useId();
  const turnSeq = useRef(0);
  const threadRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [nodeId, setNodeId] = useState("start");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState<Pending | null>(null);
  const [busy, setBusy] = useState(false);
  const [mapPulse, setMapPulse] = useState(-1);
  const [introReady, setIntroReady] = useState(reduced);

  const node = nodes[nodeId];

  useEffect(() => {
    if (reduced) {
      setIntroReady(true);
      return;
    }
    const id = setTimeout(() => setIntroReady(true), 80);
    return () => clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  }, [turns.length, pending?.phase, nodeId, reduced]);

  const finishPending = useCallback((item: Pending) => {
    turnSeq.current += 1;
    const id = `${uid}-t${turnSeq.current}`;
    setTurns((items) => {
      const next = [...items, { id, question: item.question, reply: item.reply, label: item.label }];
      setMapPulse(next.length - 1);
      return next;
    });
    setNodeId(item.nextId);
    setPending(null);
    setBusy(false);
  }, [uid]);

  const follow = (door: Door) => {
    if (busy) return;
    const next = nodes[door.next];
    clearTimers();
    setBusy(true);
    setMapPulse(-1);

    const base: Pending = {
      question: door.question,
      reply: next.reply,
      label: door.label,
      nextId: door.next,
      phase: "sending",
    };

    if (reduced) {
      finishPending(base);
      return;
    }

    setPending(base);

    schedule(() => setPending((p) => (p ? { ...p, phase: "typing" } : p)), 380);

    schedule(() => setPending((p) => (p ? { ...p, phase: "reply" } : p)), 380 + typingMs(next.reply, false));

    schedule(() => finishPending(base), 380 + typingMs(next.reply, false) + 420);
  };

  const reset = () => {
    clearTimers();
    setTurns([]);
    setNodeId("start");
    setPending(null);
    setBusy(false);
    setMapPulse(-1);
    setIntroReady(reduced);
    if (!reduced) {
      schedule(() => setIntroReady(true), 80);
    }
  };

  const doorsOpen = !busy && node.doors.length > 0;
  const showResult = !busy && node.doors.length === 0 && turns.length > 0;

  return (
    <div className="conversation-game">
      <div className="conversation-rule">
        <span>uma regra</span>
        <p>Você não responde nada. Só escolhe qual detalhe da fala seguir.</p>
      </div>

      <div className="chat-stage" ref={threadRef}>
        <div className={`chat-thread${introReady ? " is-ready" : ""}`}>
          <div className="bubble you seed">Como foi seu dia?</div>
          <div className="bubble other seed">{nodes.start.reply}</div>

          {turns.map((turn) => (
            <div className="chat-turn is-settled" key={turn.id}>
              <div className="bubble you">{turn.question}</div>
              <div className="bubble other">{turn.reply}</div>
            </div>
          ))}

          {pending && (
            <div className="chat-turn is-live">
              <div
                className={
                  "bubble you" +
                  (pending.phase === "sending" ? " is-sending" : " is-sent")
                }
              >
                {pending.question}
              </div>
              {pending.phase === "typing" && (
                <div className="bubble other is-typing" aria-label="digitando">
                  <TypingDots />
                </div>
              )}
              {pending.phase === "reply" && (
                <div className="bubble other is-incoming">{pending.reply}</div>
              )}
            </div>
          )}

          <div className="chat-thread-end" ref={endRef} aria-hidden="true" />
        </div>

        {doorsOpen && (
          <div className={`conversation-doors${doorsOpen ? " is-visible" : ""}`} key={nodeId}>
            <small>qual porta você abre?</small>
            <div>
              {node.doors.map((door, i) => (
                <button
                  key={door.label}
                  type="button"
                  style={{ animationDelay: `${0.04 + i * 0.07}s` }}
                  onClick={() => follow(door)}
                >
                  {door.label}
                  <span>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && (
          <div className="conversation-result is-visible">
            <span>{turns.map((turn) => turn.label).join(" → ")}</span>
            <h2>{node.ending}</h2>
            <p>
              A primeira frase era a mesma. A conversa mudou porque você escolheu o que merecia
              atenção.
            </p>
            <button type="button" onClick={reset}>
              tentar outro caminho ↺
            </button>
          </div>
        )}
      </div>

      <div className="conversation-map" aria-label="Caminho escolhido">
        <strong>como foi seu dia?</strong>
        {turns.map((turn, i) => (
          <span key={turn.id} className={i === mapPulse ? "is-new" : undefined}>
            → {turn.label}
          </span>
        ))}
      </div>
    </div>
  );
}
