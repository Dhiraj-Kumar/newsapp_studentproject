const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router = express.Router()
const {GetFavorites,AddFavorite,DeleteFavorite, getparticularFav}  = require('../controller/favoriteController')
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/getfavorite/:username',GetFavorites)
router.get('/getparticularfav/:username/:id',getparticularFav)
router.post('/addfavorite',AddFavorite)
//id is publishedat value
router.delete('/deletefavorite/:id',DeleteFavorite)

module.exports = router