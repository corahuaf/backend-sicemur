const documentoPropiedadService = require('../services/documentoPropiedadService');
const { validationResult } = require('express-validator');

exports.asociarDocumentoPropiedad = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const documentoPropiedad = await documentoPropiedadService.asociarDocumentoPropiedad(req.body);
    res.status(201).json(documentoPropiedad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerDocumentosPropiedadPorEspacio = async (req, res) => {
  try {
    const documentos = await documentoPropiedadService.obtenerDocumentosPropiedadPorEspacio(req.params.espacioId);
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDocumentosPropiedadPorResponsable = async (req, res) => {
  try {
    const documentos = await documentoPropiedadService.obtenerDocumentosPropiedadPorResponsable(req.params.responsableId);
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarAsociacionDocumentoPropiedad = async (req, res) => {
  try {
    await documentoPropiedadService.eliminarAsociacionDocumentoPropiedad(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};