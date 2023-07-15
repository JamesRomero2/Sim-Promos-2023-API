import dotenv from 'dotenv';
import express, {Express} from 'express';
import simRoutes from './routes/SimRoutes';
import { Request, Response, NextFunction } from 'express';

const app: Express = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json("Go to /sim route to get all data | To go to different telco use the route /sim/[telco] | Ex. http://localhost:8888/sim/sun"))

app.use('/sim', simRoutes);

app.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({message: 'pong'}));

app.listen(process.env.PORT, () => console.log(`Server Running on PORT ${process.env.PORT}`))