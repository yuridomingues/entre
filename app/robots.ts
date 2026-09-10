import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://entre-ideias.vercel.app/sitemap.xml" }; }
