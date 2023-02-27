const express = require('express');
const {obtenerCursos, obtenerCursoPorId, obtenerAlumnosCursos, crearCurso,
    obtenerCantidadAlumnosCursoPorId} = require('../controllers/cursoController');
const cors = require('cors');

const router = express.Router();

router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);
router.get('/cantidad/:id',obtenerCantidadAlumnosCursoPorId);
router.get('/alumnos/:curso', obtenerAlumnosCursos);
router.post('/curso', crearCurso);

module.exports = router