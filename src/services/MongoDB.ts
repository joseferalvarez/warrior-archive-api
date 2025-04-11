import mongoose from "mongoose"

export class MongoDB {
    uri: string
    constructor({uri}: {uri: string}){
        this.uri = uri
    }

    async connect(): Promise<{error: number, message: string}>{
        if(!this.uri) return { error: 0, message: "No MongoDB URI provided" }
        try{
            mongoose.connect(this.uri)
            return { error: 0, message: "Connected to MongoDB" }
        }catch(e: any){
            return { error: 1, message: e.message }
        }
    }
}