import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    languages: [{ language: String, name: String }],
})

export const Category = mongoose.model("Category", CategorySchema)