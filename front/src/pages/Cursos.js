import NavBar from "../componentes/NavBar";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";

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
import { useNavigate } from "react-router-dom";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export const UserContext = React.createContext();

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [calificaciones, setCalificaciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCursos(response.data);
        console.log(cursos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/calificaciones/calificacion/curso/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCalificaciones(response.data);
      })
      .catch((error) => {
        console.log(error);
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openAgregar, setOpenAgregar] = React.useState(false);
  const token = localStorage.getItem("token");
  const [disponible, setDisponible] = React.useState(false);
  const [generos, setGeneros] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/cantidad/" + row._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setDisponible(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/generos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const lugares =
    parseInt(row.cantidadAlumnos) - parseInt(disponible)
      ? parseInt(row.cantidadAlumnos) - parseInt(disponible)
      : " ";

  const handleAgregarAlumno = () => {
    setOpen(true);
    console.log(open);
  };

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
            <MiButton label="Ver alumnos" curso={row} />
          </TableCell>
          <TableCell align="center">
            <Stack spacing={1}>
              <AgregarAlumno openAgregar={open} curso={row} lugar={lugares} generos={generos}/>
            </Stack>
          </TableCell>
          
        </TableRow>
      </React.Fragment>
    </UserContext.Provider>
  );
}

function MiButton(props) {
  const [curso, setCurso] = useState(props.curso);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/curso/alumnos/" + curso._id);
  };

  return (
    <IconButton
      color="primary"
      aria-label="agregar alumno"
      onClick={handleClick}
    >
      <GroupIcon />
    </IconButton>
  );
}

function AgregarAlumno({ openAgregar, curso, lugar, generos}) {
  const [openAgregarDialog, setOpenAgregarDialog] = React.useState(false);
  const lugares = lugar;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [apellido, setApellido] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [previas, setPrevias] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClose = () => {
    setOpenAgregarDialog(false);
  };

  const handleAgregarAlumno = () => {
    setOpenAgregarDialog(true);
  };

  const handleGuardar = async (data) => {
    console.log(data);
    try {
      console.log(
        "Received values of form: ",
        data.apellido,
        data.nombre,
        data.genero,
        data.email,
        data.dni
      );

      const msg = await axios.post(
        "http://localhost:8000/alumnos",
        {
          apellido: data.apellido.charAt(0).toUpperCase() + data.apellido.slice(1),
          nombre: data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1),
          genero: data.genero,
          dni: data.dni,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          curso: curso,
          anio: curso.anio._id,
          previas: data.previas?data.previas:0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      setSucess(true)
      setOpen(true)
      reset();
      navigate("/curso/alumnos/" + curso._id);
    } catch (err) {
      console.log(err);
      setMsg(err.response.data)
      setOpen(true);

    }
  };

  return (
    <>
      {lugares > 0 ? (
        <IconButton
          color="secondary"
          aria-label="agregar alumno"
          onClick={handleAgregarAlumno}
        >
          <PersonAddAltIcon />
        </IconButton>
      ) : (
        " "
      )}
      <Dialog open={openAgregarDialog} onClose={handleClose}>
        <DialogTitle>Agregar alumno a Curso: {curso.nombre} - {curso.anio.nombre}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
                id="apellido"
                label="Apellidos"
                defaultValue={apellido}
                type="text"
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
                {...register("apellido", {
                  required: true, pattern: /^[A-Za-z]+$/i 
                })}
                aria-invalid={errors.apellido ? "true" : "false"}
              />
              {apellido.length === 0 && <p role="alert">{errors.apellido?.message}</p>}
            <TextField
                id="nombre"
                label="Nombres"
                defaultValue={nombre}
                type="text"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                {...register("nombre", {
                  required: true,
                })}
                aria-invalid={errors.nombre ? "true" : "false"}
              />
              {nombre.length === 0 && <p role="alert">{errors.nombre?.message}</p>}
            </div>
            <div>
            <TextField
                id="Género"
                select
                label="Género"
                defaultValue={""}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                onChange={(e) => {
                  setGenero(e.target.value);
                }}
                {...register("genero", {
                  required: "El género es requerido",
                })}
                aria-invalid={errors.genero ? "true" : "false"}
              >
                {generos.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.genero}
                  </option>
                ))}
                {errors.genero && <p role="alert">{errors.genero?.message}</p>}
              </TextField>
            </div>
            <div>
            <TextField
                id="email"
                label="Email"
                defaultValue={email}
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                {...register("email", {
                  required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {email.length === 0 && <p role="alert">{errors.email?.message}</p>}
            <TextField
                id="dni"
                label="DNI"
                defaultValue={dni}
                type="number"
                onChange={(e) => {
                  setDni(e.target.value);
                }}
                {...register("dni", {
                  required: true,
                })}
                aria-invalid={errors.dni ? "true" : "false"}
              />
              {dni.length === 0 && <p role="alert">{errors.dni?.message}</p>}
            </div>
            <div>
            <TextField
                id="direccion"
                label="Dirección"
                defaultValue={dni}
                type="text"
                onChange={(e) => {
                  setDireccion(e.target.value);
                }}
                {...register("direccion", {
                  required: true,
                })}
                aria-invalid={errors.direccion ? "true" : "false"}
              />
              {direccion.length === 0 && <p role="alert">{errors.direccion?.message}</p>}
            <TextField
                id="telefono"
                label="Teléfono"
                defaultValue={telefono}
                type="number"
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
                {...register("telefono", {
                  required: true,
                })}
                aria-invalid={errors.telefono ? "true" : "false"}
              />
              {telefono.length === 0 && <p role="alert">{errors.telefono?.message}</p>}
              <TextField
                id="previas"
                label="Previas"
                defaultValue={0}
                type="number"
                onChange={(e) => {
                  setPrevias(e.target.value);
                }}
                {...register("previas", {
                  required: true,
                })}
                aria-invalid={errors.previas ? "true" : "false"}
              />
              {previas.length === 0 && <p role="alert">{errors.previas?.message}</p>}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleGuardar)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
        >
          {sucess ?
            <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Guardado!
          </Alert>
          :
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert> }
        </Snackbar>
    </>
  );
}
