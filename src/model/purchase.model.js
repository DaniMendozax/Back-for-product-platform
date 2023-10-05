const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db');
const Product = require('./product.model');


/**
 *  Modelo de compras
 */

class Purchase extends Model { }

Purchase.init({
    /**
     * Número de compra único generado automáticamente.
     */
    Purchase_number: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    Username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * Nombre del producto comprado.
     */
    Product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * Cantidad de productos comprados.
     */
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    /**
    * Fecha de la compra (se establece automáticamente a la fecha actual).
    */
    Date_of_purchase: {

        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
    /**
     * Identificador esencial de compra
     */
    Purchase_Id: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: "Purchase"
    }
);


module.exports = Purchase;
