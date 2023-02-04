const mongoose  =require('mongoose');
const logger = require('../logger')

const conDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        if (con){
            logger.info(`Base de datos conectada: ${process.env.MONGO_URL}`)
        }else{
            logger('Base de datos NO conectada!');
        }
    } catch (error) {
        logger.error('Error conectando DB!');
        process.exit();
    }
}

module.exports = conDb;