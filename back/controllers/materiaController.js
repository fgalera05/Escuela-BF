const Materia = require('../schemas/materiaSchema');
const logger = require('../logger');

async function obtenerMaterias(req, res, next) {
    try {
      const materias = await Materia.find();
      return res.status(200).json(materias);
    } catch (err) {
      next(err);
    }
  
  }

module.exports = {
    obtenerMaterias
}