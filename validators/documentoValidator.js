const { body, param } = require('express-validator');

exports.crearDocumentoValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
  
  body('tipo_id')
    .isInt().withMessage('ID de tipo debe ser un número entero'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres'),
  
  body('fecha_emision')
    .optional()
    .isDate().withMessage('Debe ser una fecha válida')
];

exports.subirArchivoValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero')
];