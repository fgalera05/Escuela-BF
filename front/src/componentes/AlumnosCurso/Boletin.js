import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import ArticleIcon from "@mui/icons-material/Article";

import { useForm } from 'react-hook-form';
import axios from 'axios';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ValidacionTexto from '../Comun/ValidacionTexto';
import { useNavigate } from 'react-router-dom';
import EditarBoletinCurso from './EditarBoletinCurso';



function Boletin({ thisAlumno, thisCurso, onModificar }) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
    } = useForm();
    const [open, setOpen] = React.useState(false);
    const alumno = thisAlumno;
  
    const [curso, setCurso] = React.useState(thisCurso);
    const [materias, setMaterias] = React.useState([]);
    const [calificaciones, setCalificaciones] = React.useState([]);
  
    const [apellido, setApellido] = React.useState(thisAlumno.alumno.apellido);
    const [nombre, setNombre] = React.useState(thisAlumno.alumno.nombre);
  
    const handleClose = () => {
      onModificar(true);
      setOpen(false);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickGuardar = (data) => {
      console.log(data);
      // onModificar(alumno._id, apellido, nombre);
      setOpen(false);
    };
  
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      axios
        .get(
          process.env.REACT_APP_URL+"calificaciones/calificacion/curso/" +
            curso +
            "/" +
            alumno._id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCalificaciones(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const onModificarBoletin = (data) => {
      const filtradas = calificaciones.filter((c) => c._id !== data._id);
      setCalificaciones([data, ...filtradas]);
    };
  
    return (
      <>
        <IconButton
          color="secondary"
          aria-label="edit"
          component="label"
          onClick={handleClickOpen}
        >
          <ArticleIcon />
        </IconButton>
  
        <Dialog open={open} onClose={handleClose} maxWidth="string">
          <DialogTitle>
            Calificaciones de: {apellido}, {nombre}
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Materia</TableCell>
                    <TableCell>Primer cuatrimestre</TableCell>
                    <TableCell>Segundo cuatrimestre</TableCell>
                    <TableCell>Tercer cuatrimestre</TableCell>
                    <TableCell>Diciembre</TableCell>
                    <TableCell>Marzo</TableCell>
                    <TableCell>Nota final</TableCell>
                    <TableCell>Aprobada</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calificaciones
                    .sort((c, d) =>
                      c.materia.materia < d.materia.materia ? -1 : 1
                    )
                    .map((c, i) => (
                      <TableRow key={c._id}>
                        <TableCell>{c.materia.materia}</TableCell>
                        <TableCell align="center">
                          {c.notas.primerCuatrimestre > 0
                            ? c.notas.primerCuatrimestre
                            : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.notas.segundoCuatrimestre > 0
                            ? c.notas.segundoCuatrimestre
                            : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.notas.tercerCuatrimestre > 0
                            ? c.notas.tercerCuatrimestre
                            : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.notas.diciembre > 0 ? c.notas.diciembre : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.notas.marzo > 0 ? c.notas.marzo : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.notas.notaFinal > 0 ? c.notas.notaFinal : " "}
                        </TableCell>
                        <TableCell align="center">
                          {c.aprobada ? <DoneAllIcon color="secondary" /> : ""}
                        </TableCell>
                        <TableCell align="center">
                          <EditarBoletinCurso
                            thisCalificacion={c}
                            onModificar={onModificarBoletin}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }



export default Boletin
