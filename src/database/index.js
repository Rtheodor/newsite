import mongoose from 'mongoose';

class DataBase{
    constructor(){
        this.mongoDataBase();

    }
    mongoDataBase(){
        mongoose.connect('mongodb://localhost/rafael', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
    console.log("Sucesso ao conectar com MongoDB.")
}).catch((erro)=>{
    console.log("erro ao conectar no MongoDB" + erro);
});
    }
}

export default new DataBase();