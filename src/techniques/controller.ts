import { Context } from "hono";
import { Technique } from "../schemas/Technique";
import { Lookups } from "./pipelines/lookups";
import { LangLookups } from "./pipelines/langLookups";
import { LanguageSchema } from "../zod/Language";
import { ObjectIdSchema } from "../zod/ObjectId";
import mongoose from "mongoose";

export class Controller{
    async getTechniques(c: Context){
        try{
            const techniques = await Technique.aggregate([
                {...Lookups.martialArtLookup},
                {...Lookups.gradesLookup},
                {...Lookups.categoriesLookup},
                {...Lookups.tagsLookup},
                {...Lookups.videosLookup},
                {
                    $project: {
                        name: 1,
                        languages: 1,
                        difficulty: 1,
                        "martialArts._id": 1,
                        "martialArts.name": 1,
                        "martialArts.languages": 1,
                        "grade._id": 1,
                        "grade.name": 1,
                        "grade.languages": 1,
                        "category._id": 1,
                        "category.name": 1,
                        "category.languages": 1,
                        "tags._id": 1,
                        "tags.name": 1,
                        "tags.languages": 1,
                        "videos._id": 1,
                        "videos.name": 1,
                        "videos.url": 1
                    }
                }
            ]);

            return c.json({message: "Techniques get", techniques: techniques})
        }catch(e: any){
            return c.json({message: e.message}, 400)
        }
    }

