"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SocialLogin from "./social";

const formSchema = z
  .object({
    name: z.string().min(3, "Nome deve conter no mínimo 3 caracteres."),
    email: z.string().email("Por favor, insira um endereço de email válido."),
    password: z.string().min(3, "Senha deve conter no mínimo 3 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await authClient.signUp.email(
        { name: data.name, email: data.email, password: data.password },
        {
          onSuccess: async () => {
            toast.success("Cadastro realizado com sucesso!");
            form.reset();
            setTimeout(() => {
              toast.info("Redirecionando para a página de login...");
              router.push("/auth/login");
            }, 3000);
          },
          onError: async (ctx) => {
            toast.error(
              ctx.error.message ||
                "Falha ao realizar cadastro. Por favor, verifique suas credenciais e tente novamente.",
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
          Crie sua conta gratuita!
        </h1>
        <p className="text-slate-500">
          Insira suas informações para criar uma nova conta.
        </p>
      </header>

      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-1.5">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            id="name"
            placeholder="Digite seu nome"
            className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
              form.formState.errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <span className="text-xs text-red-500">
              {form.formState.errors.name.message}
            </span>
          )}
        </div>

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="password"
              >
                Senha
              </label>
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="confirmPassword"
              >
                Confirmar
              </label>
            </div>
            <div className="group relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
                  form.formState.errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
                {...form.register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1.5 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Esconder senha" : "Mostrar senha"
                }
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="pt-2">
          <p className="mb-4 text-[10px] text-slate-500">
            Ao clicar em cadastrar, você concorda com nossos
            <Link href="#" className="mx-1 text-indigo-600 hover:underline">
              Termos de Serviço
            </Link>
            e
            <Link href="#" className="ml-1 text-indigo-600 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
          <button
            type="submit"
            form="register-form"
            className="flex w-full transform cursor-pointer items-center justify-center rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.98]"
          >
            {form.formState.isSubmitting ? (
              <Spinner className="size-6" />
            ) : (
              "Criar conta"
            )}
          </button>
        </div>
      </form>

      <div className="relative flex items-center py-2">
        <div className="grow border-t border-slate-200"></div>
        <span className="mx-4 shrink text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Ou cadastre-se com
        </span>
        <div className="grow border-t border-slate-200"></div>
      </div>

      <SocialLogin />

      <p className="text-center text-sm text-slate-600">
        Já possui uma conta?
        <Link
          href="/auth/login"
          className="ml-1 font-bold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
