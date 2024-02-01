const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    author:{
        type: String,
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    urlToImage:{
        type: String,
        
    },
    publishedAt:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true
    }

})
//modelname  , schema ,collection name of dbs
module.exports= mongoose.model('users',userSchema,'favorites')