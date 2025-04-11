import mongoose from "mongoose"

const MartialArtSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    languages: [{ language: String, name: String }],
    description: String,
    history: String,
    founder: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
})

export const MartialArt = mongoose.model("MartialArt", MartialArtSchema)