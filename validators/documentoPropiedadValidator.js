const { body, param } = require('express-validator');

exports.asociarDocumentoPropiedadValidator = [
  body('documento_id')
    .isInt().withMessage('ID de documento debe ser un número entero'),
  
  body('espacio_id')
    .optional()
    .isInt().withMessage('ID de espacio debe ser un número entero'),
  
  body('responsable_id')
    .optional()
    .isInt().withMessage('ID de responsable debe ser un número entero'),
  
  body()
    .custom((value, { req }) => {
      if (!req.body.espacio_id && !req.body.responsable_id) {
        throw new Error('Debe proporcionar al menos un espacio o un responsable');
      }
      return true;
    })
];