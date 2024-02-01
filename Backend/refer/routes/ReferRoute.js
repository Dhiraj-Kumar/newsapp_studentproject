
const express=require('express');
const { addArticle, getArticles, deleteArticle, getParticularArticle } = require('../controllers/ReferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/addReferedArticle',addArticle)
router.get('/getReferedArticle',getArticles)
router.delete('/deleteReferedArticle/:id',deleteArticle)
router.get('/getparticularArticle/:id',getParticularArticle)

module.exports=router