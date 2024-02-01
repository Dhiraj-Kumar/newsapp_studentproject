const ReferModel = require("../model/ReferModel");


function AddArticle(article) {
    return new Promise((resolve, reject) => {
        let newArticle = new ReferModel({
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt
        });
        newArticle.save((err) => {
            if (!err) {
                resolve('Article added successfully');
            } else {
                reject(err);
            }
        });
    });
}


function GetArticles() {
    return new Promise((resolve, reject) => {
        ReferModel.find({}, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

function DeleteArticle(id){
    return new Promise((resolve, reject) => {
        ReferModel.deleteOne({ publishedAt: id }, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

function GetParticularArticle(id) {
    
    return new Promise((resolve, reject) => {
       
        ReferModel.findOne({publishedAt:id}, (err, data) => {
           
            if (!err) {
               
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}




module.exports={AddArticle,GetArticles,DeleteArticle,GetParticularArticle}

