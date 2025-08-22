const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre_usuario, contrasena, nombres, ape_paterno, ape_materno, rol, email } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await db.Usuario.findOne({ where: { nombre_usuario } });
    if (usuarioExistente) {
      return res.status(400).send({ message: 'El nombre de usuario ya está en uso' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    const usuario = await db.Usuario.create({
      nombre_usuario,
      contrasena: hashedPassword,
      nombres,
      ape_paterno,
      ape_materno,
      rol,
      email
    });

    res.status(201).send({
      id: usuario.id_usuario,
      nombre_usuario: usuario.nombre_usuario,
      email: usuario.email
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;

    // Buscar usuario
    const usuario = await db.Usuario.findOne({
      where: { nombre_usuario },
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario',
        attributes: ['nombre']
      }]
    });

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const passwordValid = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValid) {
      return res.status(401).send({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        rol: usuario.rol_usuario.nombre,
        permisos: usuario.rol_usuario.permisos || []
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.send({
      id: usuario.id_usuario,
      nombre_usuario: usuario.nombre_usuario,
      email: usuario.email,
      rol: usuario.rol_usuario.nombre,
      token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPerfil = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.userId, {
      attributes: { exclude: ['contrasena'] },
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario',
        attributes: ['nombre']
      }]
    });

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.send(usuario);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombres, ape_paterno, ape_materno, email } = req.body;

    const [updated] = await db.Usuario.update({
      nombres,
      ape_paterno,
      ape_materno,
      email
    }, {
      where: { id_usuario: req.userId }
    });

    if (updated) {
      const usuarioActualizado = await db.Usuario.findByPk(req.userId, {
        attributes: { exclude: ['contrasena'] }
      });
      return res.send(usuarioActualizado);
    }

    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll({
      attributes: { exclude: ['contrasena'] },
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario',
        attributes: ['nombre']
      }]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['contrasena'] },
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario',
        attributes: ['nombre']
      }]
    });

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.eliminarUsuario = async (req, res) => {
  try {
    const deleted = await db.Usuario.destroy({
      where: { id_usuario: req.params.id }
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.actualizarOtroUsuario = async (req, res) => {
  try {
    const { nombres, ape_paterno, ape_materno, email, rol } = req.body;

    const [updated] = await db.Usuario.update(
      { nombres, ape_paterno, ape_materno, email, rol },
      { where: { id_usuario: req.params.id } }
    );

    if (!updated) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    const usuarioActualizado = await db.Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['contrasena'] },
      include: [{
        model: db.RolUsuario,
        as: 'rol_usuario',
        attributes: ['nombre']
      }]
    });

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};