const mongoose = require('mongoose')
const logger = require('../logger')

const Alumno = require('../schemas/alumnoSchema');
const Especialidad = require('../schemas/especialidadSchema');
const Anio = require('../schemas/anioSchema');
const Genero = require('../schemas/generoSchema');
const Curso = require('../schemas/cursoSchema');
const Calificacion = require('../schemas/calificacionSchema');

async function crearAlumno(alumno) {

  try {
    const existeAlumno = await Alumno.findOne({ dni: alumno.dni })

    if (existeAlumno) {
      logger.error(`El dni ya existe`);
    }
    console.log(alumno.genero);
    const existeGenero = await Genero.findById(alumno.genero)
    if (!existeGenero) {
      logger.error(`El género no existe`);
    }

    const existeCurso = await Curso.findById(alumno.curso).populate('anio').populate(
      {
        path: 'anio',
        populate: {
          path: 'especialidad',
        }
      })
    if (!existeCurso) {
      console.log('error3')
    }

    let alumnoPrimero = false;
    let alumnoSegundo = false;
    let alumnoTercero = false;
    let alumnoCuarto = false;
    let alumnoQuinto = false;

    if (existeCurso.anio.anio === 2) {
      alumnoPrimero = true;
    }
    if (existeCurso.anio.anio === 3) {
      alumnoPrimero = true;
      alumnoSegundo = true;
    }
    if (existeCurso.anio.anio === 4) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
    }
    if (existeCurso.anio.anio === 5) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
      alumnoCuarto = true
    }
    if (existeCurso.anio.anio === 6) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
      alumnoCuarto = true;
      alumnoQuinto = true;
    }

    const nuevoAlumno = await Alumno.create(
      {
        _id: alumno._id,
        alumno: {
          nombre: alumno.alumno.nombre,
          apellido: alumno.alumno.apellido,
        },
        email: alumno.email,
        telefono: alumno.telefono,
        dni: alumno.dni,
        genero: existeGenero,
        fechaInscripcion: new Date(),
        anio: existeCurso.anio,
        especialidad: existeCurso.anio.especialidad,
        curso: existeCurso,
        primero: alumnoPrimero,
        segundo: alumnoSegundo,
        tercero: alumnoTercero,
        cuarto: alumnoCuarto,
        quinto: alumnoQuinto,
        previas: alumno.previas,
      }
    )

    existeCurso.anio.materias.forEach(async element =>
      await Calificacion.create(
        {
          curso: existeCurso,
          alumno: nuevoAlumno,
          materia: element,
          notas: {
            primerCuatrimestre: 0,
            segundoCuatrimestre: 0,
            tercerCuatrimestre: 0,
            promedio: 0,
            diciembre: 0,
            marzo: 0,
            notaFinal: 0,
          },
          aprobada: false
        }
      ))



  } catch (err) {
    throw err
  }
}

exports.crearAlumno = crearAlumno
