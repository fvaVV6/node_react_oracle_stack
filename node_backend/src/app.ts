import express, {Request, Response} from 'express';
import { TestDataRoutes } from './routes/test_data.routes';
import cors from 'cors'; 
import config from './config/config';


const app = express();
const testDataRoutes = new TestDataRoutes();

app.use(express.json());
app.use(cors());

app.get('/', (req : Request, res: Response) => {
    res.send('Hello World!');
});

testDataRoutes.register(app);

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});

