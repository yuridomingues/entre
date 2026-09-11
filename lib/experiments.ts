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
  { slug:"escala", number:"06", eyebrow:"escala", title:"Do grão ao planeta", description:"Compare cada objeto com o anterior usando a mesma régua.", question:"Quando uma coisa deixa de parecer grande?", duration:"3 min", action:"comparação", tone:"lime", group:"collection" },
  { slug:"acaso", number:"07", eyebrow:"acaso", title:"Onde o acaso vai parar?", description:"Solte dezenas de pontos e deixe cada um escolher um lado várias vezes.", question:"Aleatório significa espalhado por igual?", duration:"2 min", action:"simulação", tone:"pink", group:"flagship" },
  { slug:"noite", number:"08", eyebrow:"céu", title:"Apague a cidade", description:"Diminua as luzes e veja o céu ganhar coisas que já estavam lá.", question:"Quantas estrelas a luz esconde?", duration:"2 min", action:"controle de luz", tone:"night", group:"collection" },

  { slug:"rede", number:"09", eyebrow:"sociedade + redes", title:"Como uma ideia se espalha?", description:"Escolha pontos de partida, corte uma ponte e veja o caminho de uma ideia mudar.", question:"Quanto do alcance pertence à própria ideia?", duration:"3 min", action:"rede", tone:"mint", group:"experiment" },
  { slug:"cooperar", number:"10", eyebrow:"cooperação", title:"Quando cooperar deixa de valer a pena?", description:"Jogue contra três padrões diferentes e veja a mesma escolha mudar de valor.", question:"Existe uma estratégia boa em qualquer relação?", duration:"4 min", action:"decisões", tone:"coral", group:"experiment" },
  { slug:"memoria", number:"11", eyebrow:"memória", title:"Uma memória muda toda vez que você olha para ela", description:"Veja uma pequena cena e tente reconstruí-la depois que ela desaparecer.", question:"Lembrar é recuperar ou reconstruir?", duration:"3 min", action:"reconstrução", tone:"lilac", group:"experiment" },
  { slug:"mudanca", number:"12", eyebrow:"caos + tempo", title:"Até onde uma pequena mudança consegue chegar?", description:"Dê uma diferença quase invisível a dois sistemas iguais e deixe o tempo trabalhar.", question:"Uma grande diferença precisa de uma grande causa?", duration:"3 min", action:"trajetórias", tone:"ice", group:"experiment" },
  { slug:"centro", number:"13", eyebrow:"justiça + espaço", title:"Onde está o centro?", description:"Coloque um único bebedouro e depois mude o que significa uma posição justa.", question:"Centro para quem?", duration:"4 min", action:"mapa", tone:"sand", group:"experiment" },
  { slug:"atencao", number:"14", eyebrow:"atenção", title:"O que a atenção apaga?", description:"Conte uma coisa enquanto outra atravessa a mesma cena.", question:"O que some quando você presta atenção?", duration:"2 min", action:"teste", tone:"gold", group:"experiment" },
  { slug:"evidencia", number:"15", eyebrow:"crença + evidência", title:"Quando você muda de ideia?", description:"Puxe pistas de uma caixa escondida e deixe sua certeza se mover.", question:"Quanto deveria valer uma pista nova?", duration:"3 min", action:"pistas", tone:"plum", group:"experiment" },
  { slug:"aleatorio", number:"16", eyebrow:"acaso + intuição", title:"Tente ser aleatório", description:"Faça trinta escolhas tentando imitar o acaso e compare seu padrão com um gerador.", question:"Você consegue agir como o acaso?", duration:"3 min", action:"30 escolhas", tone:"pink", group:"experiment" },
  { slug:"teseu", number:"17", eyebrow:"identidade", title:"Quando deixa de ser o mesmo?", description:"Troque um barco peça por peça e escolha onde a identidade teria mudado.", question:"Quanto de uma coisa pode mudar antes de virar outra?", duration:"4 min", action:"troca de peças", tone:"sand", group:"experiment" },
  { slug:"perguntas", number:"18", eyebrow:"informação", title:"Qual pergunta vale mais?", description:"Descubra uma criatura escondida escolhendo perguntas que eliminam possibilidades.", question:"Uma pergunta pode valer mais do que outra?", duration:"3 min", action:"perguntas", tone:"mint", group:"experiment" },
  { slug:"cegueira", number:"19", eyebrow:"percepção + mudança", title:"Você percebe quando algo muda?", description:"Duas cenas alternam e apenas um detalhe muda.", question:"Olhar é o mesmo que guardar uma cena?", duration:"2 min", action:"encontre a mudança", tone:"lilac", group:"experiment" },
  { slug:"monte", number:"20", eyebrow:"linguagem + limites", title:"Quando exatamente virou outra coisa?", description:"Adicione e retire grãos até decidir onde começa e termina um monte.", question:"Onde uma palavra ganha uma fronteira?", duration:"3 min", action:"marcar limite", tone:"gold", group:"experiment" },
  { slug:"media", number:"21", eyebrow:"dados", title:"Quando a média engana?", description:"Mude a mistura de casos e veja o total contar uma história diferente dos grupos.", question:"Um número certo pode sugerir uma conclusão errada?", duration:"3 min", action:"mistura", tone:"mint", group:"experiment" },
  { slug:"portas", number:"22", eyebrow:"probabilidade", title:"Fica ou troca?", description:"Escolha uma porta, receba uma informação nova e decida de novo.", question:"Informação nova muda uma escolha antiga?", duration:"3 min", action:"3 portas", tone:"gold", group:"experiment" },
  { slug:"maioria", number:"23", eyebrow:"sociedade + escolha", title:"Quem ganhou a eleição?", description:"Faça três disputas de maioria e veja uma preferência coletiva formar um ciclo.", question:"A maioria sempre produz um favorito?", duration:"3 min", action:"votações", tone:"coral", group:"experiment" },
  { slug:"regra", number:"24", eyebrow:"hipóteses", title:"Qual é a regra?", description:"Teste sequências para descobrir uma regra que começa com 2, 4, 6.", question:"Você tenta confirmar ou tenta quebrar sua hipótese?", duration:"4 min", action:"testes", tone:"ice", group:"experiment" },
  { slug:"sobreviventes", number:"25", eyebrow:"dados + ausência", title:"O que não voltou?", description:"Veja apenas os robôs que retornaram e decida onde reforçar a próxima geração.", question:"O que uma amostra não consegue mostrar?", duration:"3 min", action:"diagnóstico", tone:"sand", group:"experiment" },
  { slug:"minuto", number:"26", eyebrow:"tempo percebido", title:"Quanto dura um intervalo?", description:"Tente sentir dez, vinte ou trinta segundos sem olhar para um relógio.", question:"Seu tempo passa na mesma velocidade do relógio?", duration:"1 min", action:"cronômetro invisível", tone:"clay", group:"experiment" },
  { slug:"stroop", number:"27", eyebrow:"atenção + leitura", title:"Leia menos. Veja mais.", description:"Responda à cor da tinta enquanto a palavra tenta responder por você.", question:"É possível ignorar algo que seu cérebro lê sozinho?", duration:"2 min", action:"cores", tone:"violet", group:"experiment" },
  { slug:"aniversario", number:"28", eyebrow:"probabilidade", title:"Quantas pessoas até uma coincidência?", description:"Ajuste o tamanho de uma sala e estime quando aniversários repetidos ficam prováveis.", question:"Quantos pares cabem em uma sala pequena?", duration:"2 min", action:"palpite", tone:"coral", group:"experiment" },
  { slug:"mapa", number:"29", eyebrow:"mapas + distorção", title:"Um mapa pode contar a verdade inteira?", description:"Leve a mesma área do equador aos polos numa projeção de Mercator.", question:"O que precisa deformar quando uma esfera vira uma folha?", duration:"3 min", action:"latitude", tone:"ice", group:"experiment" },
  { slug:"profundidade", number:"30", eyebrow:"Terra + escala", title:"Abaixo dos seus pés", description:"Desça da superfície ao centro da Terra atravessando crosta, manto e núcleo.", question:"Quão fina é a parte do planeta que conseguimos tocar?", duration:"5 min", action:"descida", tone:"moss", group:"experiment" }
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
