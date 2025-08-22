// routes/difuntoRoutes.js
const express = require('express');
const router = express.Router();
const difuntoController = require('../controllers/difuntoController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearDifuntoValidator,
  actualizarDifuntoValidator
} = require('../validators/difuntoValidator');

// Búsqueda pública
router.get('/buscar', difuntoController.buscarDifuntos);

// Consultas públicas de lectura
router.get('/', difuntoController.obtenerTodosDifuntos);
router.get('/:id', difuntoController.obtenerDifuntoPorId);

// Historial público
router.get('/:id/ocupaciones', difuntoController.obtenerOcupacionesPorDifunto);

// Gestión con permisos
router.post('/', auth.verifyToken, permisos.verificarPermiso('difuntos:crear'), crearDifuntoValidator, difuntoController.crearDifunto);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('difuntos:actualizar'), actualizarDifuntoValidator, difuntoController.actualizarDifunto);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('difuntos:eliminar'), difuntoController.eliminarDifunto);

module.exports = router;