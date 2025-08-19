const express = require('express');
const router = express.Router();
const tipoDocumentoController = require('../controllers/tipoDocumentoController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearTipoDocumentoValidator,
  actualizarTipoDocumentoValidator
} = require('../validators/tipoDocumentoValidator');

// Solo administradores pueden gestionar tipos de documento
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_catalogos'));

// Rutas CRUD
router.post('/', crearTipoDocumentoValidator, tipoDocumentoController.crearTipoDocumento);
router.get('/', tipoDocumentoController.obtenerTodosTiposDocumento);
router.get('/:id', tipoDocumentoController.obtenerTipoDocumentoPorId);
router.put('/:id', actualizarTipoDocumentoValidator, tipoDocumentoController.actualizarTipoDocumento);
router.delete('/:id', tipoDocumentoController.eliminarTipoDocumento);

module.exports = router;