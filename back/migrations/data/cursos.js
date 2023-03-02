const mongoose = require('mongoose')

const cantidadAlumnos = 30

const cursosPrimero = [
    {
        _id:   new mongoose.Types.ObjectId('000000000000000000000121'),
        nombre: '1A',
        anio:  new mongoose.Types.ObjectId('000000000000000000000006'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,

    },
    {
        _id:   new mongoose.Types.ObjectId('000000000000000000000122'),
        nombre: '1B',
        anio:  new mongoose.Types.ObjectId('000000000000000000000006'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
 
    },]

const cursosSegundo = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000123'),
        nombre: '2A',
        anio: new mongoose.Types.ObjectId('000000000000000000000007'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,
        
    },
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000124'),
        nombre: '2B',
        anio: new mongoose.Types.ObjectId('000000000000000000000007'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
        
    },]

const cursosTerceroMMO = [    
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000125'),
        nombre: '3MMO',
        anio: new mongoose.Types.ObjectId('000000000000000000000008'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,
       
    },]

const cursosTerceroTC = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000126'),
        nombre: '3TC',
        anio: new mongoose.Types.ObjectId('000000000000000000000009'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
        
    },]

const cursosCuartoMM0=[
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000127'),
        nombre: '4MMO',
        anio: new mongoose.Types.ObjectId('000000000000000000000010'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,
        
    },]

const cursosCuartoTC =[
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000128'),
        nombre: '4TC',
        anio: new mongoose.Types.ObjectId('000000000000000000000011'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
       
    },]

const cursosQuintoMMO =[
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000129'),
        nombre: '5MMO',
        anio: new mongoose.Types.ObjectId('000000000000000000000012'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,
        
    },]

const cursosQuintoTC = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000130'),
        nombre: '5TC',
        anio: new mongoose.Types.ObjectId('000000000000000000000013'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
       
    },]

const cursosSextoMMO = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000131'),
        nombre: '6MMO',
        anio: new mongoose.Types.ObjectId('000000000000000000000014'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000118'),
        cantidadAlumnos: cantidadAlumnos,
        
    },]
const cursosSextoTC = [
    {
        _id: new mongoose.Types.ObjectId('000000000000000000000132'),
        nombre: '6TC',
        anio: new mongoose.Types.ObjectId('000000000000000000000015'),
        // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
        cantidadAlumnos: cantidadAlumnos,
       
    },]

    const egresados = [
        {
            _id: new mongoose.Types.ObjectId('000000000000000000000232'),
            nombre: 'Egresados',
            anio: new mongoose.Types.ObjectId('000000000000000000000016'),
            // turno: new mongoose.Types.ObjectId('000000000000000000000119'),
            cantidadAlumnos: cantidadAlumnos,
           
        },]

const cursos = [...cursosPrimero,...cursosSegundo,...cursosTerceroMMO,...cursosTerceroTC,...cursosCuartoMM0
    ,...cursosCuartoTC,...cursosQuintoMMO,...cursosQuintoTC,...cursosSextoMMO,...cursosSextoTC,...egresados]

exports.cursos = cursos
// exports.cursosPrimero = cursosPrimero
// exports.cursosSegundo = cursosSegundo
// exports.cursosTerceroMMO = cursosTerceroMMO
// exports.cursosTerceroTC = cursosTerceroTC
// exports.cursosCuartoMM0 = cursosCuartoMM0
// exports.cursosCuartoTC = cursosCuartoTC
// exports.cursosQuintoMMO = cursosQuintoMMO
// exports.cursosQuintoTC = cursosQuintoTC
// exports.cursosSextoMMO = cursosSextoMMO
// exports.cursosSextoTC = cursosSextoTC
