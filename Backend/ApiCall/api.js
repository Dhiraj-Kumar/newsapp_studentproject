const express = require('express') 
const app = express()
app.use(express.urlencoded({extended:false}))
var cors = require('cors')
let port =process.env.PORT || 8001
// const fetch = require('node-fetch')
const RouterApi = require('./Routes/apiRoutes')


app.use(cors());
app.use('/',RouterApi)



let server=app.listen(port,()=>{
    console.log('api running at port : 8001')
})

module.exports= server