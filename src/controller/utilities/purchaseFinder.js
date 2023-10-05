const Purchase = require('../../model/purchase.model');
const Product = require('../../model/product.model');

async function purchaseFinder(purchaseId) {
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
};

module.exports = purchaseFinder;