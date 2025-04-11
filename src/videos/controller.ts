import { Context } from "hono"
import { Video } from "../schemas/Video"
import { LanguageSchema } from "../zod/Language"
import { ObjectIdSchema } from "../zod/ObjectId"
import { VideoSchema } from "../zod/Video"

export class Controller {
    async getVideos(c: Context) {
        try{
            const videos = await Video.find({})
            return c.json({ message: "Videos get", videos: videos }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async getLanguageVideos(c: Context) {
        const language = c.req.param("lang")

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const langVideos = await Video.find({})

            const videos = langVideos.map((video) => {
                const lang = video.languages.find((l) => l.language === language)

                return {
                    id: video._id,
                    name: lang ? lang.name : video.name,
                    url: video.url
                };
            });

            return c.json({ message: "Videos get", videos: videos }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async getVideo(c: Context) {
        const id = c.req.param("id")

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        try{
            const video = await Video.findById(id);
            return c.json({ message: "Video get", video: video }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async getLanguageVideo(c: Context) {
        const id = c.req.param("id");
        const language = c.req.param("lang")

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const video = await Video.findById(id);

            if(!video) return c.json({ message: "Video not found" }, 404);

            const langVideo = video.languages.find((l) => l.language === language) || { id: video._id, name: video.name }

            return c.json({ message: "Video get", video: {id: langVideo.id, name: langVideo.name, url: video.url} }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async postVideo(c: Context) {
        const body = await c.req.json();

        const parseBody = VideoSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        
        try{
            const video = await Video.create(body)
            return c.json({ message: "Video created", video: video }, 201)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async updateVideo(c: Context) {
        const id = c.req.param("id")
        const body = await c.req.json()

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseBody = VideoSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        
        try{
            const video = await Video.findByIdAndUpdate(id, body, {new: true})
            return c.json({ message: "Video updated", video: video }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }

    async deleteVideo(c: Context) {
        const id = c.req.param("id")

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const video = await Video.findByIdAndDelete(id)
            return c.json({ message: "Video deleted", video: video }, 200)
        }catch(e: any){
            return c.json({ message: e.message }, 400)
        }
    }
}