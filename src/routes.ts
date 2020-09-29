import {Express} from 'express';
import healthController from './controllers/health.controller'
import userController from './controllers/user.controller'

const routes = (app:Express):void => {
    app.use('/v1/health', healthController)
    app.use('/v1/user', userController)
};

export default routes;