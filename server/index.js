const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const bodyParse = require('body-parser')
const timeTableRouters = require('./router/timetable')
const connectDB = require('./db.js')
const adminRounters = require('./router/admin')
require('dotenv').config()
//connnect to database
connectDB()

//middleware 
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '10mb' }))

// for admin
app.use('/admin', adminRounters)
//for users
app.use('/timetable',timeTableRouters)

app.listen(5000, ()=>console.log("sever Started"))