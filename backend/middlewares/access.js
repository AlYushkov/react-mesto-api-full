const jwt = require('jsonwebtoken');

const { DEV_JWT_SECRET } = require('../utils/dev-key');

module.exports = (req, res, next) => {
    let payload = null;
    const token = req.cookies.jwt;
    if (token) {
        payload = jwt.verify(token, DEV_JWT_SECRET);
    }
    req.user = payload;
    next();
};