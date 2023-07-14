import dotenv from 'dotenv';
import express, {Express} from 'express';
import { SimLoad } from 'types';
import controller from './controller/PromoScraper'
import {redis} from './lib/redis';

const app : Express = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/sim', async(req, res) => {
  redis.get('sim', async (err, cacheData) => {
    if (err) throw err;
    if(cacheData) {
      res.send(JSON.parse(cacheData));
    } else {
      const telcoLoad: SimLoad[] = [];
      const smart = await controller.scrapeSmartPromos();
      const sun = await controller.scrapeSunPromos();
      const tnt = await controller.scrapeTNTPromos();
      const globe = await controller.scrapeGlobePromos();
      const tm = await controller.scrapeTMPromos();

      telcoLoad.push(...smart, ...sun, ...tnt, ...globe, ...tm);

      redis.setex('sim', 3600, JSON.stringify(telcoLoad));
      res.send(telcoLoad);
    }
  })
});

app.listen(process.env.PORT, () => console.log(`Server Running on PORT ${process.env.PORT}`))