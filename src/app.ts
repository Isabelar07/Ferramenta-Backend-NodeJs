import express, {Express} from 'express';
import cors from 'cors';
import routes from './shared/routes';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

export default app;
