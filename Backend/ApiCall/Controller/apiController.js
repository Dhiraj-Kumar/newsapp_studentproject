require('dotenv').config()
const fetch = require('node-fetch')
//base url and apikey should be environment variable

const search = async (req,res)=>{
    const userQuery = req.params.userQuery
     const url  = `${process.env.BASE_URL}everything?q=${userQuery}&sortBy=publishedAt&page=1&apiKey=${process.env.API_KEY}`
    const response = await fetch(url)
    const json = await response.json()
    const data = json.articles.map(item=>item)
     res.send(data)
 }

 const topHeadlines1 = async (req,res)=>{
    
    const url  = `${process.env.BASE_URL}top-headlines?country=in&page=1&apiKey=${process.env.API_KEY}`
     const response = await fetch(url)
     const json = await response.json()
     const data = json.articles.map(item=>item)
     res.send(data)
  }
  const topHeadlines2 = async (req,res)=>{
    
    const url  = `${process.env.BASE_URL}top-headlines?country=in&page=2&apiKey=${process.env.API_KEY}`
     const response = await fetch(url)
     const json = await response.json()
     const data = json.articles.map(item=>item)
     res.send(data)
  }

  const topHeadlines3 = async (req,res)=>{
    
   const url  = `${process.env.BASE_URL}top-headlines?sources=google-news-in&apiKey=${process.env.API_KEY}`
    const response = await fetch(url)
    const json = await response.json()
    const data = json.articles.map(item=>item)
    res.send(data)
 }

 

const bbc = async (req,res)=>{
   const url  = `${process.env.BASE_URL}top-headlines?sources=bbc-news&apiKey=${process.env.API_KEY}`
   const response = await fetch(url)
   const json = await response.json()
   const data = json.articles.map(item=>item)
   res.send(data)
}


const category = async (req,res)=>{
    const categoryName = req.params.categoryName
     const url  = `${process.env.BASE_URL}top-headlines?country=in&category=${categoryName}&apiKey=${process.env.API_KEY}`
    const response = await fetch(url)
    const json = await response.json()
    
    const data = json.articles.map(item=>item)
    res.send(data)
 }

 const weather = async (req,res)=>{
   const lat = req.params.lat
   const lon =req.params.lon
  
    const url  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f74269dadfe382ac910adef6cd0dbb31`
   const response = await fetch(url)
   const json = await response.json()
   const data = JSON.stringify(json)
   res.send(data)
}


 module.exports = {bbc, search , category , topHeadlines1,topHeadlines2 , topHeadlines3 ,weather}