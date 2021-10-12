var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.secret_jwt

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req obj
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"not a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
    next();
    }catch(e){
        res.status(401).send({error:"not a valid token"})
    }
};

module.exports = fetchuser;
