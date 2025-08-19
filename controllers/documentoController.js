const documentoService = require('../services/documentoService');
const { validationResult } = require('express-validator');

exports.crearDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const documento = await documentoService.crearDocumento(req.body, req.userId);
    res.status(201).json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerDocumentoPorId = async (req, res) => {
  try {
    const documento = await documentoService.obtenerDocumentoPorId(req.params.id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json(documento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const documentoActualizado = await documentoService.actualizarDocumento(req.params.id, req.body, req.userId);
    if (!documentoActualizado) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json(documentoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarDocumento = async (req, res) => {
  try {
    await documentoService.eliminarDocumento(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerDocumentosPorTipo = async (req, res) => {
  try {
    const documentos = await documentoService.obtenerDocumentosPorTipo(req.params.tipoId);
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.subirArchivo = async (req, res) => {
  try {
    const documento = await documentoService.subirArchivo(req.params.id, req.file);
    res.json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.descargarArchivo = async (req, res) => {
  try {
    const { rutaArchivo, nombreArchivo } = await documentoService.descargarArchivo(req.params.id);

    res.download(rutaArchivo, nombreArchivo, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al descargar el archivo' });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};