const Materia = require('../schemas/materiaSchema');
const logger = require('../logger');

async function obtenerMaterias(req, res, next) {
    try {
      const materias = await Materia.find()
      return res.status(200).json(materias);
    } catch (err) {
      next(err);
    }
  }

  async function modificarMateria(req, res, next) {
    const idMateria = req.params.id;
    const materia = req.body.materia;

    try {
      const existeMateria = await Materia.findById(idMateria)

      if(!existeMateria){
        logger.error("La materia no existe");
        return res.status(404).json("La materia no existe");
      }

      existeMateria.materia = materia;
      await existeMateria.save();
      console.log(existeMateria);
      return res.status(200).json(existeMateria);
    } catch (err) {
      next(err);
    }
  }

module.exports = {
    obtenerMaterias,
    modificarMateria,
}