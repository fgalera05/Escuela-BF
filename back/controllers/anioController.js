const Anio = require('../schemas/anioSchema');
const logger = require('../logger');

async function obtenerAnios(req, res, next) {
    try {
      const anios = await Anio.find().populate('especialidad').populate('materias')
      res.status(200).json(anios)
    } catch (err) {
      next(err)
    }
  }


module.exports = {
    obtenerAnios,
}