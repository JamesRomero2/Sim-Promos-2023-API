import express, {Express} from 'express';
import SimController from '../controller/SimController'

const app: Express = express();

app.get('/', SimController.getAllPromo);
app.get('/smart', SimController.getSmartPromo);
app.get('/sun', SimController.getSunPromo);
app.get('/tnt', SimController.getTNTPromo);
app.get('/globe', SimController.getGlobePromo);
app.get('/tm', SimController.getTMPromo);

export = app