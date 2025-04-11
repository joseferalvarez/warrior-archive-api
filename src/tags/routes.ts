import { Context, Hono } from "hono";
import { Controller } from "./controller";

const routes = new Hono();
const controller = new Controller();

routes.get("/", (c: Context) => controller.getTags(c));
routes.get("/lang/:lang", (c: Context) => controller.getLanguageTags(c));
routes.get("/:id", (c: Context) => controller.getTag(c));
routes.get("/lang/:lang/:id", (c: Context) => controller.getLanguageTag(c));
routes.post("/", (c: Context) => controller.postTag(c));
routes.put("/:id", (c: Context) => controller.updateTag(c));
routes.delete("/:id", (c: Context) => controller.deleteTag(c));

export { routes };