const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.KEY_AUTH, { expiresIn: '1h' });
};

module.exports = createToken;