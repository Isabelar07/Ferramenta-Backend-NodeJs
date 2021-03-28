import { Router } from "express";
import tagRoutes from "../../modules/tags/routes/tag.routes";
import toolsRoutes from "../../modules/tools/routes/tools.routes";

const routes = Router();

routes.use('/tag', tagRoutes);
routes.use('/tools', toolsRoutes)

export default routes;