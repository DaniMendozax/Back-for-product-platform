const router = require("express").Router();
const LoginRouter = require('../controller/login.controller')

router.post('/login', LoginRouter.postLogin);

module.exports = router;