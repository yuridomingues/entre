import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
