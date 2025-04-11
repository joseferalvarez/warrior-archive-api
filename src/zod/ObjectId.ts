import { z } from "zod"

export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {message: "Invalid ID"})
export type zodObjectId = z.infer<typeof ObjectIdSchema>