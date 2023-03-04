import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './paginas/Dashboard';
import Login from './paginas/Login'
import Alumnos from './paginas/Alumnos'
import RegistrarAlumno from './paginas/RegistrarAlumno'
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Cursos from './paginas/Cursos';
import AlumnosCurso from './paginas/AlumnosCurso';
import Calificaciones from './paginas/Calificaciones';
import Egresados from './paginas/Egresados';
import Dashboard from './paginas/Dashboard';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(<BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="alumnos" element={<Alumnos />} />
      <Route path="egresados" element={<Egresados />} />
      <Route path="registrar" element={<RegistrarAlumno />} />
      <Route path="cursos" element={<Cursos />} />
      <Route path="/curso/alumnos/:curso" element={<AlumnosCurso />} />
  </Routes>
</BrowserRouter>)


