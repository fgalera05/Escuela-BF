const express = require('express');
const {obtenerCalificacionesPorCursoMateria, obtenerCalificacionesPorCursoPorId,calificarAlumno,
     obtenerCalificacionesPorId,obtenerCalificacionesPorCurso,
     obtenerCalificacionesHistorialPorId} = require('../controllers/calificacionController');

const router = express.Router();

router.get('/:id', obtenerCalificacionesPorId);
router.get('/calificacion/curso/', obtenerCalificacionesPorCurso);
router.get('/calificacion/curso/:curso/:alumno', obtenerCalificacionesPorCursoPorId);
router.get('/curso/:curso/materia/:materia', obtenerCalificacionesPorCursoMateria);
router.patch('/:id', calificarAlumno);
router.get('/historial/:id',obtenerCalificacionesHistorialPorId)

module.exports = router