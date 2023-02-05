const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const emailValidator = validate({ validator: 'isEmail' })

const usuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: emailValidator,
  },
  password: { type: String, select: false },
  datos: {
    nombre: { type: String },
    apellido: { type: String },
  },
  rol: { type: ObjectId, ref: 'Rol', required: true },
  isActive: { type: Boolean },
})

usuarioSchema.method('checkPassword', async function checkPassword(potentialPassword) {
  if (!potentialPassword) {
    return Promise.reject(new Error('Password is required'))
  }

  const isMatch = await bcrypt.compare(potentialPassword, this.password)

  return { isOk: isMatch }
})

usuarioSchema.plugin(uniqueValidator); //valida que el campo sea único
const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario
