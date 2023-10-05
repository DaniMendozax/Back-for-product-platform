const { v4: uuidv4 } = require('uuid');
const Purchase = require('../model/purchase.model');
const Product = require('../model/product.model');
const Users = require('../model/users.model');
const { purchaseFinder } = require('./utilities/purchaseFinder');

/**
 * @class
 * @classdesc Controlador de compras de clientes.
 */

class CustomerPurchase {

  /**
     * Crea una compra.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que indica el resultado de la creación de la compra.
     *
     * @throws {JSON} Respuesta JSON con un mensaje de error si la petición no es correcta.
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
     * Obtiene una compra por número de ID.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que contiene la compra encontrada.
     *
     * @throws {JSON} Respuesta JSON con un mensaje de error si la compra no fue encontrada con el ID proporcionado.
     * ```
     */
    async getPurchaseById(req, res) {
        const purchaseId = req.params.purchaseId;
        const purchaseAsFactura = await purchaseFinder(purchaseId);
        try {
            await res.status(200).json({
                ok: true,
                status: 200,
                body: purchaseAsFactura
            });
        } catch{
            res.status(400).json({
                message: 'La compra no fue encontrada con ese id'
            })
        }
    }


    /**
     * Obtiene todas las compras.
     * @function
     * @async
     *
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     *
     * @returns {JSON} Respuesta JSON que contiene todas las compras encontradas en la base de datos.
     *
     * @throws {JSON} Respuesta JSON con un mensaje de error si no se encontraron compras en la base de datos.
     */
    async getAllPurchases(req, res) {
        const purchaseResponse = await Purchase.findAll();

        if(purchaseResponse && purchaseResponse.length > 0) {
            const getPurchasIds = purchaseResponse.map((item) => {
                return item.dataValues.Purchase_Id
            })
            const filteredIDs = Array.from(new Set(getPurchasIds));
            const allPurchases = await Promise.all(filteredIDs.map(async item => {
                const purchaseItem = await purchaseFinder(item);
                return purchaseItem
            }))

            res.status(200).json({
                ok: true,
                status: 200,
                body: allPurchases
            });
        } else {
            res.status(404).json({
                message: 'No se encontraron compras en la base de datos'
            })
        };
    };
};

module.exports = new CustomerPurchase;