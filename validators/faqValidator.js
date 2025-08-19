const { body, param } = require('express-validator');

exports.crearFAQValidator = [
  body('pregunta')
    .trim()
    .notEmpty().withMessage('La pregunta es requerida')
    .isLength({ max: 500 }).withMessage('La pregunta no puede exceder los 500 caracteres'),
  
  body('respuesta')
    .trim()
    .notEmpty().withMessage('La respuesta es requerida')
    .isLength({ max: 2000 }).withMessage('La respuesta no puede exceder los 2000 caracteres'),
  
  body('categoria_id')
    .isInt().withMessage('ID de categoría debe ser un número entero'),
  
  body('orden')
    .optional()
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
];

exports.actualizarFAQValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('pregunta')
    .optional()
    .trim()
    .notEmpty().withMessage('La pregunta no puede estar vacía')
    .isLength({ max: 500 }).withMessage('La pregunta no puede exceder los 500 caracteres'),
  
  body('respuesta')
    .optional()
    .trim()
    .notEmpty().withMessage('La respuesta no puede estar vacía')
    .isLength({ max: 2000 }).withMessage('La respuesta no puede exceder los 2000 caracteres'),
  
  body('categoria_id')
    .optional()
    .isInt().withMessage('ID de categoría debe ser un número entero'),
  
  body('orden')
    .optional()
    .isInt({ min: 1 }).withMessage('El orden debe ser un número entero positivo')
];