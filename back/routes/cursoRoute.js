const express = require('express');
const {obtenerCursos, obtenerAlumnosCursos} = require('../controllers/cursoController');

const router = express.Router();

router.get('/', obtenerCursos);
router.get('/alumnos/:curso', obtenerAlumnosCursos);


module.exports = router