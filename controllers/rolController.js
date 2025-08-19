const rolService = require('../services/rolService');
const { validationResult } = require('express-validator');

exports.crearRol = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rol = await rolService.crearRol(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodosRoles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const roles = await rolService.obtenerTodosRoles(parseInt(page), parseInt(limit));
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerRolPorId = async (req, res) => {
  try {
    const rol = await rolService.obtenerRolPorId(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarRol = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rolActualizado = await rolService.actualizarRol(req.params.id, req.body);
    if (!rolActualizado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rolActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarRol = async (req, res) => {
  try {
    const eliminado = await rolService.eliminarRol(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.asignarPermisos = async (req, res) => {
  try {
    const { permisos } = req.body;
    const rol = await rolService.asignarPermisos(req.params.id, permisos);
    res.json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerPermisos = async (req, res) => {
  try {
    const permisos = await rolService.obtenerPermisos(req.params.id);
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};