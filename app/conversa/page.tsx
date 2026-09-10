import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { ConversationDive } from "@/components/conversation-dive";
export const metadata: Metadata = { title: "A história de uma conversa", description: "Uma descida interativa pelas camadas de uma conversa humana." };
export default function Page(){return <ExperimentShell number="04" eyebrow="linguagem + psicologia" title="A história de uma conversa" intro="Conversas não têm profundidade fixa. Elas mudam conforme contexto, confiança, escuta e o risco que cada pessoa aceita correr ao revelar algo de si."><ConversationDive/></ExperimentShell>}
