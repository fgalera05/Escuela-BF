const express = require('express')
const conDb = require('./config/db')
require('dotenv').config()
const port = process.env.PORT
const logger = require('./logger')

const morgan = require('morgan')

const alumnoRoute = require('./routes/alumnoRoute')
const especialidadRoute = require('./routes/especialidadRoute')
const materiaRoute = require('./routes/materiaRoute')
const anioRoute = require('./routes/anioRoute')
const cursoRoute = require('./routes/cursoRoute')
const calificacionRoute = require('./routes/calificacionesRoute')


// const {logEntrante, logNotFound} = require('./middlewares/logRequest')
const expressBodyParser = require('body-parser') // x-www-form-urlencoded

conDb();

const app = express()
app.use(morgan('dev'))
app.use(express.json());
app.use(expressBodyParser.urlencoded({ extended: true }))
// app.use(logEntrante);

app.use('/alumnos', alumnoRoute);
app.use('/especialidades', especialidadRoute);
app.use('/materias', materiaRoute);
app.use('/anios', anioRoute);
app.use('/cursos', cursoRoute);
app.use('/calificaciones', calificacionRoute);


app.listen(port, () => {
  logger.info(`Server Escuela App listening on port ${port}`)
});
