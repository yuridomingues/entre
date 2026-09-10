import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./experiences.css";
import "./brand.css";
import "./release.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://entre-ideias.vercel.app"),
  title: { default: "ENTRE | coisas para pensar com as mãos", template: "%s | ENTRE" },
  description: "Experimentos interativos sobre percepção, natureza, música, linguagem, tempo, escala e acaso.",
  authors: [{ name: "Yuri Domingues" }],
  creator: "Yuri Domingues",
  openGraph: { title: "ENTRE | coisas para pensar com as mãos", description: "Oito experiências curtas para mexer em ideias.", type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image" }
};

export const viewport: Viewport = { themeColor: "#fffdf8", colorScheme: "light", width:"device-width", initialScale:1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}</body></html>;
}
