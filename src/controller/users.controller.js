const { Op } = require("sequelize");
const Users = require("../model/users.model");

class UserController {

    async getAllUsers(req, res) {
        const users = await Users.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: users
        })
    };

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