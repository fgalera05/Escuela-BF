const express = require('express');
const {obtenerCalificacionesPorCursoMateria, calificarAlumno} = require('../controllers/calificacionController');

const router = express.Router();

router.get('/curso/:curso/materia/:materia', obtenerCalificacionesPorCursoMateria)
router.patch('/:id', calificarAlumno)

module.exports = router