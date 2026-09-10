export type Experiment = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  prompt: string;
  className: string;
};

export const experiments: Experiment[] = [
  { slug: "arvore", number: "01", eyebrow: "natureza + tempo", title: "A árvore que viu tudo", description: "Quinhentos anos cabem em uma rolagem. Veja o mundo mudar no tempo de uma árvore.", prompt: "desça por 526 anos", className: "card-moss" },
  { slug: "mente", number: "02", eyebrow: "psicologia + percepção", title: "O mundo que seu cérebro inventa", description: "Você não percebe tudo que vê. Teste atenção, cor, memória e as pequenas apostas que o cérebro faz.", prompt: "teste sua percepção", className: "card-violet" },
  { slug: "musica", number: "03", eyebrow: "música + física", title: "Anatomia de uma música", description: "Desmonte som em frequência, ritmo, harmonia e textura — e monte tudo de novo com os próprios ouvidos.", prompt: "ligue o som", className: "card-sun" },
  { slug: "conversa", number: "04", eyebrow: "linguagem + psicologia", title: "A história de uma conversa", description: "De 'calor hoje, né?' até perguntas que mudam uma relação. Explore o que faz uma conversa ganhar profundidade.", prompt: "comece falando", className: "card-water" },
  { slug: "vida", number: "05", eyebrow: "tempo + filosofia", title: "Quanto cabe em uma vida?", description: "Transforme anos em semanas e semanas em escolhas. Uma maneira menos abstrata de pensar sobre tempo.", prompt: "veja o tempo", className: "card-clay" },
];
