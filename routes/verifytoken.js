const jwt = require('jsonwebtoken')

module.exports=function(req,res,next){
    const token  = req.header('auth-token')
    if (!token) return res.status(401).send('acsess denied')

    try {
        const ver = jwt.verify(token,process.env.secret)
        req.user = ver
        next()
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}