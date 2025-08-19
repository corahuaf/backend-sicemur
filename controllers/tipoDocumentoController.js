const tipoDocumentoService = require('../services/tipoDocumentoService');
const { validationResult } = require('express-validator');

exports.crearTipoDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tipoDocumento = await tipoDocumentoService.crearTipoDocumento(req.body);
    res.status(201).json(tipoDocumento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodosTiposDocumento = async (req, res) => {
  try {
    const tiposDocumento = await tipoDocumentoService.obtenerTodosTiposDocumento();
    res.json(tiposDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTipoDocumentoPorId = async (req, res) => {
  try {
    const tipoDocumento = await tipoDocumentoService.obtenerTipoDocumentoPorId(req.params.id);
    if (!tipoDocumento) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json(tipoDocumento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarTipoDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tipoDocumentoActualizado = await tipoDocumentoService.actualizarTipoDocumento(req.params.id, req.body);
    if (!tipoDocumentoActualizado) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json(tipoDocumentoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarTipoDocumento = async (req, res) => {
  try {
    const eliminado = await tipoDocumentoService.eliminarTipoDocumento(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};