// routes/documentoPropiedadRoutes.js
const express = require('express');
const router = express.Router();
const documentoPropiedadController = require('../controllers/documentoPropiedadController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const { asociarDocumentoPropiedadValidator } = require('../validators/documentoPropiedadValidator');

router.post('/', auth.verifyToken, permisos.verificarPermiso('documentos:crear'), asociarDocumentoPropiedadValidator, documentoPropiedadController.asociarDocumentoPropiedad);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('documentos:eliminar'), documentoPropiedadController.eliminarAsociacionDocumentoPropiedad);
router.get('/espacio/:espacioId', auth.verifyToken, permisos.verificarPermiso('documentos:leer'), documentoPropiedadController.obtenerDocumentosPropiedadPorEspacio);
router.get('/responsable/:responsableId', auth.verifyToken, permisos.verificarPermiso('documentos:leer'), documentoPropiedadController.obtenerDocumentosPropiedadPorResponsable);

module.exports = router;