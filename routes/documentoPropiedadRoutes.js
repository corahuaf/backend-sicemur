const express = require('express');
const router = express.Router();
const documentoPropiedadController = require('../controllers/documentoPropiedadController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  asociarDocumentoPropiedadValidator
} = require('../validators/documentoPropiedadValidator');

// Solo usuarios con permiso de gestión de documentos
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_documentos'));

// Asociaciones
router.post('/', asociarDocumentoPropiedadValidator, documentoPropiedadController.asociarDocumentoPropiedad);
router.delete('/:id', documentoPropiedadController.eliminarAsociacionDocumentoPropiedad);

// Consultas
router.get('/espacio/:espacioId', documentoPropiedadController.obtenerDocumentosPropiedadPorEspacio);
router.get('/responsable/:responsableId', documentoPropiedadController.obtenerDocumentosPropiedadPorResponsable);

module.exports = router;