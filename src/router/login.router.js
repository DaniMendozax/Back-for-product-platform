const router = require("express").Router();
const LoginRouter = require('../controller/login.controller')

/**
 * Ruta para iniciar sesión de usuario.
 * @name POST /login
 * @description Inicia sesión de un usuario.
 * 
 * Consulte el controlador LoginController para obtener detalles sobre la lógica de inicio de sesión.
 */

router.post('/login', LoginRouter.postLogin);

module.exports = router;