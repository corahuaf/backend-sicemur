const espacioService = require('../services/espacioService');
const { validationResult } = require('express-validator');
const db = require('../models');

exports.crearEspacio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const espacio = await espacioService.crearEspacio(req.body);
    res.status(201).json(espacio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodosEspacios = async (req, res) => {
  try {
    const { page = 1, limit = 10, tipo, estado } = req.query;
    const espacios = await espacioService.obtenerTodosEspacios(parseInt(page), parseInt(limit), tipo, estado);
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEspacioPorId = async (req, res) => {
  try {
    const espacio = await espacioService.obtenerEspacioPorId(req.params.id);
    if (!espacio) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarEspacio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const espacioActualizado = await espacioService.actualizarEspacio(req.params.id, req.body);
    if (!espacioActualizado) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }
    res.json(espacioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarEspacio = async (req, res) => {
  try {
    const eliminado = await espacioService.eliminarEspacio(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerAtributos = async (req, res) => {
  try {
    const atributos = await espacioService.obtenerAtributos(req.params.id, req.params.tipo);
    res.json(atributos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.agregarContenido = async (req, res) => {
  try {
    const { contenido_id } = req.body;
    await espacioService.agregarContenido(req.params.id, contenido_id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarContenido = async (req, res) => {
  try {
    await espacioService.eliminarContenido(req.params.id, req.params.contenidoId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerContenido = async (req, res) => {
  try {
    const contenido = await espacioService.obtenerContenido(req.params.id);
    res.json(contenido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOcupantes = async (req, res) => {
  try {
    const ocupantes = await espacioService.obtenerOcupantes(req.params.id);
    res.json(ocupantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarEspacios = async (req, res) => {
  try {
    const { codigo, tipo, estado } = req.query;
    const espacios = await espacioService.buscarEspacios(codigo, tipo, estado);
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cambiarEstadoEspacio = async (req, res) => {
  try {
    const { estado } = req.body;
    const espacioActualizado = await espacioService.cambiarEstadoEspacio(req.params.id, estado);
    res.json(espacioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controllers/espacioController.js
exports.crearAtributos = async (req, res) => {
  const { id, tipo } = req.params;
  const data = { espacio_id: Number(id), ...req.body };

  switch (tipo.toLowerCase()) {
    case 'lote':
      await db.AtributosLote.create(data);
      break;
    case 'nicho':
      await db.AtributosNicho.create(data);
      break;
    case 'tumba':
      await db.AtributosTumba.create(data);
      break;
    case 'mausoleo':
      await db.AtributosMausoleo.create(data);
      break;
    case 'pabellon':
      await db.AtributosPabellon.create(data);
      break;
    default:
      return res.status(400).json({ error: 'Tipo de atributo inválido' });
  }

  res.status(201).json({ ok: true });
};