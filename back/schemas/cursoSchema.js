const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const cursoSchema = new Schema({
   nombre:{ 
      type: String,
      required: true,
    },
   anio: { type: ObjectId, ref: 'Anio', required: true} ,
   // turno:{ type: ObjectId, ref: 'Turno', required: true},
   anioFecha: {type: Date},
   cantidadAlumnos: {
      type: Number, 
      required: true
   },
})

cursoSchema.plugin(uniqueValidator); //valida que el campo sea único

const Curso = mongoose.model('Curso', cursoSchema)
module.exports = Curso
