import Link from "next/link";
import type { ReactNode } from "react";

export function ExperimentShell({ number, eyebrow, title, intro, children }: { number: string; eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <article className="experiment-page">
      <header className="experiment-heading">
        <Link href="/#experimentos" className="back-link">← todos os experimentos</Link>
        <div className="kicker"><span>{number}</span>{eyebrow}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      {children}
    </article>
  );
}
