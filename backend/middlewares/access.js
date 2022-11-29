const jwt = require('jsonwebtoken');

const { DEV_JWT_SECRET } = require('../utils/dev-key');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const { origin } = req.headers;
    const allowedCors =  ['http://localhost:5000', 
    'http://mesta.students.nomoredomains.club', 
    'https://mesta.students.nomoredomains.club',
    'http://localhost:3000']
    let payload = null;
    const token = req.cookies.jwt;
    if (token) {
        payload = jwt.verify(token,  NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
    }
    req.user = payload;
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }    
    next();
};