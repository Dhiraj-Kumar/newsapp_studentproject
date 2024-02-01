const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/favoriteRoutes')
var cors = require('cors')
const app = express()
app.use(bodyParser.json())
let port =process.env.PORT || 8004

app.use(cors())
app.use('/',userRoutes)

//
let URI = process.env.MONGODB_SERVER || 'mongodb://localhost:27017/UsersDB'
mongoose.connect(URI)
mongoose.connection.once('open',()=>{
    console.log('connected to db')
}).on('error',(err)=>{
    console.log(err)
})
let server =app.listen(port,()=>{
    console.log('running at port 8004')
})

module.exports =server