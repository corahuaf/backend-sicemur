const reporteService = require('../services/reporteService');
const { validationResult } = require('express-validator');

exports.generarReporte = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const reporte = await reporteService.generarReporte(req.body, req.userId);
    res.status(201).json(reporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await reporteService.obtenerReportePorId(req.params.id);
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.descargarReporte = async (req, res) => {
  try {
    const { rutaArchivo, nombreArchivo } = await reporteService.obtenerRutaReporte(req.params.id);
    
    res.download(rutaArchivo, nombreArchivo, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al descargar el reporte' });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerReportesPorUsuario = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const reportes = await reporteService.obtenerReportesPorUsuario(req.userId, parseInt(page), parseInt(limit));
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarReporte = async (req, res) => {
  try {
    await reporteService.eliminarReporte(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerReportesRecientes = async (req, res) => {
  try {
    const reportes = await reporteService.obtenerReportesRecientes(req.userId);
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};