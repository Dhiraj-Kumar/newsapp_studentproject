const express = require('express');
const passport = require('passport')
require('../auth/authenticator')
const { RegisterUser, LoginUser, isAuthenticated,VerifyTokenMiddleware,logout,forgotPassword,changePassword, verifyMiddleware, verifyUser, GoogleLoginSuccess,GoogleLogout} = require('../controllers/UserController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/register', RegisterUser);
router.post('/login', verifyMiddleware, LoginUser);
router.post('/isAuthenticated',isAuthenticated);
router.get('/logout',logout)
router.post('/changePassword/:username',changePassword)
router.post('/forgotPassword/:username',forgotPassword)
router.post('/verifyUser',verifyUser)

//google
router.get("/login/success",GoogleLoginSuccess);
router.get("/google/logout",GoogleLogout);
router.get('/google/return',passport.authenticate('google',{successRedirect:'http://localhost:3000/loginpage',failureRedirect:'/'}))
router.get('/auth/google',passport.authenticate('google',{ scope:['email','profile']}))

module.exports = router;