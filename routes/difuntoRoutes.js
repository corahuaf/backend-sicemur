const express = require('express');
const router = express.Router();
const difuntoController = require('../controllers/difuntoController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearDifuntoValidator,
  actualizarDifuntoValidator
} = require('../validators/difuntoValidator');

// Solo usuarios con permiso de gestión de difuntos
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_difuntos'));

// Rutas CRUD
router.post('/', crearDifuntoValidator, difuntoController.crearDifunto);
router.get('/', difuntoController.obtenerTodosDifuntos);
router.get('/buscar', difuntoController.buscarDifuntos); // Búsqueda pública
router.get('/:id', difuntoController.obtenerDifuntoPorId);
router.put('/:id', actualizarDifuntoValidator, difuntoController.actualizarDifunto);
router.delete('/:id', difuntoController.eliminarDifunto);

// Historial de ocupaciones
router.get('/:id/ocupaciones', difuntoController.obtenerOcupacionesPorDifunto);

module.exports = router;