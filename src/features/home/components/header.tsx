"use client";

import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const session = useSession();

  const user = session?.data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Empresa
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Produtos", "Soluções", "Preços", "Recursos"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center space-x-2">
          {user ? (
            <UserAvatar />
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="hidden sm:block text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                Começar Agora
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
