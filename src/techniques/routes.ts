import { Context, Hono } from "hono";
import { Controller } from "./controller";

const routes = new Hono();
const controller = new Controller();

routes.get((c: Context) => controller.getTechniques(c));
routes.get("/lang/:lang", (c: Context) => controller.getLanguageTechniques(c));
routes.get("/:id", (c: Context) => controller.getTechnique(c));
routes.get("/lang/:lang/:id", (c: Context) => controller.getLanguageTechnique(c));
routes.get("/lang/:lang/art/:art", (c: Context) => controller.getTechniquesByMartialArt(c));
routes.post("/", (c: Context) => controller.postTechnique(c));
routes.put("/:id", (c: Context) => controller.updateTechnique(c));
routes.delete("/:id", (c: Context) => controller.deleteTechnique(c));

export { routes };