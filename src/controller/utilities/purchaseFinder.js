const Purchase = require('../../model/purchase.model');
const Product = require('../../model/product.model');

/**
 * @function
 * @async
 * @name purchaseFinder
 * @description Encuentra y formatea una compra en función de su ID.
 *
 * @param {string} purchaseId - El ID de la compra que se busca y formatea.
 *
 * @returns {object} Objeto que representa la compra formateada.
 *
 * @throws {Error} Error si no se encuentra la compra o si ocurre un error en la búsqueda o el formato.

 */

const purchaseFinder = async(purchaseId) => {
    const purchaseResponse = await Purchase.findAll({
        where: {
            Purchase_Id: purchaseId,
        },
    });
    let purchaseTotalPrice = 0;
    const productsList = await Promise.all(purchaseResponse.map(async (item) => {
        const product = await Product.findOne({
            where: {
                Nombre: item.dataValues.Product_name,
            },
        });
        const list = {
            producto: item.dataValues.Product_name,
            cantidad: item.dataValues.Quantity,
            precioPorUnidad: product.dataValues.Precio,
            precioTotal: item.dataValues.Quantity * product.dataValues.Precio
        }
        purchaseTotalPrice += list.precioTotal;
        return list;
    }));
    
    const purchaseAsFactura = {
        fecha: purchaseResponse[0].dataValues.createdAt,
        cliente: purchaseResponse[0].dataValues.Username,
        productos: productsList,
        precioTotal: purchaseTotalPrice
    }
    return purchaseAsFactura
};

module.exports = { purchaseFinder }
