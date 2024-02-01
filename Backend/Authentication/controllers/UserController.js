const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const { TokenGenerator, TokenVerification} = require('../auth/UserAuth');


function RegisterUser(req, res) {
    
    UserModel.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.status(409).send({ status: 409, message: 'User with specified email already exists' })
        } else if (!user) {
            let user = new UserModel();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.ans1=bcrypt.hashSync(req.body.ans1,10);
            user.password = bcrypt.hashSync(req.body.password, 10);
            
            user.save((err) => {
                if (!err) {
                   
                    res.status(200).send({message: 'User registered successfully', user: user });
                } else {
                    res.status(404).send(err);
                }
            });
        } else {
            res.status(404).send(err);
        }
    });
}


function verifyMiddleware(req,res,next){
    const username=req.body.email
    const password=req.body.password
   
    UserModel.findOne({email: username},(err,user)=>{
        if((!user) || (!bcrypt.compareSync(password, user.password))){
            
            res.status(404).send({ message: 'invalid credentials' })
        }
        else{
            next()
        }
    })
}


function LoginUser(req, res) {
    console.log(req.body.email)
    const username=req.body.email
    UserModel.findOne({email: username},(err,user)=>{
        if(user){
            const fn=user.firstname
            const ln=user.lastname
            // console.log(user._id)
            const token= TokenGenerator(user._id)
            res.cookie("jwt",token,{httpOnly:false})
            res.status(200).send({token,username,fn,ln,message:"user login success"})
           
        }else{
            res.status(404).send({message:"Invalid Credentials"})
        }
    })

   
   
    
}

function isAuthenticated(req, res) {
//    console.log(req.body)
   const token=req.body.headers
   const jwtoken=token.slice(4,)
//    console.log("fdfgh",jwtoken)
   res.status(200).send({ isAuthenticated: TokenVerification(jwtoken) })
}



function VerifyTokenMiddleware(req, res,next) {
    // console.log(document.cookies.jwt)
    const token=req.body.headers
   const jwtoken=token.slice(4,)
    if (TokenVerification(jwtoken) === true) {
        next()
    } else {
        res.status(200).send({ status: 401, message: "You are not authorized" ,isAuthenticated: false});
    }
}

function logout(req,res){
//    console.log(req)
    // console.log("inlogout")
    res.clearCookie
    res.send("logout successfully")
}

function changePassword(req,res){
    const oldpassword=req.body.oldpassword
    
    UserModel.findOne({ email: req.params.username }, (err, user)=>{
    
    if (bcrypt.compareSync(oldpassword, user.password)) {
        user.password=bcrypt.hashSync(req.body.newpassword,10)
        user.save((err)=>{
            if(!err){
            
                res.status(200).send({message:"password changed successfully"})
            }
            else{
           
            }
        })
        
        
    }
    else{
        
        res.status(404).send({message:"old password is incorrect"})
    }
})
}

function forgotPassword(req,res){
    console.log(req.params.username)
    UserModel.findOne({ email: req.params.username }, (err, user)=>{
        // console.log(req.body.password)
        // console.log(user)
        user.password=bcrypt.hashSync(req.body.password,10)
        // console.log(user.password)
            user.save((err)=>{
                if(!err){
                    res.status(200).send({message:"New password generated successfully"})
                }
            })
    })
}

function verifyUser(req,res){
    UserModel.findOne({ email: req.body.email }, (err, user)=>{
        
        if(!user){
            res.status(403).send({message:"Invalid Email"})
        }
        else if (bcrypt.compareSync(req.body.ans1, user.ans1)) {
            // user.password=bcrypt.hashSync(req.body.password,10)
            // user.save((err)=>{
            //     if(!err){
            //         res.send({message:"New password generated successfully"})
            //     }
            // })
            res.status(200).send({user:user.email})
            
        }
        else{
            res.send({message:"Incorrect answer or Incorrect security question"})
        }
    })
   
}

const GoogleLoginSuccess =  (req, res) => {
	if (req.user) {
        const username = req.user.email
        const fn= req.user.name.givenName
        const ln= req.user.name.familyName
        const token= TokenGenerator(req.user.email)
        res.cookie("jwt",token,{httpOnly:false})
         res.send({token,username,fn,ln,message:"user login success"})
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
}
const GoogleLogout =  (req, res) => {
    res.clearCookie('connect.sid')
     res.send('hello')
}
module.exports = { RegisterUser, LoginUser,verifyMiddleware,isAuthenticated,  VerifyTokenMiddleware,logout,changePassword,verifyUser,forgotPassword,GoogleLoginSuccess,GoogleLogout }