const express = require('express')
const router = express.Router()
const TimeTable = require('../model/tableModel')


router.post('/create', async(req,res) => {  
    try{
        console.log(req.body)
        const timeTable = await TimeTable(req.body).save()
        res.send(timeTable)
    }catch(err){
        res.send(err)
        console.log(err)
    }
})
router.get('/getall', async(req,res) => {  
    try{
        const data = await TimeTable.find({}).exec()
        res.send(data)
    }catch(err){
        res.send(err)
        console.log(err)
    }
})
router.delete('/delete:id', async (req, res) => {
    try {
        // code
        var id = req.params.id
        id = id.split(':')
        console.log(id[1])
        const removed = await TimeTable.findOneAndDelete({_id:id[1]}).exec()
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
)
router.get('/get:id',async (req, res) => {
    try {
        // code
        var id = req.params.id
        id = id.split(':')
        console.log(id[1])
        const producted = await TimeTable.findOne({ _id: id[1] }).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
})
router.post('/update:id', async (req, res) => {
    try {
        // code
        var id = req.params.id
        id = id.split(':')
        console.log(id[1])
        const updated = await TimeTable
            .findOneAndUpdate({ _id:id[1] }, req.body, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router