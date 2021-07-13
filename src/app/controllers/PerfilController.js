import * as Yup from 'yup';

import bcrypt from 'bcryptjs';

import User from '../models/User';

import config from '../../config/config';

class PerfilController{
    async show(req,res){
        User.findOne({_id: req.userId}, '_id name email createdAt updatedAt fileName').then(
            (user)=>{
            var url = config.url+"/files/users/"+ user.fileName;
            return res.json({
                error:false,
                user:user,
                url: url

            });
        }).catch((erro)=>{
            return res.status(400).json({
                error:true,
                code:115,
                message: "Erro: Perfil não encontrado."
            });
        });
    };
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Dados do formulário errado!"
            });
        };

        const { email } = req.body;

        const usuarioExiste = await User.findOne({ _id: req.userId});

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário nao encontrado!"
            });
        };

        if (email != usuarioExiste.email){
            const emailExiste = await User.findOne({email});
            if(emailExiste){
                return res.status(400).json({
                error:true,
                code:110,
                message: "Erro: este email já esta cadastrado!"
            });
            };
        };

        var dados= req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: req.userId}, dados, (err)=>{
            if (err) return res.status(400).json({
                error:true,
                code:111,
                message:"Erro: Usuário não foi editado!"
            });
            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });

        
    };
};
export default new PerfilController();