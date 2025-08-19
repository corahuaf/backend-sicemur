const { body, param } = require('express-validator');

exports.crearResponsableValidator = [
  body('nombres')
    .trim()
    .notEmpty().withMessage('Los nombres son requeridos')
    .isLength({ max: 100 }).withMessage('Los nombres no pueden exceder los 100 caracteres'),
  
  body('ape_paterno')
    .trim()
    .notEmpty().withMessage('El apellido paterno es requerido')
    .isLength({ max: 100 }).withMessage('El apellido paterno no puede exceder los 100 caracteres'),
  
  body('ape_materno')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('El apellido materno no puede exceder los 100 caracteres'),
  
  body('dni')
    .trim()
    .notEmpty().withMessage('El DNI es requerido')
    .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres'),
  
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('La dirección no puede exceder los 255 caracteres'),
  
  body('telefono')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('El teléfono no puede exceder los 20 caracteres')
];

exports.actualizarResponsableValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('nombres')
    .optional()
    .trim()
    .notEmpty().withMessage('Los nombres no pueden estar vacíos')
    .isLength({ max: 100 }).withMessage('Los nombres no pueden exceder los 100 caracteres'),
  
  body('ape_paterno')
    .optional()
    .trim()
    .notEmpty().withMessage('El apellido paterno no puede estar vacío')
    .isLength({ max: 100 }).withMessage('El apellido paterno no puede exceder los 100 caracteres'),
  
  body('ape_materno')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('El apellido materno no puede exceder los 100 caracteres'),
  
  body('dni')
    .optional()
    .trim()
    .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres'),
  
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('La dirección no puede exceder los 255 caracteres'),
  
  body('telefono')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('El teléfono no puede exceder los 20 caracteres')
];