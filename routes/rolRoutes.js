const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const auth = require('../middlewares/auth');
const permisos = require('../middlewares/permisosMiddleware');
const {
  crearRolValidator,
  actualizarRolValidator,
  asignarPermisosValidator
} = require('../validators/rolValidator');

// Solo administradores pueden gestionar roles
router.use(auth.verifyToken, permisos.verificarPermiso('gestion_roles'));

// Rutas CRUD
router.post('/', crearRolValidator, rolController.crearRol);
router.get('/', rolController.obtenerTodosRoles);
router.get('/:id', rolController.obtenerRolPorId);
router.put('/:id', actualizarRolValidator, rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);

// Gestión de permisos
router.post('/:id/permisos', asignarPermisosValidator, rolController.asignarPermisos);
router.get('/:id/permisos', rolController.obtenerPermisos);

module.exports = router;