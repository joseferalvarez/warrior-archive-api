import mongoose from "mongoose"

const TechniqueSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    languages: [{ language: String, name: String }],
    martialArts: [ { type: mongoose.Schema.Types.ObjectId, ref: "MartialArt", required: true } ],
    grade: [ { type: mongoose.Schema.Types.ObjectId, ref: "Grade", required: true } ],
    category: [ { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true } ],
    tags: [ { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true } ],
    difficulty: Number,
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}]
})

export const Technique = mongoose.model("Technique", TechniqueSchema)