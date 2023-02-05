const Usuario = require('../schemas/usuarioSchema');
const Rol = require('../schemas/rolSchema');
const logger = require('../logger');
const jwt = require('jsonwebtoken')

async function login(req, res, next) {
  try {
    const usuario = await Usuario.findOne({ usuario: req.body.usuario }, '+password').populate('rol');

    if (!usuario) {
      logger.error('El usuario no existe');
      return res.status(404).json('El usuario no existe');
    }
    const isValid = await usuario.checkPassword(req.body.password);

    if(usuario && isValid.isOk){
      const tokenData = {
        usuario: usuario.usuario,
        rol: usuario.rol.rol
      }
      
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});
      return res.status(200).json({isValid, token: token});

    }else{
      logger.error('Credenciales inválidas!');
      return res.status(400).json(isValid);
    }

    
  } catch (err) {
    next(err);
  }
}


module.exports = {
  login,
}