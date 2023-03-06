import NavBar from "../componentes/Comun/NavBar";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import AgregarAlumno from "../componentes/Cursos/AgregarAlumno";
import VerCurso from "../componentes/Cursos/VerCurso";

export const UserContext = React.createContext();

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [calificaciones, setCalificaciones] = useState([]);
  const token = localStorage.getItem("token");
  const [ver, setVer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "cursos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCursos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "calificaciones/calificacion/curso/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCalificaciones(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      <NavBar />
      <CardHeader />
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Curso</TableCell>
                <TableCell align="left">Año</TableCell>
                <TableCell align="left">Especialidad</TableCell>
                <TableCell align="center">Alumnos</TableCell>
                <TableCell align="center">Agregar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cursos
                .sort((a, b) => (a.anio.anio > b.anio.anio ? 1 : -1))
                .map((curso) => (
                  <Row key={curso._id} row={curso} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Cursos;

function Row({ row, ver }) {
  const [open, setOpen] = React.useState(false);
  const [openAgregar, setOpenAgregar] = React.useState(false);
  const token = localStorage.getItem("token");
  const [disponible, setDisponible] = React.useState(false);
  const [generos, setGeneros] = React.useState([]);
  const [anotados, setAnotados] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "cursos/cantidad/" + row._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("antes", response.data);
        setDisponible(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "generos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  const lugares =
    parseInt(row.cantidadAlumnos) - parseInt(disponible)
      ? parseInt(row.cantidadAlumnos) - parseInt(disponible)
      : 0;
  useEffect(() => {
    setAnotados(parseInt(row.cantidadAlumnos) - parseInt(disponible));
  }, []);

  return (
    <UserContext.Provider value={row}>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.nombre}
          </TableCell>
          <TableCell align="left">{row.anio.anio}</TableCell>
          <TableCell align="left">
            {row.anio.especialidad.especialidad}
          </TableCell>
          <TableCell align="center">
            <VerCurso label="Ver alumnos" course={row} lugares={disponible} />
          </TableCell>
          <TableCell align="center">
            {lugares > 0 ? (
              <AgregarAlumno
                openAgregar={open}
                curso={row}
                lugar={lugares}
                generos={generos}
              />
            ) : (
              " "
            )}
          </TableCell>
        </TableRow>
      </React.Fragment>
    </UserContext.Provider>
  );
}
