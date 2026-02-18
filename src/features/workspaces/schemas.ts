import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Nome do workspace é obrigatório"),
});
