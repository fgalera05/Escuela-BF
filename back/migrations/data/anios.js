const mongoose = require('mongoose')

const { materiasPrimero, materiasSegundo, materias3roMMO, materias3roTC,
 materias4toMMO, materias4toTC, materias5toMMO, materias5toTC,
  materias6toMMO,materias6toTC } = require('./materias')

const anios = [
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000006'),
    anio: 1,
    nombre: 'Primero',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000000'),
    materias: materiasPrimero.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000007'),
    anio: 2,
    nombre: 'Segundo',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000000'),
    materias: materiasSegundo.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000008'),
    anio: 3,
    nombre: 'Tercero',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000001'),
    materias: materias3roMMO.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000009'),
    anio: 3,
    nombre: 'Tercero',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000002'),
    materias: materias3roTC.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000010'),
    anio: 4,
    nombre: 'Cuarto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000001'),
    materias: materias4toMMO.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000011'),
    anio: 4,
    nombre: 'Cuarto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000002'),
    materias: materias4toTC.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000012'),
    anio: 5,
    nombre: 'Quinto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000001'),
    materias: materias5toMMO.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000013'),
    anio: 5,
    nombre: 'Quinto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000002'),
    materias: materias5toTC.map(element => element._id),
   
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000014'),
    anio: 6,
    nombre: 'Sexto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000001'),
    materias: materias6toMMO.map(element => element._id),
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000015'),
    anio: 6,
    nombre: 'Sexto',
    especialidad: new mongoose.Types.ObjectId('000000000000000000000002'),
    materias: materias6toTC.map(element => element._id),

  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000016'),
    anio: 7,
    nombre: 'Egresados',
    especialidad: mongoose.Types.ObjectId('000000000000000000001000'),
    materias: mongoose.Types.ObjectId('000000000000000000001000'),
  }
]

exports.anios = anios