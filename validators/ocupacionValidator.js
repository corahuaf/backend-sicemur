const { body, param } = require('express-validator');
const moment = require('moment');

exports.asignarDifuntoValidator = [
  body('espacio_id')
    .isInt().withMessage('ID de espacio debe ser un número entero'),
  
  body('difunto_id')
    .isInt().withMessage('ID de difunto debe ser un número entero'),
  
  body('fecha_ocupacion')
    .optional()
    .isDate().withMessage('Debe ser una fecha válida')
    .custom(value => {
      if (moment(value).isAfter(moment())) {
        throw new Error('La fecha de ocupación no puede ser futura');
      }
      return true;
    })
];

exports.liberarDifuntoValidator = [
  param('espacioId')
    .isInt().withMessage('ID de espacio debe ser un número entero'),
  
  param('difuntoId')
    .isInt().withMessage('ID de difunto debe ser un número entero')
];

exports.transferirDifuntoValidator = [
  body('espacioOrigenId')
    .isInt().withMessage('ID de espacio origen debe ser un número entero'),
  
  body('difuntoId')
    .isInt().withMessage('ID de difunto debe ser un número entero'),
  
  body('espacioDestinoId')
    .isInt().withMessage('ID de espacio destino debe ser un número entero')
];