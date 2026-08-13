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
import { AuthProvider } from "@/components/AuthProvider";
import { usePathname } from "next/navigation";
import LayoutClient from "./LayoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-foreground flex min-h-screen`}>
        <AuthProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
