import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://entre-ideias.vercel.app"),
  title: { default: "ENTRE — um lugar para explorar ideias", template: "%s — ENTRE" },
  description: "Experimentos interativos sobre mente, natureza, música, filosofia, tempo e as coisas estranhas de estar vivo.",
  keywords: ["experimentos interativos", "filosofia", "psicologia", "natureza", "música", "aprendizado"],
  authors: [{ name: "Yuri Domingues" }],
  creator: "Yuri Domingues",
  openGraph: {
    title: "ENTRE — um lugar para explorar ideias",
    description: "Não é um curso. Não é um feed. É um lugar para mexer em ideias até elas fazerem sentido.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#f0eadf", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="ENTRE, início">ENTRE<span>.</span></Link>
      <nav aria-label="Navegação principal"><Link href="/#experimentos">experimentos</Link><Link href="/sobre">sobre</Link></nav>
    </header>
    <main id="conteudo">{children}</main>
    <footer className="site-footer">
      <div><strong>ENTRE.</strong><p>Um lugar para explorar ideias.</p></div>
      <div className="footer-links"><Link href="/sobre">manifesto</Link><a href="https://github.com/yuridomingues" target="_blank" rel="noreferrer">código & autor ↗</a></div>
      <p className="fine-print">Feito por Yuri Domingues. Sem anúncios, cadastro ou rastreamento pessoal.</p>
    </footer>
  </body></html>;
}
