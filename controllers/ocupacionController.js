const ocupacionService = require('../services/ocupacionService');
const { validationResult } = require('express-validator');

exports.asignarDifunto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ocupacion = await ocupacionService.asignarDifunto(req.body);
    res.status(201).json(ocupacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.liberarDifunto = async (req, res) => {
  try {
    const { espacioId, difuntoId } = req.params;
    await ocupacionService.liberarDifunto(parseInt(espacioId), parseInt(difuntoId));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerOcupacionesPorEspacio = async (req, res) => {
  try {
    const ocupaciones = await ocupacionService.obtenerOcupacionesPorEspacio(req.params.id);
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOcupacionesPorDifunto = async (req, res) => {
  try {
    const ocupaciones = await ocupacionService.obtenerOcupacionesPorDifunto(req.params.id);
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerHistorialEspacio = async (req, res) => {
  try {
    const historial = await ocupacionService.obtenerHistorialEspacio(req.params.id);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transferirDifunto = async (req, res) => {
  try {
    const { espacioOrigenId, difuntoId, espacioDestinoId } = req.body;
    const transferencia = await ocupacionService.transferirDifunto(
      parseInt(espacioOrigenId),
      parseInt(difuntoId),
      parseInt(espacioDestinoId)
    );
    res.json(transferencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};