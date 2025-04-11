import { z } from "zod";

export const GradeSchema = z.object({
    name: z.string(),
    languages: z.array(z.object({
        language: z.string().length(2, {message: "The language must be a IS0 of length 2"}),
        name: z.string()
    })).optional(),
    rank: z.number().optional(),
    color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {message: "The color must be in hexadecimal code"}).optional()
});