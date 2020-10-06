import {Express} from 'express';
import healthController from './controllers/health.controller'
import userController from './controllers/user.controller'
import authController from './controllers/auth.controller'

const routes = (app:Express):void => {
    app.use('/v1/health', healthController)
    app.use('/v1/user', userController)
    app.use('/v1/auth', authController)
};

export default routes;