// routes/documentoRoutes.js
const express = require('express');
const router = express.Router();
const documentoController = require('../controllers/documentoController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
  crearDocumentoValidator,
  subirArchivoValidator
} = require('../validators/documentoValidator');

// CRUD documentos
router.post('/', auth.verifyToken, permisos.verificarPermiso('documentos:crear'), crearDocumentoValidator, documentoController.crearDocumento);
router.get('/:id', auth.verifyToken, permisos.verificarPermiso('documentos:leer'), documentoController.obtenerDocumentoPorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('documentos:actualizar'), documentoController.actualizarDocumento);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('documentos:eliminar'), documentoController.eliminarDocumento);

// Listado por tipo
router.get('/tipo/:tipoId', auth.verifyToken, permisos.verificarPermiso('documentos:leer'), documentoController.obtenerDocumentosPorTipo);

// Gestión de archivos
router.post('/:id/archivo', auth.verifyToken, permisos.verificarPermiso('documentos:actualizar'), upload.single('archivo'), subirArchivoValidator, documentoController.subirArchivo);
router.get('/:id/archivo', auth.verifyToken, permisos.verificarPermiso('documentos:leer'), documentoController.descargarArchivo);

module.exports = router;