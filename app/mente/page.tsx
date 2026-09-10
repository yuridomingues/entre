import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { MindLab } from "@/components/mind-lab";
export const metadata: Metadata = { title: "O mundo que seu cérebro inventa", description: "Pequenos experimentos interativos sobre atenção, percepção e memória." };
export default function Page(){return <ExperimentShell number="02" eyebrow="psicologia + percepção" title="O mundo que seu cérebro inventa" intro="Perceber não é copiar o mundo para dentro da cabeça. É selecionar, comparar e completar. Faça três testes simples antes de ler a explicação."><MindLab/></ExperimentShell>}
