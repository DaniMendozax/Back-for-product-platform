const router = require('express').Router();
const PurchaseController = require('../controller/customer_purchases')
const authorize = require('../middlewares/authorize.middleware')

router.post('/customer_purchases', PurchaseController.createPurchase);
router.get('/customer_purchases/:purchaseId', PurchaseController.getPurchaseById);
router.get('/customer_purchases/', authorize ,PurchaseController.getAllPurchases)


module.exports = router;
