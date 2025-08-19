const responsableService = require('../services/responsableService');
const { validationResult } = require('express-validator');

exports.crearResponsable = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const responsable = await responsableService.crearResponsable(req.body);
    res.status(201).json(responsable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodosResponsables = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const responsables = await responsableService.obtenerTodosResponsables(parseInt(page), parseInt(limit));
    res.json(responsables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerResponsablePorId = async (req, res) => {
  try {
    const responsable = await responsableService.obtenerResponsablePorId(req.params.id);
    if (!responsable) {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }
    res.json(responsable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarResponsable = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const responsableActualizado = await responsableService.actualizarResponsable(req.params.id, req.body);
    if (!responsableActualizado) {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }
    res.json(responsableActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarResponsable = async (req, res) => {
  try {
    const eliminado = await responsableService.eliminarResponsable(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buscarResponsables = async (req, res) => {
  try {
    const { dni, nombre, apellido } = req.query;
    const responsables = await responsableService.buscarResponsables(dni, nombre, apellido);
    res.json(responsables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerAlquileresPorResponsable = async (req, res) => {
  try {
    const alquileres = await responsableService.obtenerAlquileresPorResponsable(req.params.id);
    res.json(alquileres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDocumentosPorResponsable = async (req, res) => {
  try {
    const documentos = await responsableService.obtenerDocumentosPorResponsable(req.params.id);
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};