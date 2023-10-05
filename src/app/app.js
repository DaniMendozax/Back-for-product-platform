const express = require('express');
require('dotenv').config();
/**
 * Importar middleware de registro de solicitudes HTTP (morgan)
 */
const morganMiddleware = require('../middlewares/morgan.Middleware');


const jsonMiddleware = require('../middlewares/json.Middleware');

const routerProducts = require("../router/product.router");
const routerUsers = require("../router/usuarios.router");
const routerLogin = require("../router/login.router");
const routerPurchase = require('../router/purchase.router');

const app = express();


require('dotenv').config();


const authorize = require('../middlewares/authorize.middleware');


app.use(morganMiddleware);

app.use(jsonMiddleware);


app.get('/', (req, res) => {
    res.send('Esto es Express');
});


app.use("/api/v1", authorize, routerProducts);


app.use("/api/v2", routerUsers);

app.use("/api/v3", routerLogin);

app.use("/api/v4/", routerPurchase);

module.exports = app;
