const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const emailValidator = validate({ validator: 'isEmail' })
const uniqueValidator = require('mongoose-unique-validator')

const alumnoSchema = new Schema({
  alumno: {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
  },
  genero: { type: ObjectId, ref: 'Genero', required: true },
    email: {
      type: String,
      // required: true,
      // lowercase: true,
      // trim: true,
      // validate: emailValidator,
      // unique: true
    },
    dni: {
      type: Number,
      required: true,
      // unique: true
    },
    direccion: {
      type: String,
      //required: true,
    },
    fechaDeNacimiento: { type: Date },
    telefono: {
      type: String,
    },
  fechaInscripcion: { type: Date },
  especialidad: { type: ObjectId, ref: 'Especialidad', required: true },
  anio: { type: ObjectId, ref: 'Anio', required: true },
  curso: { type: ObjectId, ref: 'Curso', required: true },
  primero: { type: Boolean, default: false },
  segundo: { type: Boolean, default: false },
  tercero: { type: Boolean, default: false },
  cuarto: { type: Boolean, default: false },
  quinto: { type: Boolean, default: false },
  sexto: { type: Boolean, default: false },
  previas: { type: Number, default: 0 },
  regular: { type: Boolean, default: true }
},
  {
    timestamps: true
  }
)
alumnoSchema.plugin(uniqueValidator); //valida que el campo sea único

const Alumno = mongoose.model('Alumno', alumnoSchema)
module.exports = Alumno
