export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const cls = compact ? "tile-art compact" : "tile-art";

  if (slug === "arvore") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Árvore desenhada à mão">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M210 231c-5-49-4-95 1-138 3-24 7-45 12-65" strokeWidth="8"/>
        <path d="M212 140c-27-34-58-58-92-72M214 116c31-38 64-67 101-86M211 170c-40-17-77-23-113-19M211 184c38-5 73 3 106 25" strokeWidth="6"/>
        <path d="M66 232c83 4 163-2 284 0" strokeWidth="5"/>
      </g>
      <g fill="currentColor" opacity=".82">{[[114,65,25,17],[159,84,30,20],[226,54,35,23],[294,67,29,19],[335,112,24,17],[137,132,28,19],[271,127,32,21]].map(([cx,cy,rx,ry],i)=><ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}/>)}</g>
    </svg>
  );
  if (slug === "mente") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Olho">
      <path d="M45 130c45-72 105-93 165-93s120 21 165 93c-45 72-105 93-165 93S90 202 45 130Z" fill="none" stroke="currentColor" strokeWidth="5"/>
      <circle cx="210" cy="130" r="58" fill="currentColor"/><circle cx="210" cy="130" r="25" fill="#fffdf8"/><circle cx="192" cy="112" r="7" fill="#fffdf8"/>
    </svg>
  );
  if (slug === "musica") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Forma de onda"><path d="M22 131h52l12-31 20 68 18-119 21 162 22-129 21 83 21-47 20 27 20-15 22-71 20 140 21-97 21 56 20-27h65" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (slug === "conversa") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Balões de conversa"><path d="M42 35h205v75H118l-39 30 9-30H42ZM166 116h212v78H251l-42 32 11-32h-54Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/><path d="M82 73h92M215 151h115M215 174h79" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  );
  if (slug === "vida") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Grade de semanas">{Array.from({length:70}).map((_,i)=><circle key={i} cx={48+(i%14)*25} cy={54+Math.floor(i/14)*38} r="7" fill={i<44?"currentColor":"none"} stroke="currentColor" strokeWidth="2"/>)}</svg>
  );
  if (slug === "escala") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Objetos em escalas diferentes"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M53 216c78 2 151-2 224 1 42 2 81 0 112-2" strokeWidth="5"/><circle cx="82" cy="193" r="9" strokeWidth="4"/><path d="M141 133c9-2 31-2 40 0 2 20 2 62 0 82-9 2-31 2-40 0-2-20-2-62 0-82Z" strokeWidth="4"/><circle cx="236" cy="119" r="16" strokeWidth="4"/><path d="M236 136v79M214 158l22-18 24 18M236 177l-17 38M236 177l20 38" strokeWidth="4"/><path d="M300 112c13-3 43-3 57 0 4 22 4 80 0 102-13 3-43 3-57 0-4-22-4-80 0-102Z" strokeWidth="4"/></g></svg>
  );
  if (slug === "acaso") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Pontos formando uma distribuição">{Array.from({length:45}).map((_,i)=>{const col=i%9,row=Math.floor(i/9),h=Math.abs(col-4);return <circle key={i} cx={75+col*34} cy={210-row*28-h*5} r="8" fill="currentColor"/>})}<path d="M48 226h324" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  );
  if (slug === "noite") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Cidade sob um céu estrelado"><g fill="currentColor"><path d="M40 213V132h62v81M92 213V92h72v121M151 213v-58h71v58M208 213V112h75v101M272 213V72h72v141M335 213v-91h45v91"/><circle cx="75" cy="52" r="5"/><circle cx="135" cy="39" r="4"/><circle cx="206" cy="54" r="6"/><circle cx="253" cy="30" r="4"/><circle cx="330" cy="44" r="5"/></g><path d="M32 214h356" stroke="currentColor" strokeWidth="6"/></svg>
  );
  if (slug === "rede") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Rede com uma ponte entre grupos"><g fill="none" stroke="currentColor" strokeWidth="4" opacity=".55"><path d="M52 73 116 44 174 92 112 137 63 193 155 215 204 159M174 92l30 67M116 44l-4 93M204 159l58 37M262 196l49-55M311 141l28-72M339 69l45 57M311 141l73-15"/></g><path d="M204 159 262 196" stroke="currentColor" strokeWidth="7" strokeDasharray="9 7"/><g fill="#fffdf8" stroke="currentColor" strokeWidth="4">{[[52,73],[116,44],[174,92],[112,137],[63,193],[155,215],[204,159],[262,196],[311,141],[339,69],[384,126]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="12"/>)}</g><circle cx="116" cy="44" r="6" fill="currentColor"/></svg>
  );
  if (slug === "cooperar") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Duas mãos e fichas"><g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M57 158c45-38 78-43 119-13l35 25M363 158c-45-38-78-43-119-13l-35 25"/><path d="M66 165l43 42 67-62M354 165l-43 42-67-62"/></g><g fill="currentColor">{[150,180,210,240,270].map((x,i)=><circle key={i} cx={x} cy={80+(i%2)*18} r="12"/>)}</g></svg>
  );
  if (slug === "memoria") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Objetos e posições lembradas"><rect x="48" y="42" width="324" height="176" rx="12" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M156 42v176M264 42v176M48 130h324" stroke="currentColor" strokeWidth="2" opacity=".35"/><circle cx="105" cy="84" r="18" fill="currentColor"/><rect x="192" y="154" width="35" height="24" fill="currentColor"/><path d="M300 75c18 0 25 18 10 29-15 11-30-1-27-15 2-9 8-14 17-14Z" fill="currentColor"/><circle cx="325" cy="180" r="18" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="6 5"/></svg>
  );
  if (slug === "mudanca") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Duas trajetórias que se separam"><path d="M35 210C90 205 105 150 150 140s70 20 94-35 67-53 142-41" fill="none" stroke="currentColor" strokeWidth="5"/><path d="M35 214C90 209 106 154 151 144s66 28 80 3 23 32 54 50 69-6 101-70" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="10 7"/><circle cx="35" cy="210" r="9" fill="currentColor"/></svg>
  );
  if (slug === "centro") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Casas e um bebedouro"><g fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round">{[[70,80],[135,55],[165,135],[95,190],[230,70],[270,150],[340,85],[350,190]].map(([x,y],i)=><path key={i} d={"M"+(x-13)+" "+y+" "+x+" "+(y-12)+" "+(x+13)+" "+y+"v18h-26Z"}/>)}</g><circle cx="220" cy="155" r="26" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 6"/><path d="M208 160h24M220 143v17" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  );
  if (slug === "atencao") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Formas atravessando uma linha"><path d="M210 30v200" stroke="currentColor" strokeWidth="4" strokeDasharray="9 8"/><circle cx="90" cy="85" r="16" fill="currentColor"/><circle cx="330" cy="170" r="16" fill="currentColor"/><rect x="95" y="160" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M270 58 305 118 235 118Z" fill="none" stroke="currentColor" strokeWidth="6"/></svg>
  );
  if (slug === "evidencia") return (
    <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Duas caixas com pistas coloridas"><path d="M62 58h120v150H62ZM238 58h120v150H238Z" fill="none" stroke="currentColor" strokeWidth="5"/><g fill="currentColor">{[[88,88],[122,88],[156,88],[88,122],[122,122],[156,122],[88,156],[122,156]].map(([x,y],i)=><circle key={"a"+i} cx={x} cy={y} r="10" opacity={i<6?1:.25}/>)}</g><g fill="currentColor">{[[264,88],[298,88],[332,88],[264,122],[298,122],[332,122],[264,156],[298,156]].map(([x,y],i)=><circle key={"b"+i} cx={x} cy={y} r="10" opacity={i<2?1:.25}/>)}</g></svg>
  );
  return null;
}
