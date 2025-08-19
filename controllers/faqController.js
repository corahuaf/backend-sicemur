const faqService = require('../services/faqService');
const { validationResult } = require('express-validator');

exports.crearFAQ = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const faq = await faqService.crearFAQ(req.body, req.userId);
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerFAQPorId = async (req, res) => {
  try {
    const faq = await faqService.obtenerFAQPorId(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ no encontrada' });
    }
    
    // Incrementar contador de visitas
    await faqService.incrementarVisitas(req.params.id);
    
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarFAQ = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const faqActualizada = await faqService.actualizarFAQ(req.params.id, req.body, req.userId);
    if (!faqActualizada) {
      return res.status(404).json({ error: 'FAQ no encontrada' });
    }
    res.json(faqActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarFAQ = async (req, res) => {
  try {
    await faqService.eliminarFAQ(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerFAQsPorCategoria = async (req, res) => {
  try {
    const faqs = await faqService.obtenerFAQsPorCategoria(req.params.categoriaId);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFAQsPopulares = async (req, res) => {
  try {
    const faqs = await faqService.obtenerFAQsPopulares();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarFAQs = async (req, res) => {
  try {
    const { termino } = req.query;
    const faqs = await faqService.buscarFAQs(termino);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};