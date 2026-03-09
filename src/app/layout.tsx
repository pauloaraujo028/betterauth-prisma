import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${inter.className} antialiased`}
      suppressHydrationWarning
    >
      <body cz-shortcut-listen="true">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
