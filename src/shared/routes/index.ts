import { Router } from "express";
import tagRoutes from "../../modules/tags/routes/tag.routes";

const routes = Router();

routes.use('/tag', tagRoutes);

export default routes;