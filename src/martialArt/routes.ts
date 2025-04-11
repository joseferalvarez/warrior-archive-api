import { Context, Hono } from "hono";
import { Controller } from "./controller";

const routes = new Hono()
const controller = new Controller()

routes.get("/", (c: Context) => controller.getMartialArts(c))
routes.get("/lang/:lang", (c: Context) => controller.getLanguageMartialArts(c))
routes.get("/:id", (c: Context) => controller.getMartialArt(c))
routes.get("/lang/:lang/:id", (c: Context) => controller.getLanguageMartialArt(c))
routes.post("/", (c: Context) => controller.postMartialArt(c))
routes.put("/:id", (c: Context) => controller.updateMartialArt(c))
routes.delete("/:id", (c: Context) => controller.deleteMartialArt(c))

export { routes }