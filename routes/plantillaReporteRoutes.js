const express = require('express');
const router = express.Router();
const plantillaReporteController = require('../controllers/plantillaReporteController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearPlantillaValidator,
  actualizarPlantillaValidator
} = require('../validators/plantillaReporteValidator');

router.post('/', auth.verifyToken, permisos.verificarPermiso('reportes:crear'), crearPlantillaValidator, plantillaReporteController.crearPlantilla);
router.get('/', auth.verifyToken, permisos.verificarPermiso('reportes:leer'), plantillaReporteController.obtenerTodasPlantillas);
router.get('/:id', auth.verifyToken, permisos.verificarPermiso('reportes:leer'), plantillaReporteController.obtenerPlantillaPorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('reportes:actualizar'), actualizarPlantillaValidator, plantillaReporteController.actualizarPlantilla);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('reportes:eliminar'), plantillaReporteController.eliminarPlantilla);
router.post('/:id/generar', auth.verifyToken, permisos.verificarPermiso('reportes:crear'), plantillaReporteController.generarDesdePlantilla);

module.exports = router;