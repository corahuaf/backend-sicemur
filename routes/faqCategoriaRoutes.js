const express = require('express');
const router = express.Router();
const faqCategoriaController = require('../controllers/faqCategoriaController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearCategoriaValidator,
  actualizarCategoriaValidator,
  actualizarOrdenValidator
} = require('../validators/faqCategoriaValidator');

// Solo administradores pueden gestionar categorías
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_faqs'));

// Rutas CRUD
router.post('/', crearCategoriaValidator, faqCategoriaController.crearCategoria);
router.get('/', faqCategoriaController.obtenerTodasCategorias);
router.get('/:id', faqCategoriaController.obtenerCategoriaPorId);
router.put('/:id', actualizarCategoriaValidator, faqCategoriaController.actualizarCategoria);
router.delete('/:id', faqCategoriaController.eliminarCategoria);

// Ordenación
router.put('/orden/actualizar', actualizarOrdenValidator, faqCategoriaController.actualizarOrdenCategorias);

module.exports = router;