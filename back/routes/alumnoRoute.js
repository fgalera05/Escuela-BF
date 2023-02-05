const express = require('express');
const {
    obtenerAlumnos,
    obtenerAlumnoPorId,
    obtenerAlumnosPrimero,
    obtenerAlumnosSegundo,
    obtenerAlumnosTercero,
    obtenerAlumnosCuarto,
    obtenerAlumnosQuinto,
    obtenerAlumnosSexto,
    obtenerEgresados,
    crearAlumno,
    modificarAlumno,
    modificarInscripcionAlumno,
    pasarDeAnioAlumno } = require('../controllers/alumnoController');



const router = express.Router();

router.get('/',obtenerAlumnos);
router.get('/alumno/ver/:id', obtenerAlumnoPorId);
router.get('/primero', obtenerAlumnosPrimero);
router.get('/segundo', obtenerAlumnosSegundo);
router.get('/tercero', obtenerAlumnosTercero);
router.get('/cuarto', obtenerAlumnosCuarto);
router.get('/quinto', obtenerAlumnosQuinto);
router.get('/sexto', obtenerAlumnosSexto);
router.get('/egresados', obtenerEgresados);

router.post('/', crearAlumno);
router.patch('/modificar/:id',modificarAlumno);
router.patch('/reinscribir/:id', modificarInscripcionAlumno);
router.patch('/pasardeanio/:id', pasarDeAnioAlumno)


module.exports = router;