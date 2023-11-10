const express = require('express')
const router = express.Router()
const TimeTable = require('../model/tableModel')

router.get('/getnow:time:info',async (req,res) => {
    try{
        info = req.params.info
        info = info.split(';') 
        time = parseFloat(info[0])
        day = info[1]
        console.log(info)
        const data = await TimeTable.find({day: day, timeClose : { $gt: time}} )
        res.send(data)
    }
    catch(e){
        console.log(e)
    }

})

module.exports = router