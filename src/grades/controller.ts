import { Grade } from "../schemas/Grade";
import { Context } from "hono";
import { ObjectIdSchema } from "../zod/ObjectId";
import { GradeSchema } from "../zod/Grade";

export class Controller {
    async getGrades(c: Context){
        try{
            const grades = await Grade.find({});
            return c.json({ message: "Grades get", grades: grades });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getArtGrades(c: Context){
        const art = c.req.param("art");

        const parseArt = ObjectIdSchema.safeParse(art);
        if(!parseArt.success) return c.json({message: parseArt.error?.issues[0]?.message}, 400);

        try{
            const grades = await Grade.find({ martialArt: art });
            return c.json({ message: "Grades get", grades: grades });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async getGrade(c: Context){
        const id = c.req.param("id");

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        try{
            const grade = await Grade.findById(id);
            return c.json({ message: "Grade get", grade: grade });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async postGrade(c: Context){
        const body = await c.req.json();

        const parseBody = GradeSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        const gradeData = parseBody.data;

        try{
            const grade = new Grade(gradeData);
            await grade.save();

            return c.json({ message: "New grade created", grade: grade }, 201);
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async updateGrade(c: Context){
        const id = c.req.param("id");
        const body = await c.req.json();

        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);

        const parseBody = GradeSchema.safeParse(body);
        if(!parseBody.success) return c.json({message: parseBody.error?.issues[0]?.message}, 400);
        const gradeData = parseBody.data;
        
        try{
            const grade = await Grade.findByIdAndUpdate(id, gradeData, {new: true});
            return c.json({ message: "Grade updated", grade: grade });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }

    async deleteGrade(c: Context){
        const id = c.req.param("id");
        
        const parseId = ObjectIdSchema.safeParse(id);
        if(!parseId.success) return c.json({message: parseId.error?.issues[0]?.message}, 400);
        
        try{
            const grade = await Grade.findByIdAndDelete(id);
            return c.json({ message: "Grade deleted", grade: grade });
        }catch(e: any){
            return c.json({ message: e.message }, 400);
        }
    }
}