import NavBar from "../componentes/Comun/NavBar";
import Card from "@mui/material/Card";
import { Alert, CardHeader, Collapse, Divider, Snackbar } from "@mui/material";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import EditarAlumno from "../componentes/Alumnos/EditarAlumno";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Boletin from "../componentes/Alumnos/Boletin";
import Historial from "../componentes/Egresados/Historial";

function Alumnos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [copyList, setCopyList] = useState(alumnos);
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState(false);
  const [error, setError] = useState(false);

  const requestSearch = (searched) => {
    const busqueda = alumnos.filter((a) => a.dni.toString().includes(searched));
    if (busqueda.length > 0) {
      setCopyList(busqueda);
    }
  };

  const onModificar = async (
    id,
    apellido,
    nombre,
    genero,
    dni,
    email,
    fechaDeNacimiento,
    telefono,
    direccion
  ) => {
    try {
      console.log("Received values of form: ", id, nombre, fechaDeNacimiento);

      const newUser = await axios.patch(
        "http://localhost:8000/alumnos/modificar/" + id,
        {
          apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1),
          nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
          genero: genero,
          dni: dni,
          direccion: direccion,
          telefono: telefono,
          email: email,
          fechaDeNacimiento: fechaDeNacimiento,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // console.log("###", newUser);
      // console.log("alumnos", alumnos);

      // const alumnosOld = alumnos.filter(
      //   (element) => element._id !== newUser.data._id
      // );
      // console.log("@@@@", [newUser.data, ...alumnosOld]);
      // await setCopyList([newUser.data, ...alumnosOld]);
      // console.log("copylist", copyList);

      axios
      .get("http://localhost:8000/alumnos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAlumnos(response.data);
        console.log("set",alumnos);
        setCopyList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
      setError(false);
      setMsg("Cambios guardados!");
      setOpenAlert(true);
    } catch (err) {
      console.log(err);
      setCopyList(alumnos);
      setError(true);
      setMsg(
        err.status === 500 ? err.data : "No se pudo guardar, el DNI ya existe!"
      );
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/alumnos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/generos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setGeneros(response.data);
        if (response.data.length === 0) {
          setError(true);
          setMsg("No hay alumnos inscriptos");
          setOpenAlert(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

 
  return (
    <>
      <NavBar />
      <CardHeader />
      <Container>
        <TextField
          sx={{ width: 1 / 2 }}
          variant="outlined"
          placeholder="Buscar alumno por legajo..."
          type="search"
          onChange={(e) => requestSearch(e.target.value)}
        />
        <CardHeader />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Legajo</TableCell>
                <TableCell>Apellido y nombre</TableCell>
                <TableCell align="right">Año</TableCell>
                <TableCell align="center">Especialidad</TableCell>
                <TableCell align="center">Curso</TableCell>
                <TableCell align="center">Previas</TableCell>
                <TableCell align="center">Boletín</TableCell>
                <TableCell align="center">Historial</TableCell>
                <TableCell align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(copyList.length > 0 ? copyList : alumnos)
                .sort((a, b) => (a.anio.anio > b.anio.anio ? 1 : -1))
                .map((alumno) => (
                  <TableRow
                    key={alumno._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{alumno.dni}</TableCell>
                    <TableCell component="th" scope="alumno">
                      {alumno.alumno.apellido}, {alumno.alumno.nombre}
                    </TableCell>
                    <TableCell align="center">{alumno.anio.anio}</TableCell>
                    <TableCell align="center">
                      {alumno.especialidad.especialidad}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={"/curso/alumnos/" + alumno.curso._id}
                        color="primary"
                      >
                        {" "}
                        {alumno.curso.nombre}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {alumno.previas == "0" ? " " : alumno.previas}
                    </TableCell>
                    <TableCell align="center">
                      <Boletin
                        thisAlumno={alumno}
                        thisCurso={alumno.curso}
                        onModificar={onModificar}
                        // update={update}
                      />
                    </TableCell>
                    <TableCell>
                      <Historial
                        alumno={alumno}
                        onModificar={onModificar}
                        // update={update}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <EditarAlumno
                        thisAlumno={alumno}
                        thisGeneros={generos}
                        onModificar={onModificar}
                        // update={update}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Alumnos;
