const router = require("express").Router();
const UserController = require('../controller/users.controller')

/**
 * Ruta para obtener todos los usuarios.
 */
router.get('/users', UserController.getAllUsers);

/**
 * Ruta para crear un nuevo usuario.
 */
router.post('/users', UserController.createUser);

/**
 * Ruta para actualizar un usuario por su ID.
 * @param {string} id - El ID dels usuario que se desea actualizar.
 */
router.patch('/users/:id', UserController.updateUsersByYd);

/**
 * Ruta para eliminar un usuario por su ID.
 * @param {string} id - El ID del usuario que se desea eliminar.
 */
router.delete('/users/:id', UserController.deleteUserById);

module.exports = router;
