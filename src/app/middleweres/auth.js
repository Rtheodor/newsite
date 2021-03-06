import jwt from 'jsonwebtoken';
import { promisify} from 'util';
import configAuth from '../../config/auth';

export default async (req, res, next) => {
    const authHeader =req.headers.authorization;
    
    if(!authHeader){
        return res.status(400).json({
            error:true,
            code:130,
            message: "Erro: token não encontrado!"
        });
    };
    const [, token] = authHeader.split(' ');
    try{ 
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        req.userId = decoded.id;
        return next();
    }catch(err){
        return res.status(400).json({
            error:true,
            code:130,
            message: "Erro: token não encontrado!"
        });
    };

};
