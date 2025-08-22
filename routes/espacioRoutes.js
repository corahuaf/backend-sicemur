// routes/espacioRoutes.js
const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacioController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearEspacioValidator,
  actualizarEspacioValidator,
  agregarContenidoValidator,
  obtenerAtributosValidator,
  cambiarEstadoValidator
} = require('../validators/espacioValidator');

// Búsqueda y consultas públicas
router.get('/buscar', espacioController.buscarEspacios);
router.get('/:id', espacioController.obtenerEspacioPorId);
router.get('/:id/atributos/:tipo', obtenerAtributosValidator, espacioController.obtenerAtributos);
router.get('/:id/ocupantes', espacioController.obtenerOcupantes);
router.get('/', espacioController.obtenerTodosEspacios);

// Gestión (CRUD y administración)
router.post('/', auth.verifyToken, permisos.verificarPermiso('espacios:crear'), crearEspacioValidator, espacioController.crearEspacio);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('espacios:actualizar'), actualizarEspacioValidator, espacioController.actualizarEspacio);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('espacios:eliminar'), espacioController.eliminarEspacio);
router.patch('/:id/estado', auth.verifyToken, permisos.verificarPermiso('espacios:actualizar'), cambiarEstadoValidator, espacioController.cambiarEstadoEspacio);
router.post('/:id/contenido', auth.verifyToken, permisos.verificarPermiso('espacios:actualizar'), agregarContenidoValidator, espacioController.agregarContenido);
router.delete('/:id/contenido/:contenidoId', auth.verifyToken, permisos.verificarPermiso('espacios:actualizar'), espacioController.eliminarContenido);
router.get('/:id/contenido', auth.verifyToken, permisos.verificarPermiso('espacios:leer'), espacioController.obtenerContenido);

module.exports = router;