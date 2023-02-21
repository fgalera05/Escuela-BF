const mongoose = require('mongoose')
const conDb = require('../config/db')

const Especialidad = require('../schemas/especialidadSchema')
const {especialidades} = require('./data/especialidades')

const Genero = require('../schemas/generoSchema')
const {generos} = require('./data/generos')

const Materia = require('../schemas/materiaSchema')
const {materias} = require('./data/materias')

const Anio = require('../schemas/anioSchema')
const {anios} = require('./data/anios')

const Curso = require('../schemas/cursoSchema')
const {cursos} = require('./data/cursos')

const Alumno = require('../schemas/alumnoSchema')
const {alumno1, alumno2, alumno3, alumno3b,alumno4,alumno5,alumno6} = require('./data/alumnos')
const {crearAlumno} = require('./funciones')

const Rol = require('../schemas/rolSchema')
const {roles} = require('./data/roles')

const Usuario = require('../schemas/usuarioSchema')
const {usuarios} = require('./data/usuarios')

async function up () {
  conDb();
  await Especialidad.collection.insertMany(especialidades)
  await Materia.collection.insertMany(materias)
  await Anio.collection.insertMany(anios)
  await Curso.collection.insertMany(cursos)
  await Genero.collection.insertMany(generos)
  await crearAlumno(alumno1)
  await crearAlumno(alumno2)
  await crearAlumno(alumno3)
  await crearAlumno(alumno3b)
  await crearAlumno(alumno4)
  await crearAlumno(alumno5)
  await crearAlumno(alumno6)
  await Rol.collection.insertMany(roles)
  await Usuario.collection.insertMany(usuarios)
}

async function down () {
  conDb();
  await mongoose.model('Especialidad').deleteMany()
  await mongoose.model('Materia').deleteMany()
  await mongoose.model('Anio').deleteMany()
  await mongoose.model('Curso').deleteMany()
  await mongoose.model('Genero').deleteMany()
  await mongoose.model('Alumno').deleteMany()
  await mongoose.model('Calificacion').deleteMany()
  await mongoose.model('Rol').deleteMany()
  await mongoose.model('Usuario').deleteMany()
}

module.exports = { up, down };
