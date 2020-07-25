const router = require('express').Router()
const User = require('../model/user')
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register',async (req,res)=>{

    //validate the data
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)



    //checking if the user exist
    const exist = await User.findOne({email:req.body.email})
    if(exist) return res.status(400).send('user already exist')

    //hash pwd
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(req.body.password,salt)
    //create new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPwd
    })

    try {
        const save = await user.save()
        res.send({user:user._id})
    } catch (error) {
        res.status(400).send(error)
    }
})

//login
router.post('/login',async (req,res)=>{

    //validate the data
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)



    //checking if the user exist
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email is wrong')

    //pwd is correct?
    const validpwd = await bcrypt.compare(req.body.password,user.password)
    if(!validpwd) return res.status(400).send('Invalid pwd')


    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.secret)
    res.header('auth-token',token).send(token)
    
})

module.exports = router