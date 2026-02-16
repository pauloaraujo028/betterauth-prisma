import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Por favor, insira um endereço de email válido."),
  password: z.string().min(5, "Senha deve conter no mínimo 5 caracteres."),
});
