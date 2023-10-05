const router = require('express').Router();
const PurchaseController = require('../controller/customer_purchases')
const authorize = require('../middlewares/authorize.middleware')


/**
 * Ruta para crear una compra de cliente.
 * @name POST /customer_purchases
 * @description Crea una compra de cliente.
 */
router.post('/customer_purchases', PurchaseController.createPurchase);
/**
 * Ruta para obtener una compra de cliente por ID.
 * @name GET /customer_purchases/:purchaseId
 * @description Obtiene una compra de cliente por su ID.
 */
router.get('/customer_purchases/:purchaseId', PurchaseController.getPurchaseById);
/**
 * Ruta para obtener todas las compras de clientes.
 * @name GET /customer_purchases/
 * @description Obtiene todas las compras de clientes. (Se requiere autorización)
 */
router.get('/customer_purchases/', authorize ,PurchaseController.getAllPurchases);


module.exports = router;
