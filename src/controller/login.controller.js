const Users = require('../model/users.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');

class LoginController {

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