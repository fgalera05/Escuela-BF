const mongoose = require('mongoose')

const especialidades = [
  {
    _id: mongoose.Types.ObjectId('000000000000000000000000'),
    especialidad: "Ciclo Básico"
  },
  {
    _id: mongoose.Types.ObjectId('000000000000000000000001'),
    especialidad: "Maestro Mayor de Obras"
  },
  {
    _id: mongoose.Types.ObjectId('000000000000000000000002'),
    especialidad: "Técnico en Computación"
  },
  {
    _id: mongoose.Types.ObjectId('000000000000000000001000'),
    especialidad: "Sin definir"
  },]

exports.especialidades = especialidades