const chai = require('chai');
const server = require('./server');
const chaiHttp=require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('API testing', ()=>{
  //get api
    describe('GET api',()=>{
        it('it should get all article present in recommend article',()=>{
            chai.request(server)
            .get('/api/v3/getReferedArticle')
            .end((err,res)=>{
                
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.map(item =>{                
                    item.should.have.property('title');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                   
                })
                
            })
        })

        
        it('it should NOT get the articles',()=>{
            chai.request(server)
            .get('/getReferedArticle')
            .end((err,res)=>{
                res.should.have.status(404);
                
            })
        })
    

 
    
        it('it should  get specific the article',()=>{
            chai.request(server)
            .get('/api/v3/getparticularArticle/2022-07-20T10:46:13Z')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('publishedAt');
                res.body.should.have.property('url');
                res.body.should.have.property('urlToImage');
                
            })
        
    })
})




 //post api
 describe('POST api',()=>{
    it('it should post the article',()=>{
        const article={
            "title": "Protests outside presidential office after Ranil Wickremesinghe elected - Hindustan Times",
            "url": "https://www.hindustantimes.com/world-news/protests-outside-presidential-office-after-ranil-wickremesinghe-elected-101658306644504.html",
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            "publishedAt": "2022-07-20T10:46:13Z",
        }
        chai.request(server)
        .post('/api/v3/addReferedArticle')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(201);
            res.body.should.be.a('object');
            
        })
    })

    it('it should not post the article without publishedAt property',()=>{
        const article={
            "title": "Protests outside presidential office after Ranil Wickremesinghe elected - Hindustan Times",
            "url": "https://www.hindustantimes.com/world-news/protests-outside-presidential-office-after-ranil-wickremesinghe-elected-101658306644504.html",
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            
        }
        chai.request(server)
        .post('/api/v3/addReferedArticle')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(400);
            
        })
    }) 

    it('it should not post the article without title property',()=>{
        const article={
            
            "url": "https://www.hindustantimes.com/world-news/protests-outside-presidential-office-after-ranil-wickremesinghe-elected-101658306644504.html",
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            "publishedAt": "2022-07-20T10:46:13Z",
        }
        chai.request(server)
        .post('/api/v3/addReferedArticle')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(400);
            
        })
    }) 

    it('it should not post the article without url property',()=>{
        const article={
            "title": "Protests outside presidential office after Ranil Wickremesinghe elected - Hindustan Times",
           
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            "publishedAt": "2022-07-20T10:46:13Z",
        }
        chai.request(server)
        .post('/api/v3/addReferedArticle')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(400);
            
        })
    }) 
 



   

})

//delete article
describe('DELETE api',()=>{
    it('it should delete the specific article',()=>{       
        chai.request(server)
        .delete('/api/v3/deleteReferedArticle/2022-07-21T06:22:21.4200813Z')
        .end((err,response)=>{
            response.should.have.status(200);
           
                 
            
        })
    })
})

})