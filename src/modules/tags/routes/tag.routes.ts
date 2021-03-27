import { Router } from 'express';
import { TagController } from '../controller/TagController';

const tagRoutes = Router();
const tag = new TagController();

tagRoutes.post('/create', tag.create);

export default tagRoutes;