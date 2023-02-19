const express = require('express');
const {obtenerCursos, obtenerCursoPorId, obtenerAlumnosCursos, crearCurso} = require('../controllers/cursoController');
const cors = require('cors');

const router = express.Router();

router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);
router.get('/alumnos/:curso', obtenerAlumnosCursos);
router.post('/curso', crearCurso);

module.exports = router