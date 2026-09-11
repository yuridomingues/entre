import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { MindLab, MusicLab, ConversationDive, LifeWeeks, RandomWalk, NightSky } from "@/components/interactive-experiences";
import { TreeExperience } from "@/components/tree-experience";
import { ScaleExplorer } from "@/components/scale-visual-experience";
import { IdeaSpread, CooperationGame, WhereIsCenter } from "@/components/social-experiences";
import { MemoryRebuild, AttentionTest, EvidenceLab } from "@/components/mind-experiments";
import { SmallChange } from "@/components/chaos-experience";
import { HumanRandom, Theseus, BetterQuestion, ChangeBlindness, Sorites } from "@/components/collection-experiments-a";
import { Simpson, ThreeDoors, MajorityCycle, RuleLab, Survivorship } from "@/components/collection-experiments-b";
import { InnerTime, StroopLab, BirthdayRoom, ProjectionLab, EarthDepth } from "@/components/collection-experiments-c";
import { getExperiment, experiments } from "@/lib/experiments";

const intros: Record<string,string> = {
  arvore:"Uma mesma árvore. 526 anos. Role.",
  mente:"Três imagens. Responda antes de revelar.",
  musica:"Ouça tudo. Depois tire uma camada.",
  conversa:"Uma frase. Você escolhe o detalhe que a conversa segue.",
  vida:"Troque anos por semanas e veja o tempo mudar de forma.",
  escala:"Cada etapa coloca duas referências na mesma régua. Compare antes de olhar o número.",
  acaso:"Todos começam juntos. Depois, cada ponto escolhe um lado várias vezes.",
  noite:"A cidade está acesa. Apague-a devagar.",
  rede:"Escolha onde começa. Depois corte uma única ponte e rode de novo.",
  cooperar:"A mesma escolha vai encontrar três pessoas que respondem de jeitos diferentes.",
  memoria:"Olhe por cinco segundos. Depois tente montar a cena sem vê-la.",
  mudanca:"Dois sistemas seguem a mesma regra. Você muda só o começo.",
  centro:"Um bairro, dez casas e um único bebedouro. Escolha antes de calcular.",
  atencao:"Conte apenas os círculos azuis. Não tente prestar atenção em tudo.",
  evidencia:"Uma caixa foi escolhida em segredo. Puxe pistas e mova sua certeza.",
  aleatorio:"Trinta escolhas. Tente fazer uma sequência que pareça não ter sido feita por ninguém.",
  teseu:"Troque uma peça de cada vez e decida quando a continuidade deixa de bastar.",
  perguntas:"Uma criatura foi escolhida. Não chute. Faça perguntas que cortem possibilidades.",
  cegueira:"Duas cenas quase iguais. Um detalhe muda e uma pequena interrupção atrapalha a comparação.",
  monte:"Adicione grãos até uma palavra começar a parecer verdadeira. Depois faça o caminho de volta.",
  media:"Primeiro olhe o total. Depois abra os grupos que produziram aquele número.",
  portas:"Escolha antes. Receba uma informação que não é aleatória. Escolha de novo.",
  maioria:"Três grupos. Três favoritos. Faça as disputas duas a duas.",
  regra:"2, 4, 6 serve. Descubra a regra testando exemplos que talvez deem errado.",
  sobreviventes:"Os dados chegaram até você porque alguns robôs conseguiram voltar.",
  minuto:"O relógio some. Fica só a sensação de que já passou tempo suficiente.",
  stroop:"Ignore o que está escrito e responda apenas à cor.",
  aniversario:"Faça um palpite antes de ver quantos pares uma sala pequena consegue formar.",
  mapa:"Mova a mesma área para longe do equador e veja o mapa negociar com a esfera.",
  profundidade:"Role para baixo. A escala acelera porque a crosta é quase nada perto do raio inteiro."
};

const components: Record<string, React.ReactNode> = {
  arvore:<TreeExperience/>, mente:<MindLab/>, musica:<MusicLab/>, conversa:<ConversationDive/>, vida:<LifeWeeks/>,
  escala:<ScaleExplorer/>, acaso:<RandomWalk/>, noite:<NightSky/>, rede:<IdeaSpread/>, cooperar:<CooperationGame/>,
  memoria:<MemoryRebuild/>, mudanca:<SmallChange/>, centro:<WhereIsCenter/>, atencao:<AttentionTest/>, evidencia:<EvidenceLab/>,
  aleatorio:<HumanRandom/>, teseu:<Theseus/>, perguntas:<BetterQuestion/>, cegueira:<ChangeBlindness/>, monte:<Sorites/>,
  media:<Simpson/>, portas:<ThreeDoors/>, maioria:<MajorityCycle/>, regra:<RuleLab/>, sobreviventes:<Survivorship/>,
  minuto:<InnerTime/>, stroop:<StroopLab/>, aniversario:<BirthdayRoom/>, mapa:<ProjectionLab/>, profundidade:<EarthDepth/>
};

export function generateStaticParams(){return experiments.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const exp=getExperiment(slug); if(!exp)return {};
  return {title:exp.title,description:exp.description};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const exp=getExperiment(slug); if(!exp)notFound();
  return <ExperimentShell slug={slug} title={exp.title} intro={intros[slug]}>{components[slug]}</ExperimentShell>;
}
