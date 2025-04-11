import { Context } from "hono";
import { MartialArt } from "../schemas/MartialArt";
import { MartialArtSchema } from "../zod/MartialArt"
import { ObjectIdSchema } from "../zod/ObjectId";
import { LanguageSchema } from "../zod/Language";

export class Controller {
    async getMartialArts(c: Context){
        try{
            const arts = await MartialArt.find({});
            return c.json({message: "Martial arts get", arts: arts});
        }catch(e: any){
            return c.json({message: e.message}, 400);
        }
    }

    async getLanguageMartialArts(c: Context){
        const language = c.req.param("lang");

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const arts = await MartialArt.find({});

            const langArts = arts.map((art) => {
                const lang = art.languages.find((l) => l.language === language);

                return {
                    id: art._id,
                    name: lang ? lang.name : art.name,
                };
            });

            return c.json({ message: "Martial arts get", arts: langArts });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getMartialArt(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const art = await MartialArt.findById(id);
            return c.json({message: "Martial art get", art: art});
        }catch(e: any){
            return c.json({message: e.message}, 400);
        }
    }

    async getLanguageMartialArt(c: Context){
        const id = c.req.param("id");
        const language = c.req.param("lang");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const art = await MartialArt.findById(id);
            
            if(!art) return c.json({ message: "Art not found" }, 404);        

            const langArt = art.languages.find((l) => l.language === language) || { _id: art._id, name: art.name };

            return c.json({ message: "Martial art get", art: {_id: art._id, name: langArt.name} });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async postMartialArt(c: Context){
        const body = await c.req.json();

        const parseBody = MartialArtSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        const martialArtData = parseBody.data;

        try{
            const art = new MartialArt(martialArtData);
            await art.save();

            return c.json({message: "New art created", art: art}, 201);
        }catch(e: any){
            return c.json({message: e.message}, 400);
        }
    }

    async updateMartialArt(c: Context){
        const id = c.req.param("id");
        const body = await c.req.json();

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseBody = MartialArtSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        const martialArtData = parseBody.data;
        
        try{
            const art = await MartialArt.findByIdAndUpdate(id, martialArtData, {new: true});
            return c.json({message: "Martial art updated", art: art});
        }catch(e: any){
            return c.json({message: e.message}, 400);
        }
    }

    async deleteMartialArt(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const art = await MartialArt.findByIdAndDelete(id);
            return c.json({message: "Martial art deleted", art: art});
        }catch(e: any){
            return c.json({message: e.message}, 400);
        }
    }
}