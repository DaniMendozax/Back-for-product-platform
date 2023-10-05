const Users = require('../model/users.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');

/**
 * @class
 * @classdesc Controlador de autenticación de usuarios.
 */

class LoginController {

     /**
     * Autentica a un usuario y emite un token de acceso si las credenciales son válidas.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP que contiene las credenciales del usuario.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON con un mensaje de éxito y un token de acceso si la autenticación es exitosa.
     *
     * @throws {JSON} Respuesta JSON con un mensaje de error si las credenciales son incorrectas o si el usuario no se encuentra.

     */
    async postLogin(req, res) {
        const dataLogin = req.body;

        const existingUser = await Users.findOne({
            where: {
                Username: dataLogin.Username,
            }
        });

        if (existingUser) {

            const isPasswordValid = await bcrypt.compare(dataLogin.Password, existingUser.Password);

            if (isPasswordValid) {
                const payload = {
                    type_of_person: existingUser.type_of_person,
                    check: true
                };
                const token = jwt.sign(payload, keys.key, {
                    expiresIn: '1d'
                });
                res.status(200).json({
                    message: '¡AUTENTICACION EXITOSA!',
                    token: token,
                });
                console.log(payload)

            } else {
                res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
            }

        } else {
            res.status(404).json({
                message: 'Usuario incorrecto'
            });
        }
    }


}

module.exports = new LoginController();