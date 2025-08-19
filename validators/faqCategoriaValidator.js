const { body, param } = require('express-validator');

exports.crearCategoriaValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
  
  body('orden')
    .optional()
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
];

exports.actualizarCategoriaValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
  
  body('orden')
    .optional()
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
];

exports.actualizarOrdenValidator = [
  body('nuevasOrdenaciones')
    .isArray().withMessage('Debe ser un arreglo de ordenaciones'),
  
  body('nuevasOrdenaciones.*.id')
    .isInt().withMessage('ID de categoría debe ser un número entero'),
  
  body('nuevasOrdenaciones.*.orden')
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
];