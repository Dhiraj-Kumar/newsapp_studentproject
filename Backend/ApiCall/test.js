const chai = require('chai');
const server = require('./api');
const chaiHttp=require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('API testing', ()=>{
  //get api
    describe('GET api',()=>{
        it('it should get all article related to query',()=>{
            chai.request(server)
            .get('/search/apple')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                
            })
        })
    


    
        it('it should NOT get all the article related to the query',()=>{
            chai.request(server)
            .get('/search')
            .end((err,res)=>{
                res.should.have.status(404);
                
            })
        })
    


    
        it('it should  get top headlines',()=>{
            chai.request(server)
            .get('/top-headlines-page1')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.map(item=>{
                    item.should.have.property('description');
                    item.should.have.property('title');
                    item.should.have.property('author');
                    item.should.have.property('publishedAt');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                    item.should.have.property('content');
                })
                
               
            })
        
    })

    it('it should  get top headlines of page 2',()=>{
        chai.request(server)
        .get('/top-headlines-page2')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
               res.body.map(item=>{
                    item.should.have.property('description');
                    item.should.have.property('title');
                    item.should.have.property('author');
                    item.should.have.property('publishedAt');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                    item.should.have.property('content');
                })
                    
                })
            
        })

        it('it should  get top headlines of page 3',()=>{
            chai.request(server)
            .get('/top-headlines-page3')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                  res.body.map(item=>{
                    item.should.have.property('description');
                    item.should.have.property('title');
                    item.should.have.property('author');
                    item.should.have.property('publishedAt');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                    item.should.have.property('content');
                })
            })

        })  

        it('it should  get all news of bbc channel',()=>{
            chai.request(server)
            .get('/bbc')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                   res.body.map(item=>{
                    item.should.have.property('description');
                    item.should.have.property('title');
                    item.should.have.property('author');
                    item.should.have.property('publishedAt');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                    item.should.have.property('content');
                })
            })

        })

        it('it should  get all news based on the category',()=>{
            chai.request(server)
            .get('/category/sports')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                   res.body.map(item=>{
                    item.should.have.property('description');
                    item.should.have.property('title');
                    item.should.have.property('author');
                    item.should.have.property('publishedAt');
                    item.should.have.property('publishedAt');
                    item.should.have.property('url');
                    item.should.have.property('urlToImage');
                    item.should.have.property('content');
                })
            })

        })

        it('it should  get weather info of current location',()=>{
            chai.request(server)
            .get('/weather/28.545240/77.128550')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
               
               
            })

        }) 
})


})