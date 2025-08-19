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

// Solo usuarios con permiso de gestión de espacios
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_espacios'));

// Rutas CRUD
router.post('/', crearEspacioValidator, espacioController.crearEspacio);
router.get('/', espacioController.obtenerTodosEspacios);
router.get('/buscar', espacioController.buscarEspacios); // Búsqueda pública
router.get('/:id', espacioController.obtenerEspacioPorId);
router.put('/:id', actualizarEspacioValidator, espacioController.actualizarEspacio);
router.delete('/:id', espacioController.eliminarEspacio);

// Gestión de contenido
router.post('/:id/contenido', agregarContenidoValidator, espacioController.agregarContenido);
router.delete('/:id/contenido/:contenidoId', espacioController.eliminarContenido);
router.get('/:id/contenido', espacioController.obtenerContenido);

// Atributos específicos
router.get('/:id/atributos/:tipo', obtenerAtributosValidator, espacioController.obtenerAtributos);

// Ocupantes
router.get('/:id/ocupantes', espacioController.obtenerOcupantes);

// Cambio de estado
router.patch('/:id/estado', cambiarEstadoValidator, espacioController.cambiarEstadoEspacio);

module.exports = router;