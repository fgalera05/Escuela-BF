const express = require('express');
const {obtenerGeneros,} = require('../controllers/generoController');

const router = express.Router();

router.get('/', obtenerGeneros);


module.exports = router