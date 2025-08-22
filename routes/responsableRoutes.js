const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearResponsableValidator,
  actualizarResponsableValidator
} = require('../validators/responsableValidator');

router.post('/', auth.verifyToken, permisos.verificarPermiso('responsables:crear'), crearResponsableValidator, responsableController.crearResponsable);
router.get('/', auth.verifyToken, permisos.verificarPermiso('responsables:leer'), responsableController.obtenerTodosResponsables);
router.get('/buscar', responsableController.buscarResponsables);
router.get('/:id', auth.verifyToken, permisos.verificarPermiso('responsables:leer'), responsableController.obtenerResponsablePorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('responsables:actualizar'), actualizarResponsableValidator, responsableController.actualizarResponsable);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('responsables:eliminar'), responsableController.eliminarResponsable);
router.get('/:id/alquileres', auth.verifyToken, permisos.verificarPermiso('responsables:leer'), responsableController.obtenerAlquileresPorResponsable);
router.get('/:id/documentos', auth.verifyToken, permisos.verificarPermiso('responsables:leer'), responsableController.obtenerDocumentosPorResponsable);

module.exports = router;