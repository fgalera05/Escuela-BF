const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const { Double } = require('mongodb')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const anioSchema = new Schema({
   anio: {type: Number, required: true},
   nombre : {type: String, required: true},
   especialidad: { type: ObjectId, ref: 'Especialidad',required: true},
   materias: [{ type: ObjectId, ref: 'Materia'}],
})

anioSchema.plugin(uniqueValidator); //valida que el campo sea único

const Anio = mongoose.model('Anio', anioSchema)
module.exports = Anio