
const referRepo=require('../repository/referRepo')

function addArticle(req, res) {
    referRepo.AddArticle(req.body).then(data => {
        res.status(201).send(data);
    });
}


function getArticles(req, res) {
    referRepo.GetArticles().then(data => {
        res.status(200).send(data);
    });
}

function deleteArticle(req, res) {
    referRepo.DeleteArticle(req.params.id).then(data => {
        res.status(200).send(data);
    });
}

function getParticularArticle(req, res) {
   
    referRepo.GetParticularArticle(req.params.id).then(data => {
        res.status(200).send(data);
    });
}



module.exports={addArticle,getArticles,deleteArticle,getParticularArticle}