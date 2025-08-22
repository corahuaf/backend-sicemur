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

router.post('/', auth.verifyToken, permisos.verificarPermiso('roles:crear'), crearRolValidator, rolController.crearRol);
router.get('/', auth.verifyToken, permisos.verificarPermiso('roles:leer'), rolController.obtenerTodosRoles);
router.get('/:id', auth.verifyToken, permisos.verificarPermiso('roles:leer'), rolController.obtenerRolPorId);
router.put('/:id', auth.verifyToken, permisos.verificarPermiso('roles:actualizar'), actualizarRolValidator, rolController.actualizarRol);
router.delete('/:id', auth.verifyToken, permisos.verificarPermiso('roles:eliminar'), rolController.eliminarRol);

router.post('/:id/permisos', auth.verifyToken, permisos.verificarPermiso('roles:actualizar'), asignarPermisosValidator, rolController.asignarPermisos);
router.get('/:id/permisos', auth.verifyToken, permisos.verificarPermiso('roles:leer'), rolController.obtenerPermisos);

module.exports = router;