import { z } from "zod"

export const TechniqueSchema = z.object({
    name: z.string(),
    languages: z.array(z.object({
        language: z.string().length(2, {message: "The language must be a IS0 of length 2"}),
        name: z.string()
    })).optional(),
    martialArts: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid martial art ID"})).optional(),
    grade: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid grade ID"})).optional(),
    category: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid category ID"})).optional(),
    tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid tag ID"})).optional(),
    difficulty: z.number(),
    videos: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid video ID"})).optional()
});

export type Technique = z.infer<typeof TechniqueSchema>