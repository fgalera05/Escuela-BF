const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const generoSchema = new Schema({
   genero : {type: String, required: true},
})

generoSchema.plugin(uniqueValidator); //valida que el campo sea único

const Genero = mongoose.model('Genero', generoSchema)
module.exports = Genero
