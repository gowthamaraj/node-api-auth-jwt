const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
//env
dotenv.config()
//db connection
mongoose.connect(process.env.connect,{ useUnifiedTopology: true ,useNewUrlParser:true},()=>{
    console.log('DB connected');
})
//routes
const authRoute = require('./routes/auth')
const secRoute = require('./routes/secret')

//middleware
app.use(express.json())
//Route middlewares
app.use('/api/user',authRoute)
app.use('/api/secret',secRoute)

app.listen(3000,()=>{console.log('Server Up');})