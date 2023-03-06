import React from 'react';
import './index.css';
import Login from './paginas/Login'
import Alumnos from './paginas/Alumnos'
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Cursos from './paginas/Cursos';
import AlumnosCurso from './paginas/AlumnosCurso';
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
      <Route path="cursos" element={<Cursos />} />
      <Route path="/curso/alumnos/:curso" element={<AlumnosCurso />} />
  </Routes>
</BrowserRouter>)


