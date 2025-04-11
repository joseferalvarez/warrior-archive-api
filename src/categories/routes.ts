import { Context, Hono } from "hono"
import { Controller } from "./controller"

const routes = new Hono()
const controller = new Controller()

routes.get("/", (c: Context) => controller.getCategories(c))
routes.get("/lang/:lang", (c: Context) => controller.getLanguageCategories(c))
routes.get("/:id", (c: Context) => controller.getCategory(c))
routes.get("/lang/:lang/:id", (c: Context) => controller.getLanguageCategory(c))
routes.post("/", (c: Context) => controller.postCategory(c))
routes.put("/:id", (c: Context) => controller.updateCategory(c))
routes.delete("/:id", (c: Context) => controller.deleteCategory(c))

export { routes };