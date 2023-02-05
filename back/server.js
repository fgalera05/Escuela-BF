const express = require('express')
const conDb = require('./config/db')
require('dotenv').config()
const port = process.env.PORT
const logger = require('./logger')
const {logNotFound, logServerError,} = require('./middlewares/logRequest')
const {authJWT} = require('./middlewares/authJWT')
const cors = require('cors');
const morgan = require('morgan')


//rutas
const alumnoRoute = require('./routes/alumnoRoute')
const especialidadRoute = require('./routes/especialidadRoute')
const materiaRoute = require('./routes/materiaRoute')
const anioRoute = require('./routes/anioRoute')
const cursoRoute = require('./routes/cursoRoute')
const calificacionRoute = require('./routes/calificacionesRoute')
const usuarioRoute = require('./routes/usuarioRoute')
const loginRoute = require('./routes/loginRoute')

// x-www-form-urlencoded
const expressBodyParser = require('body-parser') 

conDb();
const app = express()

app.use(cors({origin: 'http://yourapp.com'}));
app.use(morgan('dev'))
app.use(express.json());
app.use(expressBodyParser.urlencoded({ extended: true }))

app.use('/', loginRoute);
app.use('/auth', authJWT,usuarioRoute);
app.use('/alumnos', authJWT,alumnoRoute);
app.use('/especialidades', authJWT,especialidadRoute);
app.use('/materias', authJWT,materiaRoute);
app.use('/anios', authJWT,anioRoute);
app.use('/cursos', authJWT,cursoRoute);
app.use('/calificaciones', authJWT,calificacionRoute);

app.use(logNotFound);
app.use(logServerError);

app.listen(port, () => {
  logger.info(`Server Escuela App listening on port ${port}`)
});
