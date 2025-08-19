const { body, param } = require('express-validator');

exports.crearUbicacionValidator = [
  body('sector')
    .trim()
    .notEmpty().withMessage('El sector es requerido')
    .isLength({ max: 50 }).withMessage('El sector no puede exceder los 50 caracteres'),
  
  body('manzana')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('La manzana no puede exceder los 50 caracteres'),
  
  body('lote')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El lote no puede exceder los 50 caracteres')
];

exports.actualizarUbicacionValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('sector')
    .optional()
    .trim()
    .notEmpty().withMessage('El sector no puede estar vacío')
    .isLength({ max: 50 }).withMessage('El sector no puede exceder los 50 caracteres'),
  
  body('manzana')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('La manzana no puede exceder los 50 caracteres'),
  
  body('lote')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El lote no puede exceder los 50 caracteres')
];