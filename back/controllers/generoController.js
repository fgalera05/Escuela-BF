const Genero = require('../schemas/generoSchema');
const logger = require('../logger');

async function obtenerGeneros(req, res, next) {
    try {
      const generos = await Genero.find()
      res.status(200).json(generos)
    } catch (err) {
      next(err)
    }
  }


module.exports = {
    obtenerGeneros,
}