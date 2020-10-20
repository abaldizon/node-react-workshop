import {Express} from 'express';
import healthController from './controllers/health.controller'
import userController from './controllers/user.controller'
import authController from './controllers/auth.controller'
import contactsController from './controllers/contacts.controller'

const routes = (app:Express):void => {
    app.use('/v1/health', healthController)
    app.use('/v1/user', userController)
    app.use('/v1/auth', authController)
    app.use('/v1/contact', contactsController)
};

export default routes;