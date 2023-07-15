import { Request, Response, NextFunction } from 'express';
import PromoScraper from './PromoScraper';
import { redis } from '../lib/redis';
import { SimLoad } from 'types';

const getAllPromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('sim', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeAllPromo();
      redis.setex('sim', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

const getSmartPromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('smart', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeSmartPromos();
      redis.setex('smart', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

const getSunPromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('sun', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeSunPromos();
      redis.setex('sun', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

const getTNTPromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('tnt', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeTNTPromos();
      redis.setex('tnt', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

const getGlobePromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('globe', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeGlobePromos();
      redis.setex('globe', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

const getTMPromo = (req: Request, res: Response, next: NextFunction) => {
  redis.get('tm', async (err: Error, cacheData: string) => {
    if (err) throw err;
    if (cacheData) {
      res.status(200).send(JSON.parse(cacheData));
    } else {
      const data: SimLoad[] = await PromoScraper.scrapeTMPromos();
      redis.setex('tm', 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  })
}

export default {
  getAllPromo,
  getSmartPromo,
  getSunPromo,
  getTNTPromo,
  getGlobePromo,
  getTMPromo
}