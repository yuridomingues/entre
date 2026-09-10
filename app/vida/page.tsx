import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { LifeWeeks } from "@/components/life-weeks";
export const metadata: Metadata = { title: "Quanto cabe em uma vida?", description: "Uma visualização interativa para tornar semanas, anos e escolhas menos abstratos." };
export default function Page(){return <ExperimentShell number="05" eyebrow="tempo + filosofia" title="Quanto cabe em uma vida?" intro="Anos são unidades grandes demais para caber na intuição. Aqui, cada ponto é uma semana — não como contagem regressiva, mas como uma forma de enxergar escala."><LifeWeeks/></ExperimentShell>}
