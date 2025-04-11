import { Context, Hono } from "hono"
import { Controller } from "./controller"

const routes = new Hono()
const controller = new Controller()

routes.get("/", (c: Context) => controller.getGrades(c))
routes.get("/art/:art", (c: Context) => controller.getArtGrades(c))
routes.get("/:id", (c: Context) => controller.getGrade(c))
routes.post("/", (c: Context) => controller.postGrade(c))
routes.put("/:id", (c: Context) => controller.updateGrade(c))
routes.delete("/:id", (c: Context) => controller.deleteGrade(c))

export { routes }