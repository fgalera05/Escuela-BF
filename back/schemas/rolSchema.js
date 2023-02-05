const mongoose = require('mongoose')
const { Schema } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const rolSchema = new Schema({
  rol: { type: String, required: true, lowercase: true, trim: true, unique: true },
  // permissions: [{ type: String, ref: 'Permission' }],
})


rolSchema.plugin(uniqueValidator); //valida que el campo sea único

const Rol = mongoose.model('Rol', rolSchema)
module.exports = Rol
