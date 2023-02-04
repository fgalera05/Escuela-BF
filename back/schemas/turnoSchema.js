const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const turnoSchema = new Schema({
   nombre:{ 
      type: String,
      required: true,
    },
    horario :{
      type: String,
      required: true
    },
})

turnoSchema.plugin(uniqueValidator); //valida que el campo sea único

const Turno = mongoose.model('Turno', turnoSchema)
module.exports = Turno
