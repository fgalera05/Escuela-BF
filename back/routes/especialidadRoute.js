const express = require('express');
const {obtenerEspecialidades,} = require('../controllers/especialidadController');

const router = express.Router();

router.get('/', obtenerEspecialidades);


module.exports = router