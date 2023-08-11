const jwt = require('jsonwebtoken');
require('dotenv').config();

function authentication(req, res, next) {
    const accessToken = req.cookies.accessToken;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, function(err, result) {
        if (err) {
            if (err.message == 'jwt expired') {
                res.status(403);
            }
            else {
                throw err;
            }
        }
        next();
    });
}

module.exports = authentication;