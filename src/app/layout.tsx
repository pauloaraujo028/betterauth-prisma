import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterAuth - tutorial de autenticação para Next.js",
  description:
    "Aprenda a implementar autenticação em Next.js com o BetterAuth, uma solução simples e eficiente para gerenciar usuários e sessões. Este tutorial passo a passo irá guiá-lo através do processo de configuração, criação de páginas de login e registro, e integração com bancos de dados usando Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body cz-shortcut-listen="true">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
