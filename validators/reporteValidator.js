const { body } = require('express-validator');

exports.generarReporteValidator = [
  body('tipo')
    .isIn(['PDF', 'EXCEL', 'CSV']).withMessage('Tipo de reporte no válido'),
  
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
  
  body('parametros')
    .isObject().withMessage('Los parámetros deben ser un objeto')
];