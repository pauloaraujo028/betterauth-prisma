"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SocialLogin from "./social";

const formSchema = z.object({
  email: z.email("Por favor, insira um endereço de email válido."),
  password: z.string().min(5, "Senha deve conter no mínimo 5 caracteres."),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: async () => {
            toast.success("Login realizado com sucesso!");
          },
          onError: async (ctx) => {
            toast.error(
              ctx.error.message ||
                "Falha ao realizar login. Por favor, verifique suas credenciais e tente novamente.",
            );
          },
        },
      );
    } catch {
      throw new Error(
        "Ops! Ocoreu um erro inesperado. Por favor, tente novamente.",
      );
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Bem-vindo de volta!
        </h1>
        <p className="text-slate-500">
          Insira suas credenciais para acessar sua conta.
        </p>
      </header>

      <form
        id="signin-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-1.5">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            className={`w-full px-4 py-2.5 rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
              form.formState.errors.email
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="password"
            >
              Senha
            </label>
            <Link
              href="#"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                form.formState.errors.password
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <span className="text-red-500 text-xs">
                {form.formState.errors.password.message}
              </span>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <Eye />
              ) : (
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   width="20"
                //   height="20"
                //   viewBox="0 0 24 24"
                //   fill="none"
                //   stroke="currentColor"
                //   strokeWidth="2"
                //   strokeLinecap="round"
                //   strokeLinejoin="round"
                // >
                //   <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                //   <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                //   <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                //   <line x1="2" y1="2" x2="22" y2="22" />
                // </svg>
                <EyeOff />
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   width="20"
                //   height="20"
                //   viewBox="0 0 24 24"
                //   fill="none"
                //   stroke="currentColor"
                //   strokeWidth="2"
                //   strokeLinecap="round"
                //   strokeLinejoin="round"
                // >
                //   <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                //   <circle cx="12" cy="12" r="3" />
                // </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember"
            className="text-xs text-slate-600 font-medium cursor-pointer"
          >
            Lembrar de mim
          </label>
        </div>

        <button
          type="submit"
          form="signin-form"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center cursor-pointer"
        >
          {form.formState.isSubmitting ? (
            <Spinner className="size-6" />
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="grow border-t border-slate-200"></div>
        <span className="shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Ou continue com
        </span>
        <div className="grow border-t border-slate-200"></div>
      </div>

      <SocialLogin />

      <p className="text-center text-sm text-slate-600">
        Não tem uma conta?
        <Link
          href="/auth/register"
          className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-4 hover:underline ml-1"
        >
          Criar conta gratuita
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
