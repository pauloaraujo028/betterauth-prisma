"use client";

import { Logo } from "@/components/logo";
import { routes } from "@/components/navigation";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const session = useSession();

  const user = session?.data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-b border-slate-200 bg-white/80 py-3 shadow-sm backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Logo />

          {/* Desktop Menu */}
          <nav className="hidden items-center space-x-8 md:flex">
            {["Produtos", "Soluções", "Preços", "Recursos"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
              >
                {item}
              </Link>
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
                  className="px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-600"
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden transform rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95 sm:block"
                >
                  Começar Agora
                </Link>
              </>
            )}

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 transition-colors hover:text-indigo-600 focus:outline-none lg:hidden"
            >
              <div className="relative flex h-5 w-6 flex-col justify-between overflow-hidden">
                <span
                  className={`h-0.5 w-full origin-left bg-current transition-all duration-300 ${isMobileMenuOpen ? "translate-x-1 rotate-45" : ""}`}
                ></span>
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "translate-x-full opacity-0" : ""}`}
                ></span>
                <span
                  className={`h-0.5 w-full origin-left bg-current transition-all duration-300 ${isMobileMenuOpen ? "translate-x-1 -rotate-45" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-28 pb-10">
          <nav className="mb-auto flex flex-col space-y-6">
            {routes.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-slate-50 pb-4 text-2xl font-black text-slate-900 transition-all hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {!user && (
            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-2xl border-2 border-slate-100 py-4 text-lg font-bold text-slate-900"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-100"
              >
                Começar agora
              </button>
            </div>
          )}

          {user && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="mt-8 w-full rounded-2xl bg-red-50 py-4 text-lg font-bold text-red-500"
            >
              Sair da conta
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
