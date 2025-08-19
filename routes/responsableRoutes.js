const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearResponsableValidator,
  actualizarResponsableValidator
} = require('../validators/responsableValidator');

// Solo usuarios con permiso de gestión de responsables
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_responsables'));

// Rutas CRUD
router.post('/', crearResponsableValidator, responsableController.crearResponsable);
router.get('/', responsableController.obtenerTodosResponsables);
router.get('/buscar', responsableController.buscarResponsables); // Búsqueda pública
router.get('/:id', responsableController.obtenerResponsablePorId);
router.put('/:id', actualizarResponsableValidator, responsableController.actualizarResponsable);
router.delete('/:id', responsableController.eliminarResponsable);

// Relaciones
router.get('/:id/alquileres', responsableController.obtenerAlquileresPorResponsable);
router.get('/:id/documentos', responsableController.obtenerDocumentosPorResponsable);

module.exports = router;