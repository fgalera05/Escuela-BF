const logger = require('../logger')


async function logEntrante (req,res,next) {
    logger.info(`httpVersion: ${req.httpVersion}, status:${res.statusCode} - ${req.method}:${req.originalUrl}`);
    next();
  }

async function logNotFound (req,res,next) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(404).send("PAGE NOT FOUND");
}

async function logServerError (err,req,res,next) {
    logger.error(err);
    return res.status(500).send('Could not perform the request!');
    
    }


module.exports = {logEntrante,logNotFound, logServerError}