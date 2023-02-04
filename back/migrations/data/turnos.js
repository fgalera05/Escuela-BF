const mongoose = require('mongoose')

const turnos = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000118'),
        nombre: "Mañana",
        horario: "8 a 12.30 hs"
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000119'),
        nombre: "Tarde",
        horario: "13 a 17.30 hs"
    },
    // {
    //     _id: new mongoose.Types.ObjectId('000000000000000000000120'),
    //     nombre: "Noche",
    //     horario: "18 a 22.30 hs"
    // },
]

exports.turnos = turnos