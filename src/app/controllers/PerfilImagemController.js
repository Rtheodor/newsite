import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update (req, res){
        console.log(req.file);
        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await User.findOne({ _id: req.userId}, '_id fileName').then((user)=>
        {
            console.log(user);
        }).catch((err)=>{
            return res.status(400).json({
                error:true,
                code:128,
                message:"Erro: Não foi possivel executar a solicitação!"
            });
        })

        await User.updateOne({ _id: req.userId}, dadosImagem, (err)=>{
            if(err) return res.status(400).json({
                error:true,
                code: 129,
                messagem: "Erro: Imagem do perfil não editado com sucesso!" 
            });
        });
        
        console.log(dadosImagem)
        return res.json({
            error: false,
            messagem: "Imagem do perfil editado com sucesso!"
        });
    }
};

export default new PerfilImagemController();