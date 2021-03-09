//const {Router} = require('express');

import {Router} from 'express';

const routes = new Router();

routes.get('/contatos', (req, res,) =>{
    res.send("Naruto, Hashirama, Minato");
})

//module.exports = routes;

export default routes;