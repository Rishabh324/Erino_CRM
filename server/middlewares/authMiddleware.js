const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                console.log(err);
                res.status(401).json({
                    status: "false",
                    message: "invalid token"
                })
            } else {
                req.body.id = decode.id;
                next();
            }
        })
    } catch(err){
        res.status(500).json({
            status: "failed",
            message: "error at authMiddlware.",
            error: err
        })
    }
}