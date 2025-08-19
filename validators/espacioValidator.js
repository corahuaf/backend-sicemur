const { body, param } = require('express-validator');

const TIPOS_ESPACIO = ['LOTE', 'MAUSOLEO', 'PABELLON', 'NICHO', 'TUMBA'];
const ESTADOS = ['DISPONIBLE', 'OCUPADO', 'RESERVADO', 'MANTENIMIENTO'];

exports.crearEspacioValidator = [
  body('codigo')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El código no puede exceder los 50 caracteres'),
  
  body('tipo')
    .isIn(TIPOS_ESPACIO).withMessage(`Tipo inválido. Valores permitidos: ${TIPOS_ESPACIO.join(', ')}`),
  
  body('estado')
    .optional()
    .isIn(ESTADOS).withMessage(`Estado inválido. Valores permitidos: ${ESTADOS.join(', ')}`)
];

exports.actualizarEspacioValidator = [
  param('id')
    .isInt().withMessage('ID debe ser un número entero'),
  
  body('codigo')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El código no puede exceder los 50 caracteres'),
  
  body('tipo')
    .optional()
    .isIn(TIPOS_ESPACIO).withMessage(`Tipo inválido. Valores permitidos: ${TIPOS_ESPACIO.join(', ')}`),
  
  body('estado')
    .optional()
    .isIn(ESTADOS).withMessage(`Estado inválido. Valores permitidos: ${ESTADOS.join(', ')}`)
];

exports.agregarContenidoValidator = [
  body('contenido_id')
    .isInt().withMessage('Debe ser un ID válido')
];

exports.obtenerAtributosValidator = [
  param('tipo')
    .isIn(TIPOS_ESPACIO).withMessage(`Tipo inválido. Valores permitidos: ${TIPOS_ESPACIO.join(', ')}`)
];

exports.cambiarEstadoValidator = [
  body('estado')
    .isIn(ESTADOS).withMessage(`Estado inválido. Valores permitidos: ${ESTADOS.join(', ')}`)
];