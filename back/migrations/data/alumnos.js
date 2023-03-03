const mongoose = require('mongoose')

const alumno1 = {
    _id: mongoose.Types.ObjectId("000000000000000000000268"),
    alumno:{
        apellido: "Acero Miltos",
        nombre: "Noelia Emilce",
    },

    dni: 101,
    genero: mongoose.Types.ObjectId('000000000000000000000003'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000000'),
    curso: mongoose.Types.ObjectId('000000000000000000000121'),
    //: mongoose.Types.ObjectId('000000000000000000000118'),
}
const alumno2 = {
    _id: mongoose.Types.ObjectId("000000000000000000000269"),
    alumno:{
        apellido: "Martinez",
        nombre: "Pablo Matias",
    },

    dni: 102,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000000'),
    curso: mongoose.Types.ObjectId('000000000000000000000123'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
}
const alumno3 = {
    _id: mongoose.Types.ObjectId("000000000000000000000270"),
    alumno:{
        apellido: "Perez",
    nombre: "Raton2",
    },
 
    dni: 002,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000001'),
    curso: mongoose.Types.ObjectId('000000000000000000000125'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
}
const alumno3b = {
    _id: mongoose.Types.ObjectId("000000000000000000000271"),
    alumno:{
        apellido: "Perez",
        nombre: "Raton299999", 
    },
    
    dni: 003,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000002'),
    curso: mongoose.Types.ObjectId('000000000000000000000126'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
}
const alumno4 = {
    _id: mongoose.Types.ObjectId("000000000000000000000272"),
    alumno:{
        apellido: "Perez5",
        nombre: "Raton",
    },

    dni: 0913,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000001'),
    curso: mongoose.Types.ObjectId('000000000000000000000127'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
}
const alumno5 = {
    _id: mongoose.Types.ObjectId("000000000000000000000273"),
    alumno:{
        apellido: "Perez5",
        nombre: "Raton",
    },
  
    dni: 7803,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000001'),
    curso: mongoose.Types.ObjectId('000000000000000000000129'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
}
const alumno6 = {
    _id: mongoose.Types.ObjectId("000000000000000000000274"),
    alumno:{
        apellido: "Perez",
    nombre: "Ratont",
    },
    
    dni: 9,
    genero: mongoose.Types.ObjectId('000000000000000000000005'),
    especialidad: mongoose.Types.ObjectId('000000000000000000000002'),
    curso: mongoose.Types.ObjectId('000000000000000000000132'),
    //: mongoose.Types.ObjectId('000000000000000000000118')
    primero: true,
    segundo:true,
    tercero: true,
    cuarto:true,
    quinto:true,
    sexto: true,
    
}

exports.alumno1 = alumno1
exports.alumno2 = alumno2
exports.alumno3 = alumno3
// exports.alumno3b = alumno3b
// exports.alumno4 = alumno4
// exports.alumno5 = alumno5
exports.alumno6 = alumno6
