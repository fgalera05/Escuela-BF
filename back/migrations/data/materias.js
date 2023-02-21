const mongoose = require('mongoose')

const materiasPrimero =[
    {_id: mongoose.Types.ObjectId("000000000000000000000006"),materia: "Lengua y Literatura",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000007"),materia: "Inglés",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000008"),materia: "Historia",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000009"),materia: "Geografía",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000010"),materia: "Educación Ciudadana",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000011"),materia: "Educación Física",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000012"),materia: "Biología",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000013"),materia: "Educación Artística",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000014"),materia: "Matemática",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000015"),materia: "Tecnología de la Representación",seDicta: true, anio:1 },
    {_id: mongoose.Types.ObjectId("000000000000000000000016"),materia: "Taller",seDicta: true, anio:1 },
]
const materiasSegundo =[
    {_id: mongoose.Types.ObjectId("000000000000000000000017"),materia: "Lengua y Literatura",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000018"),materia: "Inglés",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000019"),materia: "Historia",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000020"),materia: "Geografía",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000021"),materia: "Educación Ciudadana",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000022"),materia: "Educación Física",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000023"),materia: "Biología",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000024"),materia: "Educación Artística",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000025"),materia: "Matemática",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000026"),materia: "Tecnología de la Representación",seDicta: true, anio:2 },
    {_id: mongoose.Types.ObjectId("000000000000000000000027"),materia: "Taller",seDicta: true, anio:2 },
]

const materias3roMMO = [
    {_id: mongoose.Types.ObjectId("000000000000000000000028"),materia: "Lengua y Literatura",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000029"),materia: "Inglés",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000030"),materia: "Historia",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000031"),materia: "Geografía",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000032"),materia: "Educación Ciudadana",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000033"),materia: "Educación Física",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000034"),materia: "Química",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000035"),materia: "Física",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000036"),materia: "Matemática",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000037"),materia: "Tecnología de la Representación",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000038"),materia: "Taller tecnología y del control",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000039"),materia: "Taller de técnicas, sistemas contructivos e instalaciones I",seDicta: true, anio:3 },
]

const materias3roTC = [
    {_id: mongoose.Types.ObjectId("000000000000000000000040"),materia: "Historia",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000041"),materia: "Geografía",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000042"),materia: "Educación Física",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000043"),materia: "Educación Ciudadana",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000044"),materia: "Inglés",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000045"),materia: "Lengua y Literatura",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000046"),materia: "Matemática",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000047"),materia: "Física",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000048"),materia: "Tecnología de la Representación",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000049"),materia: "Química",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000050"),materia: "Taller tecnología y Control",seDicta: true, anio:3 },
    {_id: mongoose.Types.ObjectId("000000000000000000000051"),materia: "Taller",seDicta: true, anio:3 },
]

const materias4toMMO =[
    {_id: mongoose.Types.ObjectId("000000000000000000000052"),materia: "Lengua y Literatura",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000053"),materia: "Inglés",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000054"),materia: "Ciudadanía y Trabajo",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000055"),materia: "Teoría de la arquitectura I y representación gráfica",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000056"),materia: "Práctica proyectual integradora I",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000057"),materia: "Educación Física",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000058"),materia: "Química Aplicada",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000059"),materia: "Taller de técnicas, sistemas constructivos e instalaciones II",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000060"),materia: "Matemática",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000061"),materia: "Tecnología de los materiales",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000062"),materia: "Estática",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000063"),materia: "Resistencia de los materiales",seDicta: true, anio:4 },
]

const materias4toTC = [
    {_id: mongoose.Types.ObjectId("000000000000000000000064"),materia: "Historia",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000065"),materia: "Geografía",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000066"),materia: "Eduación Física",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000067"),materia: "Inglés",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000068"),materia: "Lengua y Literatura",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000069"),materia: "Matematica",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000070"),materia: "Base de Datos",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000071"),materia: "Organización de Computadoras",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000072"),materia: "Lógica Computacional",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000073"),materia: "Proyecto Informático I",seDicta: true, anio:4 },
    {_id: mongoose.Types.ObjectId("000000000000000000000074"),materia: "Laboratorio de algoritmos y estructura de datos",seDicta: true, anio:4 },
]  

