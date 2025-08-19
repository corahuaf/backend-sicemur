const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearUbicacionValidator,
  actualizarUbicacionValidator
} = require('../validators/ubicacionValidator');

// Solo usuarios con permiso de gestión de ubicaciones
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_ubicaciones'));

// Rutas CRUD
router.post('/', crearUbicacionValidator, ubicacionController.crearUbicacion);
router.get('/', ubicacionController.obtenerTodasUbicaciones);
router.get('/buscar', ubicacionController.buscarUbicaciones); // Búsqueda sin autenticación
router.get('/:id', ubicacionController.obtenerUbicacionPorId);
router.put('/:id', actualizarUbicacionValidator, ubicacionController.actualizarUbicacion);
router.delete('/:id', ubicacionController.eliminarUbicacion);

module.exports = router;