const { Op } = require("sequelize");
const Users = require("../model/users.model");

/**
 * @class
 * @classdesc Controlador de usuarios.
 */

class UserController {

    /**
     * Obtiene todos los usuarios.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que contiene una lista de todos los usuarios.
     */

    async getAllUsers(req, res) {
        const users = await Users.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: users
        })
    };

    /**
     * Obtiene un usuario por su ID.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP que contiene el ID del usuario.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que contiene la información del usuario encontrado.
     */

    async getUserById(req, res) {
        const id = req.params.id;
        const user = await Users.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            body: user,
        });
    };
        /**
     * Crea un nuevo usuario.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP que contiene los datos del nuevo usuario.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que indica si el usuario se ha creado con éxito.
     *
     * @throws {JSON} Respuesta JSON con un mensaje de error si el usuario ya existe con el mismo correo electrónico o nombre de usuario.
     */

    async createUser(req, res) {
        const dataUsers = req.body;

        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { Email: dataUsers.Email },
                    { Username: dataUsers.Username }
                ]
            }
        });

        if (existingUser) {
            res.status(400).json({
                ok: false,
                status: 400,
                message: 'El usuario ya existe. No se puede crear uno nuevo con el mismo correo electrónico o nombre de usuario.'
            })
        }

        await Users.sync();
        const createUser = await Users.create({
            Full_name: dataUsers.Full_name,
            Username: dataUsers.Username,
            Email: dataUsers.Email,
            Password: dataUsers.Password,
            type_of_person: dataUsers.type_of_person
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Created Product',
        });
    }

    /**
     * Actualiza un usuario por su ID.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP que contiene el ID del usuario y los datos a actualizar.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que indica si el usuario se ha actualizado con éxito.
     */

    async updateUsersByYd(req, res) {
        const id = req.params.id;
        const dataProducts = req.body;
        const updateUsers = await Users.update(
            {
                Username: dataProducts.Username,
                Password: dataProducts.Password
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Updated Product',
            body: updateUsers,
        });
    }

    /**
     * Elimina un usuario por su ID.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP que contiene el ID del usuario a eliminar.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que indica si el usuario se ha eliminado con éxito.
     */

    async deleteUserById(req, res) {
        const id = req.params.id;
        const deleteProduct = await Users.destroy({
            where: {
                id: id,
            },
        });
        res.status(204).json({
            ok: true,
            status: 204,
            message: 'Deleted Product',
        });
    }

}

module.exports = new UserController();