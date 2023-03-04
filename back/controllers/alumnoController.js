const Alumno = require("../schemas/alumnoSchema");
const Especialidad = require("../schemas/especialidadSchema");
const Anio = require("../schemas/anioSchema");
const Genero = require("../schemas/generoSchema");
const Curso = require("../schemas/cursoSchema");
const Calificacion = require("../schemas/calificacionSchema");

const logger = require("../logger");

async function obtenerAlumnos(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("anio")
      .populate("especialidad");
    res.status(200).json(alumnos.filter(a=>a.anio.anio < 7));
  } catch (err) {
    logger.debug(err);
    next(err);
  }
}

async function obtenerAlumnosPrimero(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("anio");

    const alumnosPrimero = alumnos.filter((ele) => !ele.primero);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosSegundo(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("especialidad");

    const alumnosPrimero = alumnos.filter((ele) => ele.primero && !ele.segundo);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosTercero(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("especialidad");

    const alumnosPrimero = alumnos.filter((ele) => ele.segundo && !ele.tercero);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosCuarto(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("especialidad");

    const alumnosPrimero = alumnos.filter((ele) => ele.tercero && !ele.quinto);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosQuinto(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("especialidad");

    const alumnosPrimero = alumnos.filter((ele) => ele.cuarto && !ele.sexto);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosSexto(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("especialidad");

    const alumnosPrimero = alumnos.filter((ele) => ele.quinto);

    res.status(200).json(alumnosPrimero);
  } catch (err) {
    next(err);
  }
}

async function obtenerEgresados(req, res, next) {
  try {
    const alumnos = await Alumno.find()
      .populate("genero")
      .populate("curso")
      .populate("anio")
      .populate('especialidad');
      
    const egresados = alumnos.filter((element) => element.anio.anio > 6);
      return res.status(200).json(egresados);
  
  } catch (err) {
    next(err);
  }
}

async function obtenerEgresadoPorId(req, res, next) {
  try {
    const alumno = await Alumno.findById(req.params.id)
      .populate("genero")
      .populate("curso")
      .populate("anio");
      return res.status(200).json(alumno);
  
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnoPorId(req, res, next) {
  console.log("obtenerAlumnoPorId with id: ", req.params.id);

  if (!req.params.id) {
    logger.debug("Id not found");
    return res.status(404).send("Id not found");
  }

  try {
    console.log(req.params.id);
    const alumno = await Alumno.findById(req.params.id)
      .populate("curso")
      .populate("anio");

    if (!alumno) {
      logger.debug("Alumno not found");
      return res.status(404).send("Alumno not found");
    }

    res.send(alumno);
  } catch (err) {
    next(err);
  }
}

async function crearAlumno(req, res, next) {
  const alumno = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    direccion: req.body.direccion,
    email: req.body.email,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    genero: req.body.genero,
    telefono: req.body.telefono,
    anio: req.body.anio,
    curso: req.body.curso,
    previas: req.body.previas ? req.body.previas : 0,
  };

  try {
    const existeAlumno = await Alumno.findOne({ dni: alumno.dni });

    if (existeAlumno) {
      logger.debug(`El dni ya existe`);
      return res.status(400).json("El dni ya existe");
    }

    const existeGenero = await Genero.findById(alumno.genero);
    if (!existeGenero) {
      logger.debug("El género no existe");
      return res.status(404).json("El género no existe");
    }

    const existeCurso = await Curso.findById(alumno.curso)
      .populate("anio")
      .populate({
        path: "anio",
        populate: {
          path: "especialidad",
        },
      });

    if (!existeCurso) {
      logger.error("El curso no existe");
      return res.status(404).json("El curso no existe");
    }

    const existeAnio = await Anio.findById(alumno.anio);
    if (!existeAnio) {
      logger.error("El año no existe");
      return res.status(404).json("El año no existe");
    }

    if (existeAnio.anio !== existeCurso.anio.anio) {
      logger.error("El curso es de otro año ");
      return res.status(500).json("El curso es de otro año");
    }

    let alumnoPrimero = false;
    let alumnoSegundo = false;
    let alumnoTercero = false;
    let alumnoCuarto = false;
    let alumnoQuinto = false;

    if (existeAnio.anio === 2) {
      alumnoPrimero = true;
    }
    if (existeAnio.anio === 3) {
      alumnoPrimero = true;
      alumnoSegundo = true;
    }
    if (existeAnio.anio === 4) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
    }
    if (existeAnio.anio === 5) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
      alumnoCuarto = true;
    }
    if (existeAnio.anio === 6) {
      alumnoPrimero = true;
      alumnoSegundo = true;
      alumnoTercero = true;
      alumnoCuarto = true;
      alumnoQuinto = true;
    }

    const nuevoAlumno = await Alumno.create({
      alumno: {
        nombre: alumno.nombre,
        apellido: alumno.apellido,
      },
      email: alumno.email,
      telefono: alumno.telefono,
      dni: alumno.dni,
      direccion: alumno.direccion,
      genero: existeGenero,
      curso: existeCurso,
      fechaInscripcion: new Date(),
      anio: existeAnio,
      especialidad: existeCurso.anio.especialidad,
      primero: alumnoPrimero,
      segundo: alumnoSegundo,
      tercero: alumnoTercero,
      cuarto: alumnoCuarto,
      quinto: alumnoQuinto,
      previas: alumno.previas,
    });

    existeCurso.anio.materias.forEach(
      async (element) =>
        await Calificacion.create({
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
          aprobada: false,
        })
    );

    const cursosAnteriores = await Curso.find({
      anio: { $lt: existeCurso.anio },
    })
      .populate("anio")
      .populate({
        path: "anio",
        populate: {
          path: "especialidad",
        },
      })
      .populate({
        path: "anio",
        populate: {
          path: "materias",
        },
      });

    let cursosPrevios = [];

    if (existeCurso.anio.anio > 1) {
        const filtrados = cursosAnteriores.filter(
            (c) =>
              c.anio.especialidad.especialidad ===
              existeCurso.anio.especialidad.especialidad
          )

      if (existeCurso.anio.anio == 2) {
        cursosPrevios = [cursosAnteriores[0]]
      }
      if (existeCurso.anio.anio == 3) {
        cursosPrevios = [cursosAnteriores[0],cursosAnteriores[2]]
      }
      if (existeCurso.anio.anio > 3) {
        cursosPrevios = [cursosAnteriores[0],cursosAnteriores[2],...filtrados]
      }
      
        cursosPrevios.forEach(async (c,i) =>
        await c.anio.materias.forEach(
          async (element) =>
             await Calificacion.create({
              curso: c,
              alumno: nuevoAlumno.id,
              materia: element.id,
              notas: {
                primerCuatrimestre: 0,
                segundoCuatrimestre: 0,
                tercerCuatrimestre: 0,
                promedio: 0,
                diciembre: 0,
                marzo: 0,
                notaFinal: 0,
              },
              aprobada: false,
            })
        )
      );
    }

    
    res.status(200).json(nuevoAlumno);
  } catch (err) {
    next(err);
  }
}

async function modificarAlumno(req, res, next) {
  console.log("modificarAlumno with id: ", req.params.id);
  console.log("Nombre:", req.body.nombre);
  const alumno = {
    alumnoID: req.params.id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    genero: req.body.genero,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    telefono: req.body.telefono,
  };

  try {
    const alumnoToUpdate = await Alumno.findById(alumno.alumnoID)
      .populate("curso")
      .populate("anio")
      .populate("especialidad");
    console.log("alumno a actualizar", alumno);
    
    if (!alumnoToUpdate) {
      logger.debug("Alumno not found");
      return res.status(404).send("Alumno not found");
    }

    if (alumnoToUpdate.dni != alumno.dni){
      const alumnoOtro = await Alumno.findOne({dni: alumno.dni})
      if (alumnoOtro) {
        logger.debug("El DNI ya existe!");
        return res.status(500).send("El DNI ya existe!");
      }
    }
    
    const existeGenero = await Genero.findById(alumno.genero);
    if (!existeGenero) {
      logger.debug("Género not found");
      return res.status(404).json("El género no existe");
    }

    alumnoToUpdate.alumno.nombre = alumno.nombre;
    alumnoToUpdate.alumno.apellido = alumno.apellido;
    alumnoToUpdate.dni = alumno.dni;
    alumnoToUpdate.email = alumno.email;
    alumnoToUpdate.direccion = alumno.direccion;
    alumnoToUpdate.fechaDeNacimiento = alumno.fechaDeNacimiento;
    alumnoToUpdate.telefono = alumno.telefono;
    alumnoToUpdate.genero = existeGenero;
    await alumnoToUpdate.save({ runValidators: true, context: "query" }); //valida que el campo sea único
    console.log("alumnoToUpdate:", alumnoToUpdate);
    return res.status(200).json(alumnoToUpdate);
  } catch (err) {
    next(err);
  }
}

async function modificarInscripcionAlumno(req, res, next) {
  console.log("modificarInscripcionAlumno with id: ", req.params.id);

  const alumno = {
    alumnoID: req.params.id,
    regular: req.body.regular,
    anio: req.body.anio,
    especialidad: req.body.especialidad,
    curso: req.body.curso,
    previas: req.body.previas,
  };

  try {
    const alumnoToUpdate = await Alumno.findById(alumno.alumnoID)
      .populate("curso")
      .populate("anio");
    if (!alumnoToUpdate) {
      logger.debug("Alumno not found");
      return res.status(404).send("Alumno not found");
    }

    const existeAnio = await Anio.findById(alumno.anio).populate(
      "especialidad"
    );
    if (!existeAnio) {
      logger.debug("Año not found");
      return res.status(404).json("El año no existe");
    }

    const existeEspecialidad = await Especialidad.findById(alumno.especialidad);
    if (!existeEspecialidad) {
      logger.debug("Especialidad not found");
      return res.status(404).json("La especialidad no existe");
    }

    const existeCurso = await Curso.findById(alumno.curso).populate("anio");
    // console.log('existeCurso', existeCurso);
    if (!existeCurso) {
      logger.debug("Curso not found");
      return res.status(404).json("El curso no existe");
    }
    // const cuposTomadosCurso = await Alumno').find({curso: existeCurso.id})

    // if (existeCurso.cantidadAlumnos < cuposTomadosCurso.length ){
    //   logger.debug('El curso no tiene cupo')
    //   return res.status(500).json('El curso no tiene cupo')
    // }

    //   const existeTurno = await Genero').findById(alumno.genero)
    //   if (!existeTurno) {
    //     logger.debug('Turno not found')
    //     return res.status(404).json('El turno no existe')
    //   }

    // console.log(existeAnio.anio, existeCurso.anio.anio);
    if (existeAnio.anio != existeCurso.anio.anio) {
      logger.debug(
        `El año ${existeAnio.anio}, el curso ${existeCurso.anio.anio} o la especialidad ${existeEspecialidad.especialidad} no coinciden`
      );
      return res
        .status(404)
        .json(
          `El año ${existeAnio.anio}, el curso ${existeCurso.anio.anio} o la especialidad ${existeEspecialidad.especialidad} no coinciden`
        );
    }

    if (existeCurso.anio.anio != alumnoToUpdate.anio.anio) {
      await Calificacion.deleteMany({
        curso: alumnoToUpdate.curso.id,
        alumno: alumnoToUpdate.id,
      });

      let alumnoEspecialidad = existeCurso.especialidad;
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
        alumnoCuarto = true;
      }
      if (existeCurso.anio.anio === 6) {
        alumnoPrimero = true;
        alumnoSegundo = true;
        alumnoTercero = true;
        alumnoCuarto = true;
        alumnoQuinto = true;
      }
      alumnoToUpdate.primero = alumnoPrimero;
      alumnoToUpdate.segundo = alumnoSegundo;
      alumnoToUpdate.tercero = alumnoTercero;
      alumnoToUpdate.cuarto = alumnoCuarto;
      alumnoToUpdate.quinto = alumnoQuinto;
      alumnoToUpdate.especialidad = alumnoEspecialidad;
      alumnoToUpdate.curso = existeCurso;
      alumnoToUpdate.anio = existeCurso.anio;
    }

    (alumnoToUpdate.anio = existeAnio),
      (alumnoToUpdate.especialidad = existeEspecialidad),
      (alumnoToUpdate.curso = alumno.curso),
      (alumnoToUpdate.regular = alumno.regular),
      (alumnoToUpdate.previas = alumno.previas),
      await alumnoToUpdate.save({ runValidators: true, context: "query" }); //valida que el campo sea único

    existeCurso.anio.materias.forEach(
      async (element) =>
        await Calificacion.create({
          curso: existeCurso,
          alumno: alumnoToUpdate,
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
          aprobada: false,
        })
    );

    return res.status(200).json(alumnoToUpdate);
  } catch (err) {
    next(err);
  }
}

async function pasarDeAnioAlumno(req, res, next) {
  let egresa = null;
  let cursoProxAnio;
  const idAlumno = req.params.id;
  const idCursoNuevo = req.body.curso;

  try {
    const alumno = await Alumno.findById(idAlumno)
      .populate("genero")
      .populate("curso")
      .populate("anio")
      .populate("especialidad");
    console.log("---------------------ALUMNO:", alumno);

    let pasaDeAnio = false;

    if (alumno.anio.anio === 1 && alumno.primero) {
      pasaDeAnio = true;
    }
    if (alumno.anio.anio === 2 && alumno.segundo) {
      pasaDeAnio = true;
    }
    if (alumno.anio.anio === 3 && alumno.tercero) {
      pasaDeAnio = true;
    }
    if (alumno.anio.anio === 4 && alumno.cuarto) {
      pasaDeAnio = true;
    }
    if (alumno.anio.anio === 5 && alumno.quinto) {
      pasaDeAnio = true;
    }
    if (alumno.anio.anio === 6 && alumno.sexto) {
      pasaDeAnio = true;
    }

    if (!pasaDeAnio) {
      logger.debug("El alumno no puede pasar de año");
      return res.status(400).json("El alumno no puede pasar de año");
    }

    const cursoProxAnio = await Curso.findById(idCursoNuevo).populate("anio");

    if (cursoProxAnio.anio.anio > 6) {
      egresa = await Anio.findOne({ anio: 7 });
    }

    // calculo las previas:
    const previas = await Calificacion.find({
      alumno: alumno.id,
      aprobada: false,
    });

    if (cursoProxAnio) {
      alumno.curso = cursoProxAnio;
    }
    alumno.anio = cursoProxAnio ? cursoProxAnio.anio : egresa;
    alumno.previas = previas.length;
    alumno.especialidad = (cursoProxAnio && !egresa)
      ? cursoProxAnio.anio.especialidad
      : alumno.especialidad;


    console.log('especialdiadadadada',alumno.especialidad)

    await alumno.save();

    if (!egresa) {
      cursoProxAnio.anio.materias.forEach(
        async (element) =>
          await Calificacion.create({
            curso: cursoProxAnio,
            alumno: alumno,
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
            aprobada: false,
          })
      );
    }

    return res.status(200).json(alumno);
  } catch (err) {
    next(err);
  }
}

async function nuevoAlumno(req, res, next) {
  try {
    const generos = await Genero.find();
    const especialidades = await Especialidad.find();
    const anios = await Anio.find().populate("especialidad");
    const cursos = await Curso.find().populate("anio");

    const dataNuevoAlumno = {
      generos: generos,
      especialidades: especialidades,
      anios: anios,
      cursos: cursos,
    };

    res.status(200).json(dataNuevoAlumno);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  obtenerAlumnos,
  obtenerAlumnoPorId,
  obtenerAlumnosPrimero,
  obtenerAlumnosSegundo,
  obtenerAlumnosTercero,
  obtenerAlumnosCuarto,
  obtenerAlumnosQuinto,
  obtenerAlumnosSexto,
  obtenerEgresados,
  obtenerEgresadoPorId,
  crearAlumno,
  modificarAlumno,
  modificarInscripcionAlumno,
  pasarDeAnioAlumno,
  nuevoAlumno,
};
