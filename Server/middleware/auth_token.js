const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; 

    if (!token) {
        return res.sendStatus(401); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log('Verified User:', user);
        if (err) {
            return res.sendStatus(403); 
        }
        console.log('Decoded Payload:', user); 
        req.user = user; 
        next(); 
    });
};

module.exports = authToken;
