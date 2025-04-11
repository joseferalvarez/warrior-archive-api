import { z } from "zod";

export const LanguageSchema = z.string().length(2, {message: "The language must be a IS0 of length 2"});
export type LanguageSchemaType = z.infer<typeof LanguageSchema>