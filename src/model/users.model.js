const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

/**
 * Modelo de Usuario para representar usuarios en la base de datos.
 */
class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        /**
         * ID único generado automáticamente para el usuario.
         */
    },
    Full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        /**
         * Nombre completo del usuario.
         */
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        /**
         * Nombre de usuario del usuario.
         */
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        /**
         * Dirección de correo electrónico del usuario.
         * Debe ser única y tener formato de correo electrónico válido.
         */
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        /**
         * Establece y almacena la contraseña del usuario después de cifrarla.
         * @param {string} value - Contraseña sin cifrar proporcionada por el usuario.
         */
        set(value) {
            if (value) {
                const saltRounds = 10;
                const hashedPassword = bcrypt.hashSync(value, saltRounds);
                this.setDataValue('Password', hashedPassword);
            }
        }
    },
    type_of_person: {
        type: DataTypes.ENUM('Administrador', 'Cliente'),
        allowNull: false,
        /**
         * Tipo de usuario, puede ser "Administrador" o "Cliente".
         */
    }
}, {
    sequelize,
    modelName: "User"
});

module.exports = User;
