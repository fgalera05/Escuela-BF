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

  async function modificarEspecialidadPorId(req, res, next) {
    const especialidadId = req.params.id;
    const especialidad = req.body.especialidad;

    try {
      const existeEspecialidad = await Especialidad.findById(especialidadId);

      if(!existeEspecialidad){
        logger.debug('La especialidad no existe');
        return res.status(404).json('La especialidad no existe');
      }

      existeEspecialidad.especialidad = especialidad;
      await existeEspecialidad.save();

      res.status(200).json(existeEspecialidad);
    } catch (err) {
      next(err)
    }
  }

module.exports = {
  obtenerEspecialidades,
  modificarEspecialidadPorId,
}