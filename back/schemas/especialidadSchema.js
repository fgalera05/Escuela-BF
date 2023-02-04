const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const { Double } = require('mongodb')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const especialidadSchema = new Schema({
   especialidad : {type: String, required: true},
})

especialidadSchema.plugin(uniqueValidator); //valida que el campo sea único

const Especialidad = mongoose.model('Especialidad', especialidadSchema)
module.exports = Especialidad