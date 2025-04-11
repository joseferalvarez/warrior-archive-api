import mongoose from "mongoose"

const GradeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    languages: [{ language: String, name: String }],
    martialArt: {type: mongoose.Schema.Types.ObjectId, ref: "MartialArt", required: true},
    rank: Number,
    color: String
})

export const Grade = mongoose.model("Grade", GradeSchema)