const express = require('express');
const {obtenerCalificacionesPorCursoMateria, calificarAlumno, obtenerCalificacionesPorId,obtenerCalificacionesPorCurso} = require('../controllers/calificacionController');

const router = express.Router();

router.get('/:id', obtenerCalificacionesPorId);
router.get('/calificacion/curso/', obtenerCalificacionesPorCurso);
router.get('/curso/:curso/materia/:materia', obtenerCalificacionesPorCursoMateria);
router.patch('/:id', calificarAlumno);

module.exports = router