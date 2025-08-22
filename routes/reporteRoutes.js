const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const { generarReporteValidator } = require('../validators/reporteValidator');

router.use(auth.verifyToken);

router.post('/generar', generarReporteValidator, reporteController.generarReporte);
router.get('/usuario', reporteController.obtenerReportesPorUsuario);
router.get('/recientes', reporteController.obtenerReportesRecientes);
router.get('/:id', reporteController.obtenerReportePorId);
router.get('/:id/descargar', reporteController.descargarReporte);
router.delete('/:id', permisos.verificarPermiso('reportes:eliminar'), reporteController.eliminarReporte);

module.exports = router;