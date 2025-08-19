const { body, param } = require('express-validator');

exports.crearRolValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del rol es requerido')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres'),
  
  body('esSistema')
    .optional()
    .isBoolean().withMessage('esSistema debe ser un valor booleano'),
  
  body('permisos')
    .optional()
    .isArray().withMessage('Los permisos deben ser un arreglo')
];

exports.actualizarRolValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre del rol no puede estar vacío')
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder los 50 caracteres'),
  
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres'),
  
  body('permisos')
    .optional()
    .isArray().withMessage('Los permisos deben ser un arreglo')
];

exports.asignarPermisosValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('permisos')
    .isArray().withMessage('Los permisos deben ser un arreglo')
    .notEmpty().withMessage('Debe proporcionar al menos un permiso')
];