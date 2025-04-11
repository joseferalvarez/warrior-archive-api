import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    languages: [{ language: String, name: String }],
    url: { type: String, required: true }
})

export const Video = mongoose.model("Video", VideoSchema)