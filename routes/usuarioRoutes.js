// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');

/* ------------------ RUTAS PÚBLICAS ------------------ */
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

/* ------------------ RUTAS PRIVADAS ------------------ */
// Perfil propio (sin permisos extra, solo autenticado)
router.get('/perfil', auth.verifyToken, usuarioController.getPerfil);
router.put('/actualizar', auth.verifyToken, usuarioController.actualizarUsuario);

// Gestión de usuarios (requiere permisos explícitos)
router.get('/', auth.verifyToken, permisos.verificarPermiso('usuarios:leer'), usuarioController.listarUsuarios);
router.get('/:id', auth.verifyToken, permisos.verificarPermiso('usuarios:leer'), usuarioController.getUsuarioPorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('usuarios:actualizar'), usuarioController.actualizarOtroUsuario);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('usuarios:eliminar'), usuarioController.eliminarUsuario);

module.exports = router;