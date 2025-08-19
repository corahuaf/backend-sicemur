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

// Solo usuarios con permiso de gestión de documentos
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_documentos'));

// Rutas CRUD
router.post('/', crearDocumentoValidator, documentoController.crearDocumento);
router.get('/:id', documentoController.obtenerDocumentoPorId);
router.put('/:id', documentoController.actualizarDocumento);
router.delete('/:id', documentoController.eliminarDocumento);

// Rutas por tipo
router.get('/tipo/:tipoId', documentoController.obtenerDocumentosPorTipo);

// Gestión de archivos
router.post('/:id/archivo', upload.single('archivo'), subirArchivoValidator, documentoController.subirArchivo);
router.get('/:id/archivo', documentoController.descargarArchivo);

module.exports = router;