import { Router } from 'express';
import { ToolsController } from '../controller/ToolsController';

const toolsRoutes = Router();
const tools = new ToolsController();

toolsRoutes.post('/tools', tools.create);
toolsRoutes.get('/', tools.get);

export default toolsRoutes;