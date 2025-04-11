import { Context } from "hono";
import { Category } from "../schemas/Category";
import { LanguageSchema } from "../zod/Language";
import { ObjectIdSchema } from "../zod/ObjectId";
import { CategorySchema } from "../zod/Category";

export class Controller {
    async getCategories(c: Context){
        try{
            const categories = await Category.find({});
            return c.json({ message: "Categories get", categories: categories });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getLanguageCategories(c: Context){
        const language = c.req.param("lang");

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const categories = await Category.find({});

            const langCategories = categories.map((cat) => {
                const lang = cat.languages.find((l) => l.language === language);

                return {
                    id: cat._id,
                    name: lang ? lang.name : cat.name,
                };
            });

            return c.json({ message: "Categories get", categories: langCategories });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getCategory(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        try{
            const category = await Category.findById(id);
            return c.json({ message: "Category get", category: category });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getLanguageCategory(c: Context){
        const id = c.req.param("id");
        const language = c.req.param("lang");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseLanguage = LanguageSchema.safeParse(language);
        if(!parseLanguage.success) return c.json({message: parseLanguage.error?.issues[0]?.message}, 400);

        try{
            const category = await Category.findById(id);
            
            if(!category) return c.json({ message: "Category not found" }, 404);

            const langCategory = category.languages.find((l) => l.language === language) || { id: category._id, name: category.name };

            return c.json({ message: "Category get", category: {id: langCategory.id, name: langCategory.name} });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async postCategory(c: Context){
        const body = await c.req.json();

        const parseBody = CategorySchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);

        try{
            const category = new Category(body);
            await category.save();  

            return c.json({ message: "New category created", category: category }, 201);
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async updateCategory(c: Context){
        const id = c.req.param("id");
        const body = await c.req.json();

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseBody = CategorySchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        
        try{
            const category = await Category.findByIdAndUpdate(id, body, {new: true});
            return c.json({ message: "Category updated", category: category });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async deleteCategory(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const category = await Category.findByIdAndDelete(id);
            return c.json({ message: "Category deleted", category: category });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }
}