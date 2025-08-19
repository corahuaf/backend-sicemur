const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearFAQValidator,
  actualizarFAQValidator
} = require('../validators/faqValidator');

// Rutas públicas (no requieren autenticación para lectura)
router.get('/categoria/:categoriaId', faqController.obtenerFAQsPorCategoria);
router.get('/populares', faqController.obtenerFAQsPopulares);
router.get('/buscar', faqController.buscarFAQs);
router.get('/:id', faqController.obtenerFAQPorId);

// Rutas protegidas para gestión
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_faqs'));

// Rutas CRUD
router.post('/', crearFAQValidator, faqController.crearFAQ);
router.put('/:id', actualizarFAQValidator, faqController.actualizarFAQ);
router.delete('/:id', faqController.eliminarFAQ);

module.exports = router;