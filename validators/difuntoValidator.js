const { body, param } = require('express-validator');
const moment = require('moment');

exports.crearDifuntoValidator = [
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
  
  body('fecha_fallecimiento')
    .isDate().withMessage('Debe ser una fecha válida')
    .custom(value => {
      if (moment(value).isAfter(moment())) {
        throw new Error('La fecha de fallecimiento no puede ser futura');
      }
      return true;
    }),
  
  body('fecha_ingreso_cementerio')
    .isDate().withMessage('Debe ser una fecha válida')
    .custom((value, { req }) => {
      const fechaFallecimiento = req.body.fecha_fallecimiento;
      if (fechaFallecimiento && moment(value).isBefore(moment(fechaFallecimiento))) {
        throw new Error('La fecha de ingreso no puede ser anterior a la fecha de fallecimiento');
      }
      return true;
    })
];

exports.actualizarDifuntoValidator = [
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
  
  body('fecha_fallecimiento')
    .optional()
    .isDate().withMessage('Debe ser una fecha válida')
    .custom(value => {
      if (moment(value).isAfter(moment())) {
        throw new Error('La fecha de fallecimiento no puede ser futura');
      }
      return true;
    }),
  
  body('fecha_ingreso_cementerio')
    .optional()
    .isDate().withMessage('Debe ser una fecha válida')
    .custom((value, { req }) => {
      if (req.body.fecha_fallecimiento) {
        if (moment(value).isBefore(moment(req.body.fecha_fallecimiento))) {
          throw new Error('La fecha de ingreso no puede ser anterior a la fecha de fallecimiento');
        }
      }
      return true;
    })
];