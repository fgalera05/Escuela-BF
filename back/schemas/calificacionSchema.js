const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const { Double } = require('mongodb')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const calificacionSchema = new Schema({
   curso: { type: ObjectId, ref: 'Curso', required: true},
   alumno: { type: ObjectId, ref: 'Alumno' },
   materia: { type: ObjectId, ref: 'Materia' },
   notas: {
      primerCuatrimestre: { type: Number },
      segundoCuatrimestre: { type: Number },
      tercerCuatrimestre: { type: Number },
      promedio: { type: Number },
      diciembre: { type: Number },
      marzo: { type: Number },
      notaFinal: { type: Number },
   },
   aprobada: { type: Boolean, default: false }
})

const Calificacion = mongoose.model('Calificacion', calificacionSchema)
module.exports = Calificacion
