const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../model/users.model');


async function authorize(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    try {
        if (!token) {
            return res.status(401).json({
                message: 'Token de Acceso no proporcionado'
            });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        if (token) {
            jwt.verify(token, keys.key, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token de Acceso no válido'
                    });
                }

                if (decoded.type_of_person !== 'Administrador') {
                    return res.status(403).json({
                        message: 'Acceso denegado. Debes ser administrador'
                    });
                }
                next();
            });}

    }catch(e){
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
}

module.exports = authorize;
