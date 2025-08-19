const express = require('express');
const router = express.Router();
const plantillaReporteController = require('../controllers/plantillaReporteController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearPlantillaValidator,
  actualizarPlantillaValidator
} = require('../validators/plantillaReporteValidator');

// Solo administradores pueden gestionar plantillas
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_reportes'));

// Rutas CRUD
router.post('/', crearPlantillaValidator, plantillaReporteController.crearPlantilla);
router.get('/', plantillaReporteController.obtenerTodasPlantillas);
router.get('/:id', plantillaReporteController.obtenerPlantillaPorId);
router.put('/:id', actualizarPlantillaValidator, plantillaReporteController.actualizarPlantilla);
router.delete('/:id', plantillaReporteController.eliminarPlantilla);

// Generar reporte desde plantilla
router.post('/:id/generar', plantillaReporteController.generarDesdePlantilla);

module.exports = router;