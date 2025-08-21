// generarToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign(
    { id: 5, rol: 'ADMIN' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
);

console.log('Nuevo token:\n', token);