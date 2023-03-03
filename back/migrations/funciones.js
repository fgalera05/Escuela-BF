const mongoose = require('mongoose')
const logger = require('../logger')

const Alumno = require('../schemas/alumnoSchema');
const Especialidad = require('../schemas/especialidadSchema');
const Anio = require('../schemas/anioSchema');
const Genero = require('../schemas/generoSchema');
const Curso = require('../schemas/cursoSchema');
const Calificacion = require('../schemas/calificacionSchema');
const { obtenerAlumnosSexto } = require('../controllers/alumnoController');

async function crearAlumno(alumno) {

  try {
    const existeAlumno = await Alumno.findOne({ dni: alumno.dni })

    if (existeAlumno) {
      logger.error(`El dni ya existe`);
    }
    // console.log(alumno.genero);
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

    // let alumnoPrimero = false;
    // let alumnoSegundo = false;
    // let alumnoTercero = false;
    // let alumnoCuarto = false;
    // let alumnoQuinto = false;

    // if (existeCurso.anio.anio === 2) {
    //   alumnoPrimero = true;
    // }
    // if (existeCurso.anio.anio === 3) {
    //   alumnoPrimero = true;
    //   alumnoSegundo = true;
    // }
    // if (existeCurso.anio.anio === 4) {
    //   alumnoPrimero = true;
    //   alumnoSegundo = true;
    //   alumnoTercero = true;
    // }
    // if (existeCurso.anio.anio === 5) {
    //   alumnoPrimero = true;
    //   alumnoSegundo = true;
    //   alumnoTercero = true;
    //   alumnoCuarto = true
    // }
    // if (existeCurso.anio.anio === 6) {
    //   alumnoPrimero = true;
    //   alumnoSegundo = true;
    //   alumnoTercero = true;
    //   alumnoCuarto = true;
    //   alumnoQuinto = true;
    // }

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
        primero: alumno.primero,
        segundo: alumno.segundo,
        tercero: alumno.tercero,
        cuarto: alumno.cuarto,
        quinto: alumno.quinto,
        sexto: alumno.sexto,
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
            primerCuatrimestre: 7,
            segundoCuatrimestre: 7,
            tercerCuatrimestre: 7,
            promedio: 0,
            diciembre: 0,
            marzo: 0,
            notaFinal: 7,
          },
          aprobada: true
        }
      ))

      if (existeCurso.anio.anio > 1){

      const cursosAnteriores = await Curso.find({anio: {$lt: existeCurso.anio }}).populate('anio')
        .populate(
            {
                path: 'anio',
                populate: {
                    path: 'especialidad',
                }
            }
        )
        .populate(
            {
                path: 'anio',
                populate: {
                    path: 'materias',
                }
            }
        )

        const cursosFiltrados = cursosAnteriores.filter( c => (
            (c.anio.especialidad.id === existeCurso.anio.especialidad.id || (c.anio.anio <= 2) )
        ))
        // console.log("*****#*#*#*#*#*#**#&#^^$&@#@:", cursosFiltrados);  

        let cursosPrevios = []

        if (cursosFiltrados.length == 2){
            cursosPrevios = [cursosFiltrados[0]]
            console.log("22222");
        }
        if (cursosFiltrados.length == 4 ){
          cursosPrevios = [cursosFiltrados[0],cursosFiltrados[2]]
        }

        if (cursosFiltrados.length > 4){
           cursosPrevios = [cursosFiltrados[0],cursosFiltrados[2],...cursosFiltrados.slice(3)]
           console.log("4444444");
        }
        // cursosAnteriores.forEach(c => console.log(c))
        // console.log("*****#*#*#*#*#*#**#&#^^$&@#@:", cursosPrevios); 
        
        cursosPrevios.forEach(c => (
            c.anio.materias.forEach(async element =>
                await Calificacion.create(
                    {
                        curso: c,
                        alumno: nuevoAlumno,
                        materia: element,
                        notas: {
                            primerCuatrimestre: 7,
                            segundoCuatrimestre: 7,
                            tercerCuatrimestre: 7,
                            promedio: 0,
                            diciembre: 0,
                            marzo: 0,
                            notaFinal: 7,
                        },
                        aprobada: true
                    }
                )))
        )}


        // // const previas = await Calificacion.find({aprobada: false, alumno: nuevoAlumno})
        // // console.log("previas", previas);
        // // nuevoAlumno.previas = previas.length
        // await nuevoAlumno.save()



  } catch (err) {
    throw err
  }
}

exports.crearAlumno = crearAlumno
