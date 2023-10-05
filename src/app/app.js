const express = require('express');
require('dotenv').config();
/**
 * Importar middleware de registro de solicitudes HTTP (morgan)
 */
const morganMiddleware = require('../middlewares/morgan.Middleware');

/**
 * Importar middleware para el análisis de datos JSON
 */
const jsonMiddleware = require('../middlewares/json.Middleware');

/**
 * Importar las rutas
 */
const routerProducts = require("../router/product.router");
const routerUsers = require("../router/usuarios.router");
const routerLogin = require("../router/login.router");
const routerPurchase = require('../router/purchase.router');
/**
 * Crear una instancia de Express
 */
const app = express();
require('dotenv').config();


/**
 * Importar middleware de validación de token (authorize)
 */
const authorize = require('../middlewares/authorize.middleware');

/**
 * Middleware que registra solicitudes HTTP usando Morgan.
 */
app.use(morganMiddleware);

/**
 * Middleware que analiza datos JSON en las solicitudes.
 */
app.use(jsonMiddleware);

/**
 * Ruta de inicio que envía un mensaje "Esto es Express" como respuesta.
 */
app.get('/', (req, res) => {
    res.send('Esto es Express');
});

/**
 * Rutas de API para productos: Se aplica el middleware de validación de token (authorize).
 */
app.use("/api/v1", authorize, routerProducts);

/**
 * Rutas de API para usuarios.
 */
app.use("/api/v2", routerUsers);

/**
 * Rutas de API para Login.
 */
app.use("/api/v3", routerLogin);

app.use("/api/v4/", routerPurchase);

/**
 * Exportar la aplicación Express configurada
 */
module.exports = app;
