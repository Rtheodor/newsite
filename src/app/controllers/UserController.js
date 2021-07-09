import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await User.paginate({}, { select: '_id name email', page, limit }).then((users) => {
            return res.json({
                error: false,
                users: users
            })
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possivel executar a solicitação!"
            })
        })
    }

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id name email createdAt updatedAt').then((user) => {
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
                .max(10),
        });
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados invalidos!"
            });
        };

        const emailExiste = await User.findOne({ email: req.body.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este email já está cadastrado!"
            });

        };

        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 6);


        const user = await User.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            });
            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            })
        });

    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
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

        const { _id, email } = req.body;

        const usuarioExiste = await User.findOne({ _id });

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

        await User.updateOne({_id: dados._id}, dados, (err)=>{
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


    async delete(req, res) {
        const usuarioExiste = await User.findOne({ _id: req.params.id });
       
        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Usuário não encontrado."
            })
        }

        const user = await User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi apagado com sucesso!"
            })
        });

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    };
}

export default new UserController();