const chai = require('chai');
const server = require('./server');
const chaiHttp=require('chai-http');



chai.should();
chai.use(chaiHttp);

describe('API testing', ()=>{



  //get api
    describe('GET api',()=>{
        it('it should get all article related to query',()=>{
            chai.request(server)
            .get('/getfavorite/renganathanakshaya@gmail.com')
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

        it('it should not get all article related to query if username is missing',()=>{
            chai.request(server)
            .get('/getfavorite/')
            .end((err,res)=>{
                res.should.have.status(404);
             
                
            })
        })
    

})

//post api
describe('POST api',()=>{
    it('it should post the article',()=>{
        const article={
            "title":"Google Pixel 6a, Pixel Buds Pro now open for pre-booking in India: Che...",
            "description":"no description",
            "url":"https://indianexpress.com/article/technology/mobile-tabs/google-pixel-...",
            "urlToImage":"https://images.indianexpress.com/2022/07/Pixel6a_NEW.jpg",
            "publishedAt":"2022-07-21T01:00:58Z",
            "username":"renganathanakshaya@gmail.com"          
           
        }
        chai.request(server)
        .post('/addfavorite')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(201);
            res.body.should.be.a('object');
    
            
        })
    })

    it('it should not post the article without publishedAt property',()=>{
        const article={
               "title":"Brazil violence: At least 18 killed in police raid on Rio favela",
            "description":"no description",
            "url":"http://www.bbc.co.uk/news/world-latin-america-62260948",
            "urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/E146/production/_12600...",
            "username":"renganathanakshaya@gmail.com"
            
           
            
        }
        chai.request(server)
        .post('/addfavorite')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(200);
            
            
        })
    }) 


    it('it should not post the article without title property',()=>{
        const article={
            
            "url": "https://www.hindustantimes.com/world-news/protests-outside-presidential-office-after-ranil-wickremesinghe-elected-101658306644504.html",
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            "publishedAt": "2022-07-20T10:46:13Z",
        }
        chai.request(server)
        .post('/addfavorite')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(200);
            
        })
    }) 

    it('it should not post the article without url property',()=>{
        const article={
            "title": "Protests outside presidential office after Ranil Wickremesinghe elected - Hindustan Times",
           
            "urlToImage": "https://images.hindustantimes.com/img/2022/07/20/1600x900/protest_1658313758939_1658313771852_1658313771852.PNG",
            "publishedAt": "2022-07-20T10:46:13Z",
        }
        chai.request(server)
        .post('/addfavorite')
        .send(article)
        .end((err,res)=>{
            res.should.have.status(200);
            
        })
    }) 
   

})
 
//delete article
describe('DELETE api',()=>{
    it('it should delete the specific article',()=>{       
        chai.request(server)
        .delete('/deletefavorite/2022-07-21T06:22:21.4200813Z')
        .end((err,response)=>{
            response.should.have.status(200);
           
                 
            
        })
    })

    it('it should not delete the specific article without id',()=>{       
        chai.request(server)
        .delete('/deletefavorite/')
        .end((err,response)=>{
            response.should.have.status(404);
           
                 
            
        })
    })
})

})