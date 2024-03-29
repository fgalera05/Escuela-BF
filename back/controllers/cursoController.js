const Curso = require("../schemas/cursoSchema");
const Alumno = require("../schemas/alumnoSchema");
const Calificacion = require("../schemas/calificacionSchema");
const Anio = require("../schemas/anioSchema");
const logger = require("../logger");

const cantidadDeAlumnosPorCurso = 30;

async function obtenerCursos(req, res, next) {
  try {
    const cursos = await Curso.find()
      .populate("anio")
      .populate({
        path: "anio",
        populate: {
          path: "materias",
        },
      })
      .populate({
        path: "anio",
        populate: {
          path: "especialidad",
        },
      });

    return res.status(200).json(cursos.filter(c=>(c.anio.anio < 7)));
  } catch (err) {
    next(err);
  }
}

async function obtenerAlumnosCursos(req, res, next) {
  const curso = req.params.curso;

  const cursoActual = {
    curso: {
      cursoID: "",
      nombre: "",
      anio: 0,
      especialidad: "",
      materias: [],
    },
    alumnos: [],
  };

  try {
    const cursoData = await Curso.findById(curso)
      .populate("anio")
      .populate({
        path: "anio",
        populate: {
          path: "materias",
        },
      })
      .populate({
        path: "anio",
        populate: {
          path: "especialidad",
        },
      });

    const alumnos = await Alumno.find({ curso: cursoData });

    for (i = 0; i < alumnos.length; i++) {
      let pasaDeAnio = false;
      const calificaciones = await Calificacion.find({
        alumno: alumnos[i].id,
        curso: cursoData.id,
      })
        .populate("materia")
        .populate({
          path: "curso",
          populate: {
            path: "anio",
          },
        });

      if (alumnos.length > 0) {
        if (cursoData.anio.anio === 1 && alumnos[i].primero) {
          pasaDeAnio = true;
        }
        if (cursoData.anio.anio === 2 && alumnos[i].segundo) {
          pasaDeAnio = true;
        }
        if (cursoData.anio.anio === 3 && alumnos[i].tercero) {
          pasaDeAnio = true;
        }
        if (cursoData.anio.anio === 4 && alumnos[i].cuarto) {
          pasaDeAnio = true;
        }
        if (cursoData.anio.anio === 5 && alumnos[i].quinto) {
          pasaDeAnio = true;
        }
        const tieneTodasCalificaciones = calificaciones.filter(
          (element) => element.notas.notaFinal != 0
        );

        if (
          cursoData.anio.anio === 6 &&
          cursoData.anio.materias.length === tieneTodasCalificaciones.length
        ) {
          pasaDeAnio = true;
        }
      }

      cursoActual.alumnos.push([
        { pasaDeAnio: pasaDeAnio },
        alumnos[i],
        calificaciones,
      ]);
    }

    cursoActual.curso.cursoID = cursoData.id;
    cursoActual.curso.nombre = cursoData.nombre;
    cursoActual.curso.anio = cursoData.anio.anio;
    cursoActual.curso.especialidad = cursoData.anio.especialidad;
    cursoActual.curso.materias = cursoData.anio.materias;

    res.status(200).json(cursoActual);
  } catch (err) {
    next(err);
  }
}

async function obtenerCantidadAlumnosCursoPorId(req, res, next) {
  const curso = req.params.id;

  try {
    const cursoData = await Curso.findById(curso);

    const alumnos = await Alumno.find({ curso: cursoData.id });

    res.status(200).json(alumnos.length);
  } catch (err) {
    next(err);
  }
}

async function crearCurso(req, res, next) {
  try {
    const nuevoCurso = {
      curso: req.body.curso,
      anio: req.body.anio,
    };

    console.log(nuevoCurso);

    const existeCurso = await Curso.findOne({ nombre: nuevoCurso.curso });
    console.log("existeCurso:", existeCurso);
    if (existeCurso) {
      logger.error("El curso ya existe");
      return res.status(404).json("El curso ya existe");
    }

    const existeAnio = await Anio.findById(nuevoCurso.anio);
    if (!existeAnio) {
      logger.error("El año no existe");
      return res.status(404).json("El año no existe");
    }

    await Curso.create({
      nombre: nuevoCurso.curso,
      anio: existeAnio,
      cantidadAlumnos: cantidadDeAlumnosPorCurso,
    });

    res.status(200).json("Curso creado!");
  } catch (err) {
    next(err);
  }
}

async function obtenerCursoPorId(req, res, next) {
  const curso = req.params.id;

  try {
    const existeCurso = await Curso.findById(curso)
      .populate("anio")
      .populate({
        path: "anio",
        populate: {
          path: "materias",
        },
      })
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

    return res.status(200).json(existeCurso);
  } catch (err) {
    next(err);
  }
}

async function cursoAlQuePasa(req, res, next) {
  const idAlumno = req.params.alumno;
  try {

    const alumno = await Alumno.findById(idAlumno).populate("anio")
    .populate({
      path: "anio",
      populate: {
        path: "especialidad",
      },
    });

    const cursos = await Curso.find().populate("anio")
    .populate({
      path: "anio",
      populate: {
        path: "especialidad",
      },
    });

    const filtrados = cursos.filter(
      (c) =>
        c.anio.anio > alumno.anio.anio && c.anio.anio < alumno.anio.anio + 2
    );
   console.log(filtrados)
    if (alumno.anio.anio != 2 && alumno.anio.anio < 6){
      res.status(200).json(filtrados.filter(c => c.anio.especialidad.id === alumno.anio.especialidad.id));
    }else{
      res.status(200).json(filtrados);
    }
    
  } catch (err) {
    next(err);
  }
}

module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  obtenerAlumnosCursos,
  crearCurso,
  obtenerCantidadAlumnosCursoPorId,
  cursoAlQuePasa,
};
