//const express = require("express");
//const routes = require('./routes');

import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';

import './config/conexao';


class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use('/files',
        express.static(path.resolve(__dirname, "..", "tmp", "upload"))
        );
        this.app.use((req,res, next)=>{
            res.header("acess-Control-Allow-Origin","*");
            res.header("Acess-Control-Allow-Methods",'GET,PUT,POST,DELETE');
            res.header("Acess-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
            this.app.use(cors());
            next();    
        })
        
    }
    routes(){
        this.app.use(routes);

    }
}

//module.exports = new App().app;

export default new App().app;
