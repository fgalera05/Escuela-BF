const jwt = require('jsonwebtoken');
const logger = require('../logger');

async function authJWT(req, res, next) {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            await jwt.verify(token, process.env.SECRET_KEY)
            logger.info('Token válido!')
            next()
        } catch (error) {
            logger.error('Firma token inválida!')
            next(error)

        }
    }

    if (!token) {
        logger.error('Token no enviado!')
        return res.status(400).json('Token no enviado!')
    }
}


module.exports = { authJWT }