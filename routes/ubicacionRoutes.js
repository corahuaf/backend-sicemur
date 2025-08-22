const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearUbicacionValidator,
  actualizarUbicacionValidator
} = require('../validators/ubicacionValidator');

// Rutas con permisos por acción
router.post('/', auth.verifyToken, permisos.verificarPermiso('ubicaciones:crear'), crearUbicacionValidator, ubicacionController.crearUbicacion);
router.get('/', ubicacionController.obtenerTodasUbicaciones); // sin autenticación
router.get('/buscar', ubicacionController.buscarUbicaciones); // sin autenticación
router.get('/:id', ubicacionController.obtenerUbicacionPorId); // sin autenticación
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('ubicaciones:actualizar'), actualizarUbicacionValidator, ubicacionController.actualizarUbicacion);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('ubicaciones:eliminar'), ubicacionController.eliminarUbicacion);

module.exports = router;