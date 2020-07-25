const router = require('express').Router()
const verify = require('./verifytoken')

router.get('/',verify,(req,res)=>{
    res.json({
        'message':'permission granted',
        'details':req.user
    })
})

module.exports = router