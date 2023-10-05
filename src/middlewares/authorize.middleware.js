const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../model/users.model');

/**
 * @api {middleware} authorize
 * @apiName Authorization Middleware
 * @apiGroup Authentication
 *
 * @apiDescription Middleware que verifica la autorización del token de acceso.
 *
 * @apiHeader {String} x-access-token Token de acceso proporcionado en el encabezado de la solicitud.
 * @apiHeader {String} authorization Token de acceso proporcionado en el encabezado de la solicitud.
 *
 * @apiSuccess (Success 200) {String} message Éxito en la autorización.
 *
 * @apiError (Error 401) {String} message Token de Acceso no proporcionado.
 * @apiError (Error 401) {String} message Token de Acceso no válido.
 * @apiError (Error 403) {String} message Acceso denegado. Debes ser administrador.
 * @apiError (Error 500) {String} message Error en el servidor.
 *
 *     
 */

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