    async getLanguageTechniques(c: Context){
        const language = c.req.param("lang");

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const techniques = await Technique.aggregate([
                {...Lookups.martialArtLookup},
                {...Lookups.gradesLookup},
                {...Lookups.categoriesLookup},
                {...Lookups.tagsLookup},
                {...Lookups.videosLookup},
                {
                    $project: {
                        name: 1,
                        languages: 1,
                        difficulty: 1,
                        "martialArts._id": 1,
                        "martialArts.name": 1,
                        "martialArts.languages": 1,
                        "grade._id": 1,
                        "grade.name": 1,
                        "grade.languages": 1,
                        "category._id": 1,
                        "category.name": 1,
                        "category.languages": 1,
                        "tags._id": 1,
                        "tags.name": 1,
                        "tags.languages": 1,
                        "videos._id": 1,
                        "videos.name": 1,
                        "videos.languages": 1,
                        "videos.url": 1
                    }
                }
            ]);

            const techniquesFormat = techniques.map((technique) => {
                const lang = technique.languages.find((l: any) => l.language === language);
                const martialArts = technique.martialArts.filter((ma: any) => ma.languages.find((l: any) => l.language === language));
                const grade = technique.grade.filter((g: any) => g.languages.find((l: any) => l.language === language));
                const category = technique.category.filter((c: any) => c.languages.find((l: any) => l.language === language));
                const tags = technique.tags.filter((t: any) => t.languages.find((l: any) => l.language === language));
                const videos = technique.videos.filter((v: any) => v.languages.find((l: any) => l.language === language));

                return {
                    id: technique._id,
                    name: lang ? lang.name : technique.name,
                    difficulty: technique.difficulty,
                    martialArts: martialArts.map((ma: any) => ({ id: ma._id, name: ma.name })),
                    grade: grade.map((g: any) => ({id: g._id, name: g.name})),
                    category: category.map((c: any) => ({id: c._id, name: c.name})),
                    tags: tags.map((t: any) => ({id: t._id, name: t.name})),
                    videos: videos.map((v: any) => ({id: v._id, name: v.name, url: v.url}))
                }
            });
            
            return c.json({message: "Techniques get", techniques: techniquesFormat}, 200)

        }catch(e: any){
            return c.json({message: e.message}, 400)
        }
    }

    async getTechnique(c: Context){
        const id = c.req.param("id");

        try{
            const technique = await Technique.aggregate([
                { $match: { _id: id } },
                { ...Lookups.martialArtLookup },
                { ...Lookups.gradesLookup },
                { ...Lookups.categoriesLookup },
                { ...Lookups.tagsLookup },
                { ...Lookups.videosLookup },
                {
                    $project: {
                        name: 1,
                        languages: 1,
                        difficulty: 1,
                        videos: 1,
                        "martialArts._id": 1,
                        "martialArts.name": 1,
                        "grade._id": 1,
                        "grade.name": 1,
                        "category._id": 1,
                        "category.name": 1,
                        "tags._id": 1,
                        "tags.name": 1
                    }
                }
            ]);

            return c.json({ message: "Technique get", technique: technique });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getLanguageTechnique(c: Context){
        const id = c.req.param("id");
        const language = c.req.param("lang");

        try{
            const technique = await Technique.aggregate([
                {$match: { _id: id }},
                {...LangLookups.getMartialArtLangLookup(language)},
                {...LangLookups.getGradesLangLookup(language)},
                {...LangLookups.getCategoriesLangLookup(language)},
                {...LangLookups.getTagsLangLookup(language)},
                {...LangLookups.getVideosLangLookup(language)},
                {
                    $project: {
                        name: 1,
                        languages: 1,
                        difficulty: 1,
                        videos: 1,
                        "martialArts._id": 1,
                        "martialArts.name": 1,
                        "grade._id": 1,
                        "grade.name": 1,
                        "category._id": 1,
                        "category.name": 1,
                        "tags._id": 1,
                        "tags.name": 1
                    }
                }
            ]);

            return c.json({ message: "Technique get", technique: technique });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getTechniquesByMartialArt(c: Context){
        const martialArt = c.req.param("art");
        const language = c.req.param("lang");

        const parseId = ObjectIdSchema.safeParse(martialArt);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const techniques = await Technique.aggregate([
                { $match: { martialArts: new mongoose.Types.ObjectId(martialArt) } },
                { ...Lookups.martialArtLookup },
                { ...Lookups.gradesLookup },
                { ...Lookups.categoriesLookup },
                { ...Lookups.tagsLookup },
                { ...Lookups.videosLookup },
                {
                    $project: {
                        name: 1,
                        languages: 1,
                        difficulty: 1,
                        "martialArts._id": 1,
                        "martialArts.name": 1,
                        "martialArts.languages": 1,
                        "grade._id": 1,
                        "grade.name": 1,
                        "grade.languages": 1,
                        "category._id": 1,
                        "category.name": 1,
                        "category.languages": 1,
                        "tags._id": 1,
                        "tags.name": 1,
                        "tags.languages": 1,
                        "videos._id": 1,
                        "videos.name": 1,
                        "videos.url": 1,
                        "videos.languages": 1
                    }
                }
            ]);

            const techniquesFormat = techniques.map((technique) => {
                const lang = technique.languages.find((l: any) => l.language === language);
                const martialArts = technique.martialArts.filter((ma: any) => ma.languages.find((l: any) => l.language === language));
                const grade = technique.grade.filter((g: any) => g.languages.find((l: any) => l.language === language));
                const category = technique.category.filter((c: any) => c.languages.find((l: any) => l.language === language));
                const tags = technique.tags.filter((t: any) => t.languages.find((l: any) => l.language === language));
                const videos = technique.videos.filter((v: any) => v.languages.find((l: any) => l.language === language));

                return {
                    id: technique._id,
                    name: lang ? lang.name : technique.name,
                    difficulty: technique.difficulty,
                    martialArts: martialArts.map((ma: any) => ({ id: ma._id, name: ma.name })),
                    grade: grade.map((g: any) => ({id: g._id, name: g.name})),
                    category: category.map((c: any) => ({id: c._id, name: c.name})),
                    tags: tags.map((t: any) => ({id: t._id, name: t.name})),
                    videos: videos.map((v: any) => ({id: v._id, name: v.name, url: v.url}))
                }
            });

            return c.json({ message: "Techniques get", techniques: techniquesFormat });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async postTechnique(c: Context){
        const body = await c.req.json();

        try{
            const technique = new Technique(body);
            await technique.save();

            return c.json({ message: "New technique created", technique: technique }, 201);
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async updateTechnique(c: Context){
        const id = c.req.param("id");
        const body = await c.req.json();
        
        try{
            const technique = await Technique.findByIdAndUpdate(id, body, {new: true});
            return c.json({ message: "Technique updated", technique: technique });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async deleteTechnique(c: Context){
        const id = c.req.param("id");
        
        try{
            const technique = await Technique.findByIdAndDelete(id);
            return c.json({ message: "Technique deleted", technique: technique });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }
}