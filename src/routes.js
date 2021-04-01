import {Router} from 'express';

import  mongoose  from  'mongoose';

import UserController from './app/controllers/UserController';

import LoginController from './app/controllers/LoginController';


const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.post('/login', LoginController.store);





//module.exports = routes;

export default routes;
