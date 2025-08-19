const ubicacionService = require('../services/ubicacionService');
const { validationResult } = require('express-validator');

exports.crearUbicacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ubicacion = await ubicacionService.crearUbicacion(req.body);
    res.status(201).json(ubicacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodasUbicaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ubicaciones = await ubicacionService.obtenerTodasUbicaciones(parseInt(page), parseInt(limit));
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerUbicacionPorId = async (req, res) => {
  try {
    const ubicacion = await ubicacionService.obtenerUbicacionPorId(req.params.id);
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json(ubicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarUbicacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ubicacionActualizada = await ubicacionService.actualizarUbicacion(req.params.id, req.body);
    if (!ubicacionActualizada) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json(ubicacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarUbicacion = async (req, res) => {
  try {
    const eliminado = await ubicacionService.eliminarUbicacion(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buscarUbicaciones = async (req, res) => {
  try {
    const { sector, manzana, lote } = req.query;
    const ubicaciones = await ubicacionService.buscarUbicaciones(sector, manzana, lote);
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};