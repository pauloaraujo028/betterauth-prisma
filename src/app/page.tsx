import Header from "@/features/home/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
   const session = await auth.api.getSession({
        headers: await headers()
    })

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="flex min-h-200 items-center justify-center px-6 pt-32 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
            Gerencie seu negócio com
            <span className="text-indigo-600">inteligência espacial.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600">
            A NexusCloud oferece a infraestrutura completa para escalar sua
            empresa com segurança e velocidade.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {session ? (
              <button className="w-full transform cursor-pointer rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700 sm:w-auto">
              <Link href="/dashboard">Ir para Dashboard</Link>
            </button>
            ) : (
              <>
              <button className="w-full transform cursor-pointer rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700 sm:w-auto">
              <Link href="/auth/register">Testar Grátis</Link>
            </button>
            <button className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:w-auto">
              <Link href="#">Ver Demo</Link>
            </button></>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-32">
        <div className="container mx-auto px-6">
          <div className="flex h-250 items-center justify-center rounded-3xl border-4 border-dashed border-slate-100 text-3xl font-bold text-slate-300">
            Role para ver o efeito do Header
          </div>
        </div>
      </section>
    </div>
  );
}
