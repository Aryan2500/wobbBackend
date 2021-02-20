const express = require('express')
const dbConnect = require('./db/config')
const app = express()

const path = require('path')

const route = require('./routes')

const bodyParser = require("body-parser")
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
 
app.use('' , route)    
 

//app.set('views' , path.join(__dirname, 'views'))


//set view engine jade
// app.set("view engine","jade")
 

const PORT = process.env.PORT || 5000 //assigning port number
app.listen(PORT , ()=>{
    console.log(`Server running on Port ${PORT} `)
})