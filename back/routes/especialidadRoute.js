const express = require('express');
const {obtenerEspecialidades,modificarEspecialidadPorId} = require('../controllers/especialidadController');

const router = express.Router();

router.get('/', obtenerEspecialidades);
router.patch('/:id', modificarEspecialidadPorId);

module.exports = router