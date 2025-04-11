import { Tag } from "../schemas/Tag"
import { Context } from "hono"
import { LanguageSchema } from "../zod/Language"
import { ObjectIdSchema } from "../zod/ObjectId"
import { TagSchema } from "../zod/Tag"

export class Controller{
    async getTags(c: Context){
        try{
            const tags = await Tag.find({});
            return c.json({ message: "Tags get", tags: tags });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getLanguageTags(c: Context){
        const language = c.req.param("lang");

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const tags = await Tag.find({});

            const langTags = tags.map((tag) => {
                const lang = tag.languages.find((l) => l.language === language);

                return {
                    id: tag._id,
                    name: lang ? lang.name : tag.name,
                };
            });

            return c.json({ message: "Tags get", tags: langTags });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getTag(c: Context){
        const id = c.req.param("id")

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        try{
            const tag = await Tag.findById(id);
            return c.json({ message: "Tag get", tag: tag });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getLanguageTag(c: Context){
        const id = c.req.param("id");
        const language = c.req.param("lang");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const tag = await Tag.findById(id);
            
            if(!tag) return c.json({ message: "Tag not found" }, 404);

            const langTag = tag.languages.find((l) => l.language === language) || { id: tag._id, name: tag.name };

            return c.json({ message: "Tag get", tag: {id: langTag.id, name: langTag.name} });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async postTag(c: Context){
        const body = await c.req.json();

        const parseBody = TagSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        
        try{
            const tag = await Tag.create(body);
            return c.json({ message: "Tag created", tag: tag }, 201);
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async updateTag(c: Context){
        const id = c.req.param("id");
        const body = await c.req.json();

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseBody = TagSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        
        try{
            const tag = await Tag.findByIdAndUpdate(id, body, {new: true});
            return c.json({ message: "Tag updated", tag: tag });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async deleteTag(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const tag = await Tag.findByIdAndDelete(id);
            return c.json({ message: "Tag deleted", tag: tag });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }
}