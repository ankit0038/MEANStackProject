const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token " + token);
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        //console.log(decodedToken);
        next();
    } catch(error) {
        res.status(401).json({message: 'Auth failed!'}); 
    }
};