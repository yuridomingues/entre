import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { TreeTimeline } from "@/components/tree-timeline";
export const metadata: Metadata = { title: "A árvore que viu tudo", description: "Uma viagem interativa por 526 anos de história na escala do tempo de uma árvore." };
export default function Page(){return <ExperimentShell number="01" eyebrow="natureza + tempo" title="A árvore que viu tudo" intro="Imagine uma árvore que germinou em 1500 e continuou ali. Desça devagar: enquanto o nosso mundo corre, o tempo vegetal tem outro ritmo."><TreeTimeline/></ExperimentShell>}
