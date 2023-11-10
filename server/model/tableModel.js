const mongoose = require('mongoose')

const TimeTableSchema = mongoose.Schema({
    day : String,
    timeOpen: Number,
    timeClose:Number,
    title:String,
    dis:String,
    img:String
},{timestamps:true})

module.exports = mongoose.model('TimeTable', TimeTableSchema)