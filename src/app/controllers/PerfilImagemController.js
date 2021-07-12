import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update (req, res){
        return res.json({
            error: false,
            messagem: "Imagem do perfil editado com sucesso!"
        });
    }
};

export default new PerfilImagemController();