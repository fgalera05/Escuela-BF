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
}

async function down () {
  conDb();
  await mongoose.model('Especialidad').deleteMany()
  await mongoose.model('Materia').deleteMany()
  await mongoose.model('Anio').deleteMany()
  await mongoose.model('Curso').deleteMany()
  await mongoose.model('Genero').deleteMany()
  await mongoose.model('Alumno').deleteMany()
}

module.exports = { up, down };
