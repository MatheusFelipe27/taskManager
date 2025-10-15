import { z } from "zod";

export const loginInputSchema = z.object({
  user: z
    .string()
    .nonempty("Usuário obrigatório"),
  password: z.string().nonempty("Senha obrigatória"),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;
