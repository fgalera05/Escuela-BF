const mongoose = require('mongoose')

const generos = [
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    genero: 'F'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000004'),
    genero: 'M'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000005'),
    genero: 'X'
  }
]

exports.generos = generos