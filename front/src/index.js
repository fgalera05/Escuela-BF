import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login'
import Alumnos from './pages/Alumnos'
import RegistrarAlumno from './pages/RegistrarAlumno'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Cursos from './pages/Cursos';
import AlumnosCurso from './pages/AlumnosCurso';

ReactDOM.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="dashboard" element={<App />} />
        <Route path="alumnos" element={<Alumnos />} />
        <Route path="registrar" element={<RegistrarAlumno />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="/curso/alumnos/:curso" element={<AlumnosCurso />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

