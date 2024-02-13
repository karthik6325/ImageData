const jwt = require('jsonwebtoken');
const secretKey = 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzg0MzE2OCwiaWF0IjoxNzA3ODQzMTY4fQ'; 

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenWithoutBearer = token.split(' ')[1];


    if (!tokenWithoutBearer) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Forbidden - Token verification failed' });
        }
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
