
const mongoose = require('mongoose');
const ReferSchema = mongoose.Schema({
    author: {
        type: String,
        
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        
    },
    url:{
        type:String,
        required:true
    },
    urlToImage: {
        type: String,
       
    },
    publishedAt:{
        type:String,
        required:true
    }
   
    
});

module.exports = mongoose.model('ReferModel', ReferSchema, 'referedArticle');

