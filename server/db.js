const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const uri = 'mongodb://127.0.0.1:27017/whatlearn'
const connectDB = async()=> {
    console.log(process.env.db_uri)
    try {
        await mongoose.connect(uri)
        console.log("Conntected DB")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB