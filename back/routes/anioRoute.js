const express = require('express');
const {obtenerAnios} = require('../controllers/anioController');

const router = express.Router();

router.get('/', obtenerAnios);


module.exports = router