//const {Router} = require('express');

import {Router} from 'express';

import  mongoose  from  'mongoose';



//Conexão com banco de dados
mongoose.connect('mongodb://localhost/rafael', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
    console.log("Conexão com sucesso.")
}).catch((erro)=>{
    console.log("erro nao foi conectado" + erro);
});

const routes = new Router();

routes.get('/contatos', (req, res,) =>{
    res.send("Rafael");
})

//module.exports = routes;

export default routes;