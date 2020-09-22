import {Express} from 'express';
import healthController from './controllers/health.controller'

const routes = (app:Express):void => {
    app.use('/v1/health', healthController)
};

export default routes;