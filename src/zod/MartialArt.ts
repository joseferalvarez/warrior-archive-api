import { z } from "zod";

export const MartialArtSchema = z.object({
    name: z.string({}),
    languages: z.array(z.object({
        language: z.string().length(2, {message: "The language must be a IS0 of length 2"}),
        name: z.string()
    })).optional(),
    description: z.string().optional(),
    history: z.string().optional(),
    founder: z.string().optional(),
    videos: z.array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid video ID"})
    ).optional()
})

export type MartialArt = z.infer<typeof MartialArtSchema>