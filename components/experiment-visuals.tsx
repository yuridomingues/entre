export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const cls = compact ? "tile-art compact" : "tile-art";

  if (slug === "arvore") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Árvore">
      <path d="M207 235c-4-52 0-91 8-128m-3 32-47-38m47 17 49-47m-51 82-73 4m75 14 70 18" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <g fill="currentColor"><circle cx="142" cy="87" r="44"/><circle cx="205" cy="68" r="54"/><circle cx="270" cy="88" r="46"/><circle cx="121" cy="144" r="37"/><circle cx="189" cy="134" r="49"/><circle cx="254" cy="137" r="51"/><circle cx="308" cy="145" r="32"/></g>
      <path d="M112 235h195" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );

  if (slug === "mente") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Olho">
      <path d="M45 130c45-72 105-93 165-93s120 21 165 93c-45 72-105 93-165 93S90 202 45 130Z" fill="none" stroke="currentColor" strokeWidth="5"/>
      <circle cx="210" cy="130" r="58" fill="currentColor"/><circle cx="210" cy="130" r="25" fill="#fffdf8"/><circle cx="192" cy="112" r="7" fill="#fffdf8"/>
    </svg>
  );

  if (slug === "musica") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Forma de onda">
      <path d="M22 131h52l12-31 20 68 18-119 21 162 22-129 21 83 21-47 20 27 20-15 22-71 20 140 21-97 21 56 20-27h65" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (slug === "conversa") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Balões de conversa">
      <path d="M42 35h205v75H118l-39 30 9-30H42ZM166 116h212v78H251l-42 32 11-32h-54Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M82 73h92M215 151h115M215 174h79" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  if (slug === "vida") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Grade de semanas">
      {Array.from({length:70}).map((_,i)=><circle key={i} cx={48+(i%14)*25} cy={54+Math.floor(i/14)*38} r="7" fill={i<44?"currentColor":"none"} stroke="currentColor" strokeWidth="2"/>)}
    </svg>
  );

  if (slug === "escala") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Pessoa, árvore, montanha e planeta em escalas diferentes">
      <circle cx="332" cy="72" r="48" fill="none" stroke="currentColor" strokeWidth="5"/>
      <path d="M183 219 267 95l84 124Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M125 219c-4-47-1-82 7-116m-3 35-33-28m34 12 31-32" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="132" cy="85" r="31" fill="currentColor"/>
      <circle cx="72" cy="170" r="14" fill="currentColor"/><path d="M72 185v34M54 198h36M72 219l-14 25M72 219l14 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M42 232h336" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  if (slug === "acaso") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Pontos formando uma distribuição">
      {Array.from({length:45}).map((_,i)=>{
        const col=i%9; const row=Math.floor(i/9); const height=Math.abs(col-4);
        const x=75+col*34; const y=210-row*28-height*5;
        return <circle key={i} cx={x} cy={y} r="8" fill="currentColor"/>;
      })}
      <path d="M48 226h324" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Cidade sob um céu estrelado">
      <g fill="currentColor">
        <path d="M40 213V132h62v81M92 213V92h72v121M151 213v-58h71v58M208 213V112h75v101M272 213V72h72v141M335 213v-91h45v91"/>
        <circle cx="75" cy="52" r="5"/><circle cx="135" cy="39" r="4"/><circle cx="206" cy="54" r="6"/><circle cx="253" cy="30" r="4"/><circle cx="330" cy="44" r="5"/>
      </g>
      <path d="M32 214h356" stroke="currentColor" strokeWidth="6"/>
    </svg>
  );
}
