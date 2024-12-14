const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];  //gets token and split it on the first space

    if (!token) {
        return res.sendStatus(401); //returns unauthorized if there is no token
    }

    console.log('Token received:', token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log('Verified User:', user);
        if (err) {
            return res.sendStatus(403); //returns forbidden if token is invalid
        }
        console.log('Decoded Payload:', user); 
        req.user = user; 
        next(); //proceeds to next middleware if token is valid
    });
};

module.exports = authToken;
