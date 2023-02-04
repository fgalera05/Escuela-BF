const express = require('express');
const {obtenerMaterias} = require('../controllers/materiaController');

const router = express.Router();

router.get('/', obtenerMaterias);


module.exports = router