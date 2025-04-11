import { z } from "zod";

export const TagSchema = z.object({
    name: z.string(),
    languages: z.array(z.object({
        language: z.string().length(2, {message: "The language must be a IS0 of length 2"}),
        name: z.string()
    })).optional()
});

export type Tag = z.infer<typeof TagSchema>;