const magoose = require('mongoose')

const userSchema = new magoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    data:{
        type:Date,
        default:Date.now
    }
})

module.exports = magoose.model('User',userSchema)