const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const materiaSchema = new Schema({
   materia: { type: String, required: true},
   anio: {type: Number, required: true},
})

//materiaSchema.plugin(uniqueValidator); //valida que el campo sea único
const Materia = mongoose.model('Materia', materiaSchema)
module.exports = Materia