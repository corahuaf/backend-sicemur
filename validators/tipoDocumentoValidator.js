const { body, param } = require('express-validator');

exports.crearTipoDocumentoValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres')
];

exports.actualizarTipoDocumentoValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres')
];