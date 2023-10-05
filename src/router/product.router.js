const router = require("express").Router();
const ProductController = require('../controller/product.controller');

/**
 * Ruta para obtener todos los productos.
 */
router.get('/products', ProductController.getAllProducts);

/**
 * Ruta para obtener un producto por su número de lote.
 * @param {string} Numero_de_lote - Número de lote del producto a recuperar.
 */
router.get('/products/:Numero_de_lote', ProductController.getProductByNumeroDeLote);

/**
 * Ruta para crear un nuevo producto.
 */
router.post('/products', ProductController.createProduct);

/**
 * Ruta para actualizar un producto por su número de lote.
 * @param {string} Numero_de_lote - Número de lote del producto a actualizar.
 */
router.put('/products/:Numero_de_lote', ProductController.updateProductByNumeroDeLote);

/**
 * Ruta para eliminar un producto por su número de lote.
 * @param {string} Numero_de_lote - Número de lote del producto a eliminar.
 */
router.delete('/products/:Numero_de_lote', ProductController.deleteProductByNumeroDeLote);

module.exports = router;
