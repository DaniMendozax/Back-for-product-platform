const Products = require("../model/product.model");

class ProductController {
    /**
     * Obtiene todos los productos.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async getAllProducts(req, res) {
        const products = await Products.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: products
        });
    };

    /**
     * Obtiene un producto por su número de lote.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async getProductByNumeroDeLote(req, res) {
        const numero_de_lote = req.params.Numero_de_lote;
        const product = await Products.findOne({
            where: {
                Numero_de_lote: numero_de_lote,
            },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            body: product,
        });
    }

    /**
     * Crea un nuevo producto.
     * @param {object} req - Objeto de solicitud HTTP que contiene los datos del producto.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async createProduct(req, res) {
        const dataProducts = req.body;
        await Products.sync();
        const createProduct = await Products.create({
            Nombre: dataProducts.Nombre,
            Precio: dataProducts.Precio,
            Cantidad_disponible: dataProducts.Cantidad_disponible,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Producto creado exitosamente',
        });
    }

    /**
     * Actualiza un producto existente por su número de lote.
     * @param {object} req - Objeto de solicitud HTTP que contiene los datos actualizados del producto.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async updateProductByNumeroDeLote(req, res) {
        const numero_de_lote = req.params.Numero_de_lote;
        const dataProducts = req.body;
        const updateProduct = await Products.update(
            {
                Nombre: dataProducts.Nombre,
                Precio: dataProducts.Precio,
                Cantidad_disponible: dataProducts.Cantidad_disponible,
            },
            {
                where: {
                    Numero_de_lote: numero_de_lote,
                },
            }
        );
        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Producto actualizado exitosamente',
            body: updateProduct,
        });
    }

    /**
     * Elimina un producto por su número de lote.
     * @param {object} req - Objeto de solicitud HTTP.
     * @param {object} res - Objeto de respuesta HTTP.
     */
    async deleteProductByNumeroDeLote(req, res) {
        const numero_de_lote = req.params.Numero_de_lote;
        const deleteProduct = await Products.destroy({
            where: {
                Numero_de_lote: numero_de_lote,
            },
        });
        res.status(204).json({
            ok: true,
            status: 204,
            message: 'Producto eliminado exitosamente',
        });
    }
}

module.exports = new ProductController();
