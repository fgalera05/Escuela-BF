const Calificacion = require('../schemas/calificacionSchema')
const Materia = require('../schemas/materiaSchema')
const Alumno = require('../schemas/alumnoSchema');
const logger = require('../logger');

const calificacionCursada = 7;
const calificacionDicMar = 4;
const previas = 2;

async function obtenerCalificacionesPorId(req, res, next) {
  try {
    const alumno = await Alumno.findById(req.params.id).populate('curso')
    const calificaciones = await Calificacion.find({ alumno: req.params.id, curso: alumno.curso._id }).populate('curso').populate('materia').populate('alumno')

    const calificacion = {
      alumno: alumno,
      calificaciones: calificaciones.map(calif => [
        calif.materia,
        calif.notas,
        calif.aprobada],
      )
    }

    res.status(200).json(calificacion)
  } catch (err) {
    next(err)
  }
}

async function obtenerCalificacionesPorCursoMateria(req, res, next) {

  const calificacion = {
    curso: req.params.curso,
    materia: req.params.materia
  }

  if (!calificacion.curso || !calificacion.materia) {
    logger.debug('Parámetros no encontrados')
    return res.status(404).json('Parámetros no encontrados')
  }

  try {
    const calificaciones = await Calificacion.find({ curso: calificacion.curso }).populate('alumno').populate('materia').exec()
    const materia = await Materia.findById(calificacion.materia)

    if (!materia) {
      logger.debug('La materia no existe')
      res.status(404).json('La materia no existe')
    }
    // console.log(calificaciones);
    const calificacionesMateria = calificaciones.filter(element => (element.materia.id, materia.id, element.materia.id === materia.id))

    if (calificacionesMateria.length === 0) {
      logger.debug('No existen calificaciones')
      res.status(404).json('No existen calificaciones')
    }

    res.status(200).json(calificacionesMateria)
  } catch (err) {
    next(err)
  }
}

async function calificarAlumno(req, res, next) {

  const miCalificacion = {
    idCalificacion: req.params.id,
    primerCuatrimestre: req.body.primerCuatrimestre,
    segundoCuatrimestre: req.body.segundoCuatrimestre, 
    tercerCuatrimestre: req.body.tercerCuatrimestre,
    diciembre: req.body.diciembre,
    marzo: req.body.marzo,
  }
  // console.log("))))))))))))",miCalificacion);

  try {
    // Califico al alumno
    const calificacion = await Calificacion.findById(miCalificacion.idCalificacion).populate('curso').populate('alumno').populate('materia')
    if (!calificacion) {
      logger.debug('No existe calificación!')
      return res.status(404).json('No existe calificación!')
    }
    calificacion.notas.primerCuatrimestre = miCalificacion.primerCuatrimestre,
      calificacion.notas.segundoCuatrimestre = miCalificacion.segundoCuatrimestre,
      calificacion.notas.tercerCuatrimestre = miCalificacion.tercerCuatrimestre;
     // console.log("~~~~~~~~~~~~~~~~~~~~~~~~:", (parseInt(miCalificacion.primerCuatrimestre) >0 && parseFloat(miCalificacion.segundoCuatrimestre) > 0 && parseFloat(miCalificacion.tercerCuatrimestre) >0));
      if (parseInt(miCalificacion.primerCuatrimestre) >0 && parseFloat(miCalificacion.segundoCuatrimestre) >0 && parseFloat(miCalificacion.tercerCuatrimestre)>0){
        calificacion.notas.promedio = ((parseFloat(miCalificacion.primerCuatrimestre) + parseFloat(miCalificacion.segundoCuatrimestre) + parseFloat(miCalificacion.tercerCuatrimestre)) / 3).toFixed(1);
      }else{
        calificacion.notas.promedio = 0
      }
      

    if (calificacion.notas.promedio >= calificacionCursada) {
      calificacion.aprobada = true;
      calificacion.notas.notaFinal = calificacion.notas.promedio
    } else {
      calificacion.aprobada = false;
      calificacion.notas.notaFinal = calificacion.notas.promedio
    }
    if (miCalificacion.diciembre) {
      calificacion.notas.diciembre = miCalificacion.diciembre;
      if (calificacion.notas.diciembre >= calificacionDicMar) {
        calificacion.aprobada = true;
        calificacion.notas.notaFinal = calificacion.notas.diciembre
      } else {
        calificacion.aprobada = false;
        calificacion.notas.notaFinal = calificacion.notas.diciembre
      }
    } else {
      calificacion.notas.diciembre = 0;
    }

    if (miCalificacion.marzo) {
      calificacion.notas.marzo = miCalificacion.marzo
      if (calificacion.notas.marzo >= calificacionDicMar) {
        calificacion.aprobada = true;
        calificacion.notas.notaFinal = calificacion.notas.marzo
      } else {
        calificacion.aprobada = false;
        calificacion.notas.notaFinal = calificacion.notas.marzo
      }
    } else {
      calificacion.notas.marzo = 0;
    }
    await calificacion.save()

    //Me fijo si pasa de año
    const alumno = await Alumno.findById(calificacion.alumno.id).populate('anio').populate('curso');

    // Si aprobó todas - 2 + las previas <= 2 previas, entonces pasa!
    const todasLasPrevias = await Calificacion.find({ alumno: calificacion.alumno, aprobada: false }).populate('curso').populate('alumno');
    const misPrevias = todasLasPrevias.filter(p =>(
      (p.curso.id != alumno.curso.id)
    ));
    misPrevias.forEach(p => (
      console.log(p.curso.id, alumno.curso._id)
    ))
    if (todasLasPrevias.length + alumno.previas <= previas) {
      if (alumno.anio.anio === 1) {
        alumno.primero = true
      }
      if (alumno.anio.anio === 2) {
        alumno.segundo = true
      }
      if (alumno.anio.anio === 3) {
        alumno.tercero = true
      }
      if (alumno.anio.anio === 4) {
        alumno.cuarto = true
      }
      if (alumno.anio.anio === 5) {
        alumno.quinto = true
      }
      if (alumno.anio.anio === 6) {
        alumno.sexto = true
      }
    } else {
      if (alumno.anio.anio === 1) {
        alumno.primero = false
      }
      if (alumno.anio.anio === 2) {
        alumno.segundo = false
      }
      if (alumno.anio.anio === 3) {
        alumno.tercero = false
      }
      if (alumno.anio.anio === 4) {
        alumno.cuarto = false
      }
      if (alumno.anio.anio === 5) {
        alumno.quinto = false
      }
      if (alumno.anio.anio === 6) {
        alumno.sexto = false
      }
      alumno.previas = misPrevias.length
    }
    await alumno.save()
    console.log("-------------------------------la respuesta es:", misPrevias.length);
    res.status(200).json(calificacion)
  } catch (err) {
    next(err)
  }
}

