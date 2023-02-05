const Usuario = require('../schemas/usuarioSchema');
const Rol = require('../schemas/rolSchema');
const logger = require('../logger');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

async function registrarUsuario(req, res, next) {
  const nuevoUsuario = req.body;

  try {
    const usuario = await Usuario.findOne({ usuario: nuevoUsuario.usuario })

    if (usuario) {
      logger.error('El usuario ya existe')
      return res.status(400).json('El usuario ya existe')
    }

    const rol = await Rol.findById(nuevoUsuario.rol)

    if (!rol) {
      logger.error('El rol no existe')
      return res.status(404).json('El rol no existe')
    }

    const salt = bcrypt.genSaltSync(10);
    const pass = nuevoUsuario.password
    const hash = bcrypt.hashSync(pass, salt);

    const usuarioARegistrar = await Usuario.create(
      {
        usuario: nuevoUsuario.usuario,
        password: hash,
        datos: {
          nombre: nuevoUsuario.nombre,
          apellido: nuevoUsuario.apellido,
        },
        rol: rol,
        isActive: true,
      }
    )

    return res.status(200).json(usuarioARegistrar);
  } catch (err) {
    next(err);
  }

}

module.exports = {
  registrarUsuario
}