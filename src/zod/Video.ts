import { z } from "zod"

export const VideoSchema = z.object({
    name: z.string(),
    languages: z.array(z.object({
        language: z.string().length(2, {message: "The language must be a IS0 of length 2"}),
        name: z.string()
    })).optional(),
    url: z.string().url()
})
export type Video = z.infer<typeof VideoSchema>