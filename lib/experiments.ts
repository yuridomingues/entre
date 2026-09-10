export type Experiment = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  question: string;
  duration: string;
  action: string;
  tone: "moss" | "violet" | "sun" | "water" | "clay";
};

export const experiments: Experiment[] = [
  { slug:"arvore", number:"01", eyebrow:"natureza + tempo", title:"A árvore que viu tudo", description:"Atravesse 526 anos usando o tempo de uma árvore como régua.", question:"Quanto tempo cabe numa árvore?", duration:"6–8 min", action:"rolagem", tone:"moss" },
  { slug:"mente", number:"02", eyebrow:"psicologia + percepção", title:"O mundo que seu cérebro inventa", description:"Três pequenos testes mostram o quanto perceber depende de atenção e memória.", question:"Você percebe tudo o que vê?", duration:"4–6 min", action:"3 testes", tone:"violet" },
  { slug:"musica", number:"03", eyebrow:"música + física", title:"Anatomia de uma música", description:"Desmonte uma composição em pulso, baixo, harmonia, melodia e timbre.", question:"O que sobra quando tiramos uma camada?", duration:"4–6 min", action:"áudio", tone:"sun" },
  { slug:"conversa", number:"04", eyebrow:"linguagem + psicologia", title:"A história de uma conversa", description:"Escolha perguntas e observe como uma conversa pode mudar de camada.", question:"O que torna uma conversa profunda?", duration:"3–5 min", action:"escolhas", tone:"water" },
  { slug:"vida", number:"05", eyebrow:"tempo + filosofia", title:"Quanto cabe em uma vida?", description:"Troque anos por semanas para enxergar o tempo em outra escala.", question:"Que tipo de coisa merece virar tempo?", duration:"3–4 min", action:"visualização", tone:"clay" }
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
