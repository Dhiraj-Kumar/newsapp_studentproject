const express= require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
const {NewsController} = require('../Controller/emailController')

router.post('/:email',NewsController)

module.exports = router