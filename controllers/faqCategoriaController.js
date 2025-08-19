const faqCategoriaService = require('../services/faqCategoriaService');
const { validationResult } = require('express-validator');

exports.crearCategoria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categoria = await faqCategoriaService.crearCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodasCategorias = async (req, res) => {
  try {
    const categorias = await faqCategoriaService.obtenerTodasCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await faqCategoriaService.obtenerCategoriaPorId(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categoriaActualizada = await faqCategoriaService.actualizarCategoria(req.params.id, req.body);
    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    const eliminado = await faqCategoriaService.eliminarCategoria(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizarOrdenCategorias = async (req, res) => {
  try {
    const { nuevasOrdenaciones } = req.body;
    await faqCategoriaService.actualizarOrdenCategorias(nuevasOrdenaciones);
    res.status(200).json({ message: 'Orden actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};