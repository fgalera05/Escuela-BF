const express = require('express');
const {obtenerMaterias, modificarMateria} = require('../controllers/materiaController');

const router = express.Router();

router.get('/', obtenerMaterias);
router.patch('/:id', modificarMateria);


module.exports = router