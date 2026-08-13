import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EVS Gestão",
  description: "Sistema inteligente para gestão de Espaço Vida Saudável",
  manifest: "/manifest.json",
};

import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-foreground flex min-h-screen`}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
