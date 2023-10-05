const { v4: uuidv4 } = require('uuid');
const Purchase = require('../model/purchase.model');
const Product = require('../model/product.model');
const Users = require('../model/users.model');
const purchaseFinder = require('./utilities/purchaseFinder');

class CustomerPurchase {

    /**
     * Obtiene un una compra por numero de Id.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async createPurchase(req, res) {
        const dataPurchase = req.body;
        await Purchase.sync();
        const existingUser = await Users.findOne({
            where: {
                Username: dataPurchase.Username,
            }
        });
        if(dataPurchase.purchase && dataPurchase.purchase.length > 0 && existingUser) {
            const purchaseId = uuidv4();

            dataPurchase.purchase.forEach(async (item) => {
                console.log(item.nombre, item.cantidad, purchaseId, dataPurchase.Username)
                await Purchase.create({
                    Product_name: item.nombre,
                    Quantity: item.cantidad,
                    Purchase_Id: purchaseId,
                    Username: dataPurchase.Username
                });
            });
            res.status(200).json({
                ok: true,
                status: 200
            });
        } else {
            res.status(400).json({
                message: 'La petición no es correcta'
            })
        };
    };

    /**
     * Obtiene un una compra por numero de Id.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async getPurchaseById(req, res) {
        const purchaseId = req.params.purchaseId;
        const purchaseResponse = await Purchase.findAll({
            where: {
                Purchase_Id: purchaseId,
            },
        });
        if(purchaseResponse) {
            res.status(200).json({
                ok: true,
                status: 200,
                body: purchaseAsFactura
            });
        } else {
            res.status(400).json({
                message: 'La compra no fue encontrada con ese id'
            })
        }
    }

        /**
     * Obtiene un una compra por numero de Id.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async getAllPurchases(req, res) {
        const purchaseResponse = await Purchase.findAll();
        if(purchaseResponse && purchaseResponse.length > 0) {
            
            res.status(200).json({
                ok: true,
                status: 200,
                body: groupedPurchases
            });
        } else {
            res.status(404).json({
                message: 'No se encontraron compras en la base de datos'
            })
        };
    };
};

module.exports = new CustomerPurchase;