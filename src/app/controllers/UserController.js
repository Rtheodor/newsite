import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
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
                .max(6),
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Dados invalidos!"
            });
        }

        const emailExiste = await User.findOne({ email: req.body.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este email já está cadastrado!"
            });

        }

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
        })
    }
}

export default new UserController();