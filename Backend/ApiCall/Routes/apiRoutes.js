const express= require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const apiCall =require('../Controller/apiController')

router.get('/',(req,res)=>{
    res.send('runnning')
});
router.get('/search/:userQuery',apiCall.search)
router.get('/top-headlines-page1/',apiCall.topHeadlines1)
router.get('/top-headlines-page2/',apiCall.topHeadlines2)
router.get('/top-headlines-page3/',apiCall.topHeadlines3)
router.get('/bbc',apiCall.bbc)
router.get('/category/:categoryName',apiCall.category)
router.get('/weather/:lat/:lon',apiCall.weather)

module.exports = router