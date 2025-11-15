import jwt from 'jsonwebtoken'
import {ServerError} from '../error.js'
import ENVIRONMENT from '../config/environment.config.js'

function authMiddleware(req, res, next) {
    try{
        const auth_header = req.headers.authorization
        if(!auth_header){
            throw new ServerError(401, 'No hay header de autorizacion ')
        }

        const auth_token = auth_header.split(' ')[1]

        if(!auth_token){
            throw new ServerError(401, 'No hay token de autorizacion ')
        }

        const user_session_data = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET)


        //HOT POINT: Guardamos los datos del toekn dentro de la request
        req.user=user_session_data
        next()
    }
    catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            res.status(400).json({
                ok:false,
                message:'token invalido',
                status:400
            })
        }
        else if(error instanceof jwt.TokenExpiredError){
            res.status(401).json({
                ok:false,
                message:'token expirado',
                status:401
            })
        }
        else{
            console.error(
                'ERROR AL REGISTRAR', error
            )
            res.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
                status: 500
            })
        }
    }
}

export default authMiddleware