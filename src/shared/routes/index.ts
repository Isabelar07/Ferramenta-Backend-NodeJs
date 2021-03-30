import { Router } from "express";
import toolsRoutes from "../../modules/tools/routes/tools.routes";

const routes = Router();

routes.use('/', toolsRoutes)

export default routes;