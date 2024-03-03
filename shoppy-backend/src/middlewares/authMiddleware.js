const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token){
        console.log('No token provided.');
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    } 

    jwt.verify(token.split(" ")[1], process.env.SECRET, (err, decoded) => {
        if (err){
            console.log(err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } 

        // Save the user ID for future requests
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken
};
