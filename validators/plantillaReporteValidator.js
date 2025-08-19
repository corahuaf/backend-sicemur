const { body, param } = require('express-validator');

exports.crearPlantillaValidator = [
  body('tipo')
    .isIn(['PDF', 'EXCEL', 'CSV']).withMessage('Tipo de reporte no válido'),
  
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
  
  body('definicion')
    .isObject().withMessage('La definición debe ser un objeto')
];

exports.actualizarPlantillaValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('tipo')
    .optional()
    .isIn(['PDF', 'EXCEL', 'CSV']).withMessage('Tipo de reporte no válido'),
  
  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
  
  body('definicion')
    .optional()
    .isObject().withMessage('La definición debe ser un objeto')
];