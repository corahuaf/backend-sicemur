// routes/tipoDocumentoRoutes.js
const express = require('express');
const router = express.Router();
const tipoDocumentoController = require('../controllers/tipoDocumentoController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearTipoDocumentoValidator,
  actualizarTipoDocumentoValidator
} = require('../validators/tipoDocumentoValidator');

/* ---------- CRUD por acción con permisos separados ---------- */
router.post('/', auth.verifyToken, permisos.verificarPermiso('catalogos:crear'), crearTipoDocumentoValidator, tipoDocumentoController.crearTipoDocumento);

router.get('/', tipoDocumentoController.obtenerTodosTiposDocumento); // público (ajustá si querés protegerla)

router.get('/:id', tipoDocumentoController.obtenerTipoDocumentoPorId); // público (ajustá si querés protegerla)

router.put('/:id', auth.verifyToken, permisos.verificarPermiso('catalogos:actualizar'), actualizarTipoDocumentoValidator, tipoDocumentoController.actualizarTipoDocumento);

router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('catalogos:eliminar'), tipoDocumentoController.eliminarTipoDocumento);

module.exports = router;