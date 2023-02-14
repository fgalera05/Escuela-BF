import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login'
import Alumnos from './pages/Alumnos'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="dashboard" element={<App />} />
        <Route path="alumnos" element={<Alumnos />} />
        
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

