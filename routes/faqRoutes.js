// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearFAQValidator,
  actualizarFAQValidator
} = require('../validators/faqValidator');

// Lectura pública
router.get('/categoria/:categoriaId', faqController.obtenerFAQsPorCategoria);
router.get('/populares', faqController.obtenerFAQsPopulares);
router.get('/buscar', faqController.buscarFAQs);
router.get('/:id', faqController.obtenerFAQPorId);

// Gestión (CRUD protegido)
router.post('/', auth.verifyToken, permisos.verificarPermiso('faqs:crear'), crearFAQValidator, faqController.crearFAQ);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('faqs:actualizar'), actualizarFAQValidator, faqController.actualizarFAQ);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('faqs:eliminar'), faqController.eliminarFAQ);

module.exports = router;