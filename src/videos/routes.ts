import { Context, Hono } from "hono"
import { Controller } from "./controller"

const routes = new Hono()
const controller = new Controller()

routes.get("/", (c: Context) => controller.getVideos(c))
routes.get("/lang/:lang", (c: Context) => controller.getLanguageVideos(c))
routes.get("/:id", (c: Context) => controller.getVideo(c))
routes.get("/lang/:lang/:id", (c: Context) => controller.getLanguageVideo(c))
routes.post("/", (c: Context) => controller.postVideo(c))
routes.put("/:id", (c: Context) => controller.updateVideo(c))
routes.delete("/:id", (c: Context) => controller.deleteVideo(c))

export { routes };