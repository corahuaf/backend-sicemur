const express = require('express');
const router = express.Router();
const ocupacionController = require('../controllers/ocupacionController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  asignarDifuntoValidator,
  liberarDifuntoValidator,
  transferirDifuntoValidator
} = require('../validators/ocupacionValidator');

// Solo usuarios con permiso de gestión de ocupaciones
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_ocupaciones'));

// Asignar difunto a espacio
router.post('/', asignarDifuntoValidator, ocupacionController.asignarDifunto);

// Liberar espacio de un difunto
router.delete('/espacio/:espacioId/difunto/:difuntoId', liberarDifuntoValidator, ocupacionController.liberarDifunto);

// Obtener ocupaciones por espacio
router.get('/espacio/:id', ocupacionController.obtenerOcupacionesPorEspacio);

// Obtener historial de ocupaciones por difunto
router.get('/difunto/:id', ocupacionController.obtenerOcupacionesPorDifunto);

// Obtener historial completo de un espacio (incluye liberaciones)
router.get('/historial/espacio/:id', ocupacionController.obtenerHistorialEspacio);

// Transferir difunto a otro espacio
router.post('/transferir', transferirDifuntoValidator, ocupacionController.transferirDifunto);

module.exports = router;