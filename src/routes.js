/*import {Router} from 'express';

import  mongoose  from  'mongoose';

import User from './app/models/User';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);


routes.get('/', async(req, res,) =>{
    await User.create({
        nome: 'Rafael',
        email: 'rafaeldacunhatheodoro@gmail.com',
        senha: '123456'
    }, function(err, small){
        if(err) return res.status(400).json({error: "Erro: Usuário não foi cadastrado com sucesso!"});
        return res.status(200).json({error: "Usuário cadastrado com sucesso!"});
    });
    
})*/

//module.exports = routes;

/*export default routes;*/

import { Router } from 'express';
import mongoose from 'mongoose';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

/*routes.get('/', async (req, res) => {
    await User.create({
        nome: 'Cesar3',
        email: 'cesar@celke.com.br',
        senha: '123456'
    }, function(err, small){
        if(err) return res.status(400).json({error: "Erro: Usuário não foi cadstrado com sucesso!"});

        return res.status(200).json({error: "Usuário cadastrado com sucesso!"});
    });
    
})*/

//module.exports = routes;
export default routes;