async function obtenerCalificacionesPorCurso(req, res, next) {
  try {
    const calificaciones = await Calificacion.find().populate('curso').populate('materia').populate('alumno')

    // const calificacion = {
    //   curso: calif.curso,
    //   calificaciones: calificaciones.map(calif => [
    //     calif.materia,
    //     calif.notas,
    //     calif.aprobada],
    //   )
    // }

    res.status(200).json(calificaciones)
    // console.log(calificaciones);
  } catch (err) {
    next(err)
  }
}

async function obtenerCalificacionesPorCursoPorId(req, res, next) {
  const curso =req.params.curso
  const alumno =req.params.alumno
  try {
    const calificaciones = await Calificacion.find({curso: curso, alumno: alumno}).populate('curso').populate('materia').populate('alumno')

    // const calificacion = {
    //   curso: calif.curso,
    //   calificaciones: calificaciones.map(calif => [
    //     calif.materia,
    //     calif.notas,
    //     calif.aprobada],
    //   )
    // }

    res.status(200).json(calificaciones)
    // console.log(calificaciones);
  } catch (err) {
    next(err)
  }
}

async function obtenerCalificacionesHistorialPorId(req, res, next) {
  
  const idAlumno = req.params.id

  try {

    const alumno = await Alumno.findById(idAlumno).populate('curso');

    console.log("#########", alumno.curso.id);

    const calificaciones = await Calificacion.find({alumno: alumno}).populate('curso').populate('materia').populate('alumno')
    const filtro = calificaciones.filter((c) => (
      (c.curso._id != alumno.curso.id)
    ))
    // const calificacion = {
    //   curso: calif.curso,
    //   calificaciones: calificaciones.map(calif => [
    //     calif.materia,
    //     calif.notas,
    //     calif.aprobada],
    //   )
    // }
    // console.log("RES", filtro);

    res.status(200).json(filtro);
    // console.log(calificaciones);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  obtenerCalificacionesPorId,
  obtenerCalificacionesPorCursoPorId,
  obtenerCalificacionesPorCursoMateria,
  calificarAlumno,
  obtenerCalificacionesPorCurso,
  obtenerCalificacionesHistorialPorId,
}
