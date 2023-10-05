const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

/**
 * Modelo de Producto para representar productos en la base de datos.
 */
class Product extends Model {}

Product.init({
    Numero_de_lote: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        /**
         * Número de lote único generado automáticamente.
         */
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        /**
         * Nombre del producto.
         */
    },
    Precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        /**
         * Precio del producto en formato de número flotante.
         */
    },
    Cantidad_disponible: {
        type: DataTypes.INTEGER,
        allowNull: true,
        /**
         * Cantidad disponible del producto (puede ser nulo).
         */
    },
    Fecha_de_ingreso: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        /**
         * Fecha de ingreso del producto (se establece automáticamente a la fecha actual).
         */
    },
}, 
{
    sequelize,
    modelName: "Product"
});

module.exports = Product;
