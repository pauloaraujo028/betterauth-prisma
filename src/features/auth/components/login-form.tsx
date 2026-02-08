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
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
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
            className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
              form.formState.errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <span className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="password"
            >
              Senha
            </label>
            <Link
              href="#"
              className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="group relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
                form.formState.errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              {...form.register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1.5 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {form.formState.errors.password && (
            <span className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember"
            className="cursor-pointer text-xs font-medium text-slate-600"
          >
            Lembrar de mim
          </label>
        </div>

        <button
          type="submit"
          form="signin-form"
          className="flex w-full transform cursor-pointer items-center justify-center rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.98]"
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
        <span className="mx-4 shrink text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Ou continue com
        </span>
        <div className="grow border-t border-slate-200"></div>
      </div>

      <SocialLogin />

      <p className="text-center text-sm text-slate-600">
        Não tem uma conta?
        <Link
          href="/auth/register"
          className="ml-1 font-bold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline"
        >
          Criar conta gratuita
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
