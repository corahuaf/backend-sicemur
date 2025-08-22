// routes/ocupacionRoutes.js
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

// Middleware global: solo acceso a usuarios con permisos sobre ocupaciones
router.use(auth.verifyToken, permisos.verificarPermiso('ocupaciones:leer')); // leer es el mínimo

// Asignar (crear ocupación)
router.post('/', auth.verifyToken, permisos.verificarPermiso('ocupaciones:crear'), asignarDifuntoValidator, ocupacionController.asignarDifunto);

// Liberar (eliminar ocupación)
router.delete(
  '/espacio/:espacioId/difunto/:difuntoId',
  auth.verifyToken,
  permisos.verificarPermiso('ocupaciones:eliminar'),
  liberarDifuntoValidator,
  ocupacionController.liberarDifunto
);

// Consultas de solo lectura
router.get('/espacio/:id', ocupacionController.obtenerOcupacionesPorEspacio);
router.get('/difunto/:id', ocupacionController.obtenerOcupacionesPorDifunto);
router.get('/historial/espacio/:id', ocupacionController.obtenerHistorialEspacio);

// Transferir (actualización especial)
router.post('/transferir', auth.verifyToken, permisos.verificarPermiso('ocupaciones:actualizar'), transferirDifuntoValidator, ocupacionController.transferirDifunto);

module.exports = router;