const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // O PDF sugere expiração de 1 hora ('1h')
    return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: '1h' });
};

module.exports = { generateToken };