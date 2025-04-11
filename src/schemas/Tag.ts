import mongoose from "mongoose"

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    languages: [{ language: String, name: String }],
})

export const Tag = mongoose.model("Tag", TagSchema)