"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

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

export function RegisterForm() {
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
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: async () => {
            toast.success("Cadastro realizado com sucesso!");
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
    <Card className="w-full sm:max-w-md">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-2xl">Cadastro</CardTitle>
        <CardDescription>
          Por favor, insira seus dados para criar uma conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu nome"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>E-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite sua senha"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirmar Senha</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite sua senha novamente"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field
          orientation="horizontal"
          className="flex flex-col items-end justify-end gap-6"
        >
          <p className="text-sm flex items-center">
            Já possui uma conta?{" "}
            <Link
              href="/auth/login"
              className="ml-1 hover:underline cursor-pointer"
            >
              Faça login
            </Link>
          </p>
          <Button type="submit" form="signup-form" className="w-full">
            {form.formState.isSubmitting ? (
              <Spinner className="size-6" />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
