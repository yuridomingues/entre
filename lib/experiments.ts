export type Experiment = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  question: string;
  duration: string;
  action: string;
  tone: "moss" | "violet" | "sun" | "water" | "clay" | "lime" | "pink" | "night";
};

export const experiments: Experiment[] = [
  { slug:"arvore", number:"01", eyebrow:"natureza + tempo", title:"A árvore que viu tudo", description:"Atravesse cinco séculos no tempo de uma árvore.", question:"O que acontece enquanto uma árvore cresce?", duration:"5 min", action:"rolagem", tone:"moss" },
  { slug:"mente", number:"02", eyebrow:"percepção", title:"O mundo que seu cérebro inventa", description:"Três ilusões simples para desconfiar dos próprios olhos.", question:"Você vê o que está na tela?", duration:"3 min", action:"3 ilusões", tone:"violet" },
  { slug:"musica", number:"03", eyebrow:"música", title:"Anatomia de uma música", description:"Desmonte uma composição em pulso, baixo, harmonia, melodia e timbre.", question:"O que sobra quando tiramos uma camada?", duration:"4 min", action:"áudio", tone:"sun" },
  { slug:"conversa", number:"04", eyebrow:"linguagem", title:"Por onde uma conversa vai?", description:"Uma frase, várias portas. Escolha o detalhe que você seguiria.", question:"Qual palavra muda o rumo de uma conversa?", duration:"3 min", action:"escolhas", tone:"water" },
  { slug:"vida", number:"05", eyebrow:"tempo", title:"Quanto cabe em uma vida?", description:"Troque anos por semanas para enxergar o tempo em outra escala.", question:"Que tipo de coisa merece virar tempo?", duration:"3 min", action:"visualização", tone:"clay" },
  { slug:"escala", number:"06", eyebrow:"escala", title:"Do grão ao planeta", description:"Abra a escala e veja cada referência encolher quando a próxima entra em cena.", question:"Quando uma coisa deixa de parecer grande?", duration:"3 min", action:"deslize", tone:"lime" },
  { slug:"acaso", number:"07", eyebrow:"acaso", title:"Onde o acaso vai parar?", description:"Solte dezenas de pontos e deixe cada um escolher um lado várias vezes.", question:"Aleatório significa espalhado por igual?", duration:"2 min", action:"simulação", tone:"pink" },
  { slug:"noite", number:"08", eyebrow:"céu", title:"Apague a cidade", description:"Diminua as luzes e veja o céu ganhar coisas que já estavam lá.", question:"Quantas estrelas a luz esconde?", duration:"2 min", action:"controle de luz", tone:"night" }
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
