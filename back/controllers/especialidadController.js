const Especialidad = require('../schemas/especialidadSchema');
const logger = require('../logger');

async function obtenerEspecialidades(req, res, next) {
    try {
      const especialidades = await Especialidad.find()
      res.status(200).json(especialidades)
    } catch (err) {
      next(err)
    }
  }

module.exports = {obtenerEspecialidades}