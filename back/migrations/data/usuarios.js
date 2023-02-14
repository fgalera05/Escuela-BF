const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
const pass = process.env.PASS_ADMIN
const hash = bcrypt.hashSync(pass, salt);
// console.log(hash);

const usuarioAdmin =[ {
    usuario: 'admin',
      password: hash,
      datos: {
        nombre: 'Fer',
        apellido: 'Galera',
      },
      rol: mongoose.Types.ObjectId("000000000000000000000275"),
      isActive: true,
}]

const usuarioPreceptor = [{
    usuario: 'preceptor',
      password: hash,
      datos: {
        nombre: 'Precep',
        apellido: 'Tor',
      },
      rol: mongoose.Types.ObjectId("000000000000000000000276"),
      isActive: true,
}]

const usuarioAlumnos = [{
    usuario: 'alumnos',
    password: hash,
    datos: {
      nombre: 'Alum',
      apellido: 'Nos',
    },
    rol: mongoose.Types.ObjectId("000000000000000000000277"),
    isActive: true,
}]

const usuarios = [...usuarioAdmin,...usuarioPreceptor,...usuarioAlumnos];

exports.usuarios = usuarios