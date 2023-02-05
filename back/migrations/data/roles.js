const mongoose = require('mongoose')


const roles = [
    {
        _id: mongoose.Types.ObjectId("000000000000000000000275"),
        rol: 'admin',
    },
    {
        _id: mongoose.Types.ObjectId("000000000000000000000276"),
        rol: 'preceptor',
    },
    {
        _id: mongoose.Types.ObjectId("000000000000000000000277"),
        rol: 'alumnos',
    },

]

exports.roles = roles;