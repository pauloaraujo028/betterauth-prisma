"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  slug: z
    .string()
    .min(2, "O slug deve ter pelo menos 2 caracteres")
    .max(50, "O slug pode ter no máximo 50 caracteres"),
});

export function CreateOrganizationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await authClient.organization.create({
        name: data.name,
        slug: data.slug,
      });

      toast.success("Organização criada com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar organização.");
    }
  }

  return (
    <form
      id="create-organization-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700" htmlFor="name">
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
        <label className="text-sm font-semibold text-slate-700" htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          placeholder="Digite seu slug"
          className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
            form.formState.errors.slug
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
          }`}
          {...form.register("slug")}
        />
        {form.formState.errors.slug && (
          <span className="text-xs text-red-500">
            {form.formState.errors.slug.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        form="create-organization-form"
        className="flex w-full transform cursor-pointer items-center justify-center rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-[0.98]"
      >
        {form.formState.isSubmitting ? (
          <Spinner className="size-6" />
        ) : (
          "Criar organização"
        )}
      </button>
    </form>
  );
}
