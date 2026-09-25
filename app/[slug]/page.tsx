import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { MindLab, MusicLab, ConversationDive, LifeWeeks, RandomWalk, NightSky } from "@/components/interactive-experiences";
import { TreeExperience } from "@/components/tree-experience";
import { ScaleExplorer } from "@/components/scale-visual-experience";
import { CooperationGame } from "@/components/social-experiences";
import { AttentionTest } from "@/components/mind-experiments";
import { SmallChange } from "@/components/chaos-experience";
import { BetterQuestion } from "@/components/collection-experiments-a";
import { RuleLab } from "@/components/collection-experiments-b";
import { InnerTime, StroopLab } from "@/components/collection-experiments-c";
import { RefinedIdeaSpread, RefinedMemory, RefinedHumanRandom } from "@/components/refined-experiments";
import { getExperiment, publicSlugs } from "@/lib/experiments";

const intros: Record<string,string> = {
  arvore:"Uma mesma árvore. 526 anos. Role.",
  mente:"Três imagens. Responda antes de revelar.",
  musica:"Ouça tudo. Depois tire uma camada.",
  conversa:"Uma frase. Você escolhe o detalhe que a conversa segue.",
  vida:"Troque anos por semanas e veja o tempo mudar de forma.",
  escala:"Role. Cada coisa fica no tamanho certo em relação à anterior, da pulga até Saturno.",
  acaso:"Todos começam juntos. Depois, cada ponto escolhe um lado várias vezes.",
  noite:"A cidade está acesa. Apague-a devagar.",
  rede:"Escolha onde começa. Veja a rede acender. Depois corte a ponte e compare.",
  cooperar:"A mesma escolha vai encontrar três pessoas que respondem de jeitos diferentes.",
  memoria:"Olhe por cinco segundos. Depois coloque os mesmos objetos de volta sem ver a cena.",
  mudanca:"Dois sistemas seguem a mesma regra. Você muda só o começo.",
  atencao:"Conte apenas os círculos azuis. Não tente prestar atenção em tudo.",
  aleatorio:"Vinte e quatro escolhas rápidas. Tente fazer uma sequência que pareça acaso.",
  perguntas:"Uma criatura foi escolhida. Não chute. Faça perguntas que cortem possibilidades.",
  regra:"2, 4, 6 serve. Descubra a regra testando exemplos que talvez deem errado.",
  minuto:"O relógio some. Fica só a sensação de que já passou tempo suficiente.",
  stroop:"Ignore o que está escrito e responda apenas à cor."
};

const components: Record<string, React.ReactNode> = {
  arvore:<TreeExperience/>,
  mente:<MindLab/>,
  musica:<MusicLab/>,
  conversa:<ConversationDive/>,
  vida:<LifeWeeks/>,
  escala:<ScaleExplorer/>,
  acaso:<RandomWalk/>,
  noite:<NightSky/>,
  rede:<RefinedIdeaSpread/>,
  cooperar:<CooperationGame/>,
  memoria:<RefinedMemory/>,
  mudanca:<SmallChange/>,
  atencao:<AttentionTest/>,
  aleatorio:<RefinedHumanRandom/>,
  perguntas:<BetterQuestion/>,
  regra:<RuleLab/>,
  minuto:<InnerTime/>,
  stroop:<StroopLab/>
};

export function generateStaticParams(){return publicSlugs.map(slug=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const exp=getExperiment(slug);
  if(!exp||!publicSlugs.includes(slug))return {};
  return {title:exp.title,description:exp.description};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const exp=getExperiment(slug);
  if(!exp||!publicSlugs.includes(slug))notFound();
  return <ExperimentShell slug={slug} title={exp.title} intro={intros[slug]}>{components[slug]}</ExperimentShell>;
}
