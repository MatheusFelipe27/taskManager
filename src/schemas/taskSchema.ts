import { z } from "zod";

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string()
});

export const taskSchema = z.object({
  title: z
    .string()
    .nonempty("Título obrigatório com pelo menos 3 letras")
    .min(3, "o título deve conter pelo menos 3 letras"),
  description: z
    .string()
    .nonempty("Descrição obrigatória"),
  priority: z
    .string()
    .nonempty("Prioridade obrigatória"),  
  status: z
    .string()
    .nonempty("Status obrigatório"),
  tags: z
    .array(tagSchema)
    .max(3, "Máximo de 3 tags permitidas")
    .optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
