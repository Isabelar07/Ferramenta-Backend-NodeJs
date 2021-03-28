import { Router } from 'express';
import { ToolsController } from '../controller/ToolsController';

const toolsRoutes = Router();
const tools = new ToolsController();

toolsRoutes.post('/', tools.create);

export default toolsRoutes;