const materias5toMMO = [
    {_id: mongoose.Types.ObjectId("000000000000000000000075"),materia: "Lengua y Literatura",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000076"),materia: "Inglés",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000077"),materia: "Gestión de los Procesos Productivos",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000078"),materia: "Economía y gestión de las organizaciones",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000079"),materia: "Teoría de la arquitectura II",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000080"),materia: "Educación Física",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000081"),materia: "Práctica Proyectual Integradora II",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000082"),materia: "Taller de técnicas, sistemas constructivos e instalaciones III",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000083"),materia: "Matemática",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000084"),materia: "Instalaciones III",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000085"),materia: "Sistemas Constructivos y de Fundaciones",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000086"),materia: "Sistemas estructurales de hormigón armado",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000087"),materia: "Sistemas estructurales metálicos y de madera",seDicta: true, anio:5 },
]

const materias5toTC = [
    {_id: mongoose.Types.ObjectId("000000000000000000000088"),materia: "Laboratorio de Programación Orientada a Objetos",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000089"),materia: "Redes",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000090"),materia: "Educación Física",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000091"),materia: "Proyecto Informático II",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000092"),materia: "Inglés",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000093"),materia: "Lengua y Literatura",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000094"),materia: "Matemática",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000095"),materia: "Economía y Gestión de las Organizaciones",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000096"),materia: "Administración y Gestión de Bases de Datos",seDicta: true, anio:5 },
    {_id: mongoose.Types.ObjectId("000000000000000000000097"),materia: "Análisis de Sistemas",seDicta: true, anio:5 },]

const materias6toMMO = [
    {_id: mongoose.Types.ObjectId("000000000000000000000098"),materia: "Ciencia y Tecnología",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000099"),materia: "Prácticas de Topografía y Obras Viales",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000100"),materia: "Instalaciones electromecánicas y medio de comunicación centralizada",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000101"),materia: "Instalaciones térmicas y de gas individuales y centralizadas",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000102"),materia: "Práctica de cálculo estructural",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000103"),materia: "Educación Física",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000104"),materia: "Práctica Proyectual Integradora III",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000105"),materia: "Legislación de obras",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000106"),materia: "Computo, presupuestos y especificaciones",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000107"),materia: "Gestión, administración, conducción, marketing y comercialización de las obras",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000108"),materia: "Prácticas Profesionalizantes",seDicta: true, anio:6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000109"),materia: "Proyecto de Instalaciones de Obras Sanitarias y de prevención e instalaciones contra incendio",seDicta: true, anio:6 },
]


const materias6toTC = [
    {_id: mongoose.Types.ObjectId("000000000000000000000110"),materia: "Ciudadanía y Trabajo",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000111"),materia: "Ciencia y Tecnología",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000112"),materia: "Educación Física",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000113"),materia: "Administración de Sistemas y de Redes",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000114"),materia: "Inglés",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000115"),materia: "Prácticas Profesionalizantes",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000116"),materia: "Matemática",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000117"),materia: "Gestión de los Procesos Productivos",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000118"),materia: "Desarrollo de Sistemas",seDicta: true, anio: 6 },
    {_id: mongoose.Types.ObjectId("000000000000000000000119"),materia: "Programación sobre Redes",seDicta: true, anio: 6 },
]

const materias = [...materiasPrimero,...materiasSegundo,...materias3roMMO,...materias3roTC,
  ...materias4toMMO,...materias4toTC,...materias5toMMO,...materias5toTC,
  ...materias6toMMO,...materias6toTC]

exports.materias = materias
exports.materiasPrimero = materiasPrimero
exports.materiasSegundo = materiasSegundo
exports.materias3roMMO = materias3roMMO
exports.materias3roTC = materias3roTC
exports.materias4toMMO = materias4toMMO
exports.materias4toTC = materias4toTC
exports.materias5toMMO = materias5toMMO
exports.materias5toTC = materias5toTC
exports.materias6toMMO = materias6toMMO
exports.materias6toTC = materias6toTC
