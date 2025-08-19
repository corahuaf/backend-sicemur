const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');

// Ruta GET /api/usuarios
router.get('/', auth.verifyToken, usuarioController.listarUsuarios);
router.get('/:id', auth.verifyToken, usuarioController.getUsuarioPorId);
router.delete('/:id', auth.verifyToken, usuarioController.eliminarUsuario);

// Rutas públicas
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

// Rutas protegidas
router.get('/perfil', auth.verifyToken, usuarioController.getPerfil);
router.put('/actualizar', auth.verifyToken, usuarioController.actualizarUsuario);

module.exports = router;