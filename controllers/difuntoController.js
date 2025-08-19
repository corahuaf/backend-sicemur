const difuntoService = require('../services/difuntoService');
const { validationResult } = require('express-validator');

exports.crearDifunto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const difunto = await difuntoService.crearDifunto(req.body);
    res.status(201).json(difunto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodosDifuntos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const difuntos = await difuntoService.obtenerTodosDifuntos(parseInt(page), parseInt(limit));
    res.json(difuntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDifuntoPorId = async (req, res) => {
  try {
    const difunto = await difuntoService.obtenerDifuntoPorId(req.params.id);
    if (!difunto) {
      return res.status(404).json({ error: 'Difunto no encontrado' });
    }
    res.json(difunto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarDifunto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const difuntoActualizado = await difuntoService.actualizarDifunto(req.params.id, req.body);
    if (!difuntoActualizado) {
      return res.status(404).json({ error: 'Difunto no encontrado' });
    }
    res.json(difuntoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarDifunto = async (req, res) => {
  try {
    const eliminado = await difuntoService.eliminarDifunto(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Difunto no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buscarDifuntos = async (req, res) => {
  try {
    const { nombres, apellido } = req.query;
    const difuntos = await difuntoService.buscarDifuntos(nombres, apellido);
    res.json(difuntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOcupacionesPorDifunto = async (req, res) => {
  try {
    const ocupaciones = await difuntoService.obtenerOcupacionesPorDifunto(req.params.id);
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};