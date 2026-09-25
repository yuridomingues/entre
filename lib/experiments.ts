export type ExperimentGroup = "flagship" | "collection" | "experiment";
export type ExperimentTone =
  | "moss" | "violet" | "sun" | "water" | "clay" | "lime" | "pink" | "night"
  | "mint" | "coral" | "lilac" | "ice" | "sand" | "gold" | "plum";

export type Experiment = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  question: string;
  duration: string;
  action: string;
  tone: ExperimentTone;
  group: ExperimentGroup;
};

export const experiments: Experiment[] = [
  { slug:"arvore", number:"01", eyebrow:"natureza + tempo", title:"A árvore que viu tudo", description:"Atravesse cinco séculos no tempo de uma árvore.", question:"O que acontece enquanto uma árvore cresce?", duration:"5 min", action:"rolagem", tone:"moss", group:"flagship" },
  { slug:"mente", number:"02", eyebrow:"percepção", title:"O mundo que seu cérebro inventa", description:"Três ilusões simples para desconfiar dos próprios olhos.", question:"Você vê o que está na tela?", duration:"3 min", action:"3 ilusões", tone:"violet", group:"collection" },
  { slug:"musica", number:"03", eyebrow:"música", title:"Anatomia de uma música", description:"Desmonte uma composição em pulso, baixo, harmonia, melodia e timbre.", question:"O que sobra quando tiramos uma camada?", duration:"4 min", action:"áudio", tone:"sun", group:"flagship" },
  { slug:"conversa", number:"04", eyebrow:"linguagem", title:"Por onde uma conversa vai?", description:"Uma frase, várias portas. Escolha o detalhe que você seguiria.", question:"Qual palavra muda o rumo de uma conversa?", duration:"3 min", action:"escolhas", tone:"water", group:"collection" },
  { slug:"vida", number:"05", eyebrow:"tempo", title:"Quanto cabe em uma vida?", description:"Troque anos por semanas para enxergar o tempo em outra escala.", question:"Que tipo de coisa merece virar tempo?", duration:"3 min", action:"visualização", tone:"clay", group:"flagship" },
  { slug:"escala", number:"06", eyebrow:"escala", title:"Do grão ao planeta", description:"Role e veja cada coisa no tamanho certo em relação à anterior.", question:"Quando uma coisa deixa de parecer grande?", duration:"3 min", action:"rolagem", tone:"lime", group:"collection" },
  { slug:"acaso", number:"07", eyebrow:"acaso", title:"Onde o acaso vai parar?", description:"Solte dezenas de pontos e deixe cada um escolher um lado várias vezes.", question:"Aleatório significa espalhado por igual?", duration:"2 min", action:"simulação", tone:"pink", group:"flagship" },
  { slug:"noite", number:"08", eyebrow:"céu", title:"Apague a cidade", description:"Diminua as luzes e veja o céu ganhar coisas que já estavam lá.", question:"Quantas estrelas a luz esconde?", duration:"2 min", action:"controle de luz", tone:"night", group:"collection" },

  { slug:"rede", number:"09", eyebrow:"sociedade + redes", title:"Como uma ideia se espalha?", description:"Escolha onde começa, veja a rede acender e compare o que muda quando uma ponte desaparece.", question:"Quanto do alcance pertence à ideia e quanto pertence aos caminhos?", duration:"3 min", action:"rede", tone:"mint", group:"experiment" },
  { slug:"cooperar", number:"10", eyebrow:"cooperação", title:"Quando cooperar deixa de valer a pena?", description:"Jogue contra três padrões diferentes e veja a mesma escolha mudar de valor.", question:"Existe uma estratégia boa em qualquer relação?", duration:"4 min", action:"decisões", tone:"coral", group:"experiment" },
  { slug:"memoria", number:"11", eyebrow:"memória", title:"Uma memória muda toda vez que você olha para ela", description:"Veja uma pequena cena e tente reconstruí-la depois que ela desaparecer.", question:"Lembrar é recuperar ou reconstruir?", duration:"3 min", action:"reconstrução", tone:"lilac", group:"experiment" },
  { slug:"mudanca", number:"12", eyebrow:"caos + tempo", title:"Até onde uma pequena mudança consegue chegar?", description:"Dê uma diferença quase invisível a dois sistemas iguais e deixe o tempo trabalhar.", question:"Uma grande diferença precisa de uma grande causa?", duration:"3 min", action:"trajetórias", tone:"ice", group:"experiment" },
  { slug:"atencao", number:"13", eyebrow:"atenção", title:"O que a atenção apaga?", description:"Conte uma coisa enquanto outra atravessa a mesma cena.", question:"O que some quando você presta atenção?", duration:"2 min", action:"teste", tone:"gold", group:"experiment" },
  { slug:"aleatorio", number:"14", eyebrow:"acaso + intuição", title:"Tente ser aleatório", description:"Faça escolhas rápidas tentando imitar o acaso e compare seu padrão com um gerador.", question:"Você consegue agir como o acaso?", duration:"3 min", action:"24 escolhas", tone:"pink", group:"experiment" },
  { slug:"perguntas", number:"15", eyebrow:"informação", title:"Qual pergunta vale mais?", description:"Descubra uma criatura escondida escolhendo perguntas que eliminam possibilidades.", question:"Uma pergunta pode valer mais do que outra?", duration:"3 min", action:"perguntas", tone:"mint", group:"experiment" },
  { slug:"regra", number:"16", eyebrow:"hipóteses", title:"Qual é a regra?", description:"Teste sequências para descobrir uma regra que começa com 2, 4, 6.", question:"Você tenta confirmar ou tenta quebrar sua hipótese?", duration:"4 min", action:"testes", tone:"ice", group:"experiment" },
  { slug:"minuto", number:"17", eyebrow:"tempo percebido", title:"Quanto dura um intervalo?", description:"Tente sentir dez, vinte ou trinta segundos sem olhar para um relógio.", question:"Seu tempo passa na mesma velocidade do relógio?", duration:"1 min", action:"cronômetro invisível", tone:"clay", group:"experiment" },
  { slug:"stroop", number:"18", eyebrow:"atenção + leitura", title:"Leia menos. Veja mais.", description:"Responda à cor da tinta enquanto a palavra tenta responder por você.", question:"É possível ignorar algo que seu cérebro lê sozinho?", duration:"2 min", action:"cores", tone:"violet", group:"experiment" }
];

const heldBack = ["rede", "cooperar", "memoria", "atencao", "regra"];

export const publicSlugs = experiments.map((experiment) => experiment.slug).filter((slug) => !heldBack.includes(slug));

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}

export function publicExperiments() {
  return publicSlugs.map((slug, index) => {
    const experiment = getExperiment(slug);
    if (!experiment) throw new Error("experiência pública sem cadastro: " + slug);
    return { ...experiment, number: String(index + 1).padStart(2, "0") };
  });
}
