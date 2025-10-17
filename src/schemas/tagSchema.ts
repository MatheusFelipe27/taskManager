import { z } from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .nonempty("Nome da tag obrigatório"),
  color: z
    .string()
    .nonempty("Cor da tag obrigatória"),
});

export type TagSchema = z.infer<typeof tagSchema>;
