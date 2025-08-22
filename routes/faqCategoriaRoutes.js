// routes/faqCategoriaRoutes.js
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

router.post('/', auth.verifyToken, permisos.verificarPermiso('faqs:crear'), crearCategoriaValidator, faqCategoriaController.crearCategoria);
router.get('/', faqCategoriaController.obtenerTodasCategorias);
router.get('/:id', faqCategoriaController.obtenerCategoriaPorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('faqs:actualizar'), actualizarCategoriaValidator, faqCategoriaController.actualizarCategoria);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('faqs:eliminar'), faqCategoriaController.eliminarCategoria);
router.put('/orden/actualizar', auth.verifyToken, permisos.verificarPermiso('faqs:actualizar'), actualizarOrdenValidator, faqCategoriaController.actualizarOrdenCategorias);

module.exports = router;