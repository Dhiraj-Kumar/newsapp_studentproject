const userModel = require('../models/favoriteModel')



function GetFavorites(req,res){
    userModel.find({username:req.params.username},(err,data)=>{
            if(!err){
                res.status(200).send(data);
            }
    })
}

function AddFavorite(req,res){
    
    let user = new userModel({ 
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        publishedAt: req.body.publishedAt,
        username: req.body.username
    })
    
    user.save((err)=>{
        if(!err){
            res.status(201).send('added to favorite successfully')
        }
        else{
            res.send(err)
        }
    })
}

function getparticularFav(req,res){
    userModel.findOne({username:req.params.username,publishedAt:req.params.id},(err,data)=>{
        if(!err){
            res.send(data)
        }
        
    })
}

function DeleteFavorite(req,res){
    userModel.deleteOne({publishedAt:req.params.id},(err,data)=>{
        if(err){
            throw err;
        }
        else{
            res.send('deleted successfully')
        }
    })
   
}



module.exports ={GetFavorites,AddFavorite,DeleteFavorite,getparticularFav}