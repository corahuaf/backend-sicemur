const plantillaReporteService = require('../services/plantillaReporteService');
const { validationResult } = require('express-validator');

exports.crearPlantilla = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const plantilla = await plantillaReporteService.crearPlantilla(req.body);
    res.status(201).json(plantilla);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerPlantillaPorId = async (req, res) => {
  try {
    const plantilla = await plantillaReporteService.obtenerPlantillaPorId(req.params.id);
    if (!plantilla) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    res.json(plantilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarPlantilla = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const plantillaActualizada = await plantillaReporteService.actualizarPlantilla(req.params.id, req.body);
    if (!plantillaActualizada) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    res.json(plantillaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarPlantilla = async (req, res) => {
  try {
    await plantillaReporteService.eliminarPlantilla(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodasPlantillas = async (req, res) => {
  try {
    const plantillas = await plantillaReporteService.obtenerTodasPlantillas();
    res.json(plantillas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generarDesdePlantilla = async (req, res) => {
  try {
    const reporte = await plantillaReporteService.generarDesdePlantilla(req.params.id, req.body.parametros, req.userId);
    res.status(201).json(reporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};