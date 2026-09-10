import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { MusicLab } from "@/components/music-lab";
export const metadata: Metadata = { title: "Anatomia de uma música", description: "Um laboratório sonoro para ouvir frequência, harmonia, ritmo e timbre." };
export default function Page(){return <ExperimentShell number="03" eyebrow="música + física" title="Anatomia de uma música" intro="Som é movimento do ar. Música é o que fazemos com esse movimento. Ligue o áudio e desmonte uma pequena composição gerada no próprio navegador."><MusicLab/></ExperimentShell>}
