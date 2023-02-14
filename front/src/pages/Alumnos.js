import NavBar from "../componentes/NavBar";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
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
import { format } from 'date-fns'
import { useForm } from "react-hook-form";

function BasicDatePicker(props) {
  const [value, setValue]= React.useState(props.fecha);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Fecha de nacimiento"
        value={value}
        onChange={(newValue) => {
            setValue(newValue)
            props.setFechaDeNacimiento(newValue.$d);
        }}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}

function MiDialog({thisAlumno, thisGeneros, onModificar}) {
  const { register, formState: { errors }, handleSubmit, required } = useForm();
  const [open, setOpen] = React.useState(false);
  const alumno = thisAlumno;
  
  const [generos, setGeneros] = React.useState(thisGeneros);
  

  const [apellido, setApellido] = React.useState(thisAlumno.alumno.apellido);
  const [nombre, setNombre] = React.useState(thisAlumno.alumno.nombre);
  const [direccion, setDireccion] = React.useState(thisAlumno.alumno.direccion);
  const [email, setEmail] = React.useState(thisAlumno.alumno.email);
  const [telefono, setTelefono] = React.useState(thisAlumno.alumno.telefono);
  const [fechaDeNacimiento, setFechaDeNacimiento] = React.useState(thisAlumno.fechaDeNacimiento);
  const [genero, setGenero] = React.useState(thisAlumno.genero);
  const [dni, setDni] = React.useState(thisAlumno.dni);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickGuardar = (data) => {
    console.log(data);
    onModificar(alumno._id, apellido, nombre, genero, dni, data.email, fechaDeNacimiento, telefono, direccion);

    console.log(fechaDeNacimiento);
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/generos", {
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

  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit"
        component="label"
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>Editar alumno</DialogContentText>
         
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="apellido"
                label="Apellidos"
                defaultValue={apellido}
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
              />
              <TextField
                required
                id="nombre"
                label="Nombres"
                defaultValue={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
              />
            </div>
            <div>
              <TextField
                id="Género"
                select
                label="Género"
                defaultValue={genero._id}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                onChange={(e) => {
                  setGenero(e.target.value);
                }}
              >
                {generos.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.genero}
                  </option>
                ))}
              </TextField>
              <TextField
                required
                id="dni"
                label="DNI"
                defaultValue={dni}
                  onChange={(e) => {
                    setDni(e.target.value);
                  }}
              />
            </div>
            <div>
              <TextField
                required
                id="direccion"
                label="Dirección"
                defaultValue={alumno.direccion}
                onChange={(e) => {
                    setDireccion(e.target.value);
                  }}
              />
              <TextField
                required
                id="email"
                label="email"
                defaultValue={alumno.email}
                onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  {...register("email", { required: "Email Address is required" })} 
        aria-invalid={errors.email ? "true" : "false"} 
      />
      {errors.email && <p role="alert">{errors.email?.message}</p>}
              <TextField
                required
                id="telefono"
                label="Teléfono"
                defaultValue={alumno.telefono}
                onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
              />
              <BasicDatePicker fecha={alumno.fechaDeNacimiento} setFechaDeNacimiento={setFechaDeNacimiento}/>
              <TextField
                disabled
                id="anio"
                label="Año"
                defaultValue={alumno.anio.anio}
                variant="standard"
               
              />
              <TextField
                disabled
                id="especialidad"
                label="Especialdiad"
                defaultValue={alumno.especialidad.especialidad}
                variant="standard"
              />
              <TextField
                disabled
                id="curso"
                label="curso"
                defaultValue={alumno.curso.nombre}
                variant="standard"
                
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error"  onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleClickGuardar)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

function Alumnos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [generos, setGeneros] = useState([]);

  const onModificar = async (id, apellido, nombre, genero, dni, email, fechaDeNacimiento, telefono, direccion) => {
    try {
      console.log("Received values of form: ", id,nombre,fechaDeNacimiento);
      
      const newUser = await axios.patch(
        "http://localhost:8000/alumnos/modificar/" + id,
        {
            apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1),
            nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
            genero: genero,
            dni: dni,
            direccion: direccion,
            telefono: telefono,
            email:email,
            fechaDeNacimiento: fechaDeNacimiento,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const alumnosOld = alumnos.filter(element =>
        (element._id !== newUser.data._id)
      )
      setAlumnos([newUser.data,...alumnosOld, ]);
    } catch (err) {
      console.log(err);
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
        <Typography variant="h5" component="div">
          Buscar alumnos
        </Typography>
        <CardHeader />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Legajo</TableCell>
                <TableCell >Apellido y nombre</TableCell>
                <TableCell align="right">DNI</TableCell>
                <TableCell align="center">Género</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="right">Año</TableCell>
                <TableCell align="right">Especialidad</TableCell>
                <TableCell align="right">Curso</TableCell>
                <TableCell align="right">Previas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.map((alumno) => (
                <TableRow
                  key={alumno._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{parseInt(alumno._id)}</TableCell>
                  <TableCell component="th" scope="alumno">
                    {alumno.alumno.apellido}, {alumno.alumno.nombre}
                  </TableCell>
                  <TableCell align="right">{alumno.dni}</TableCell>
                  <TableCell align="right">{alumno.genero.genero}</TableCell>
                  <TableCell align="right">{alumno.direccion}</TableCell>
                  <TableCell align="right">{alumno.telefono}</TableCell>
                  <TableCell align="right">{alumno.email}</TableCell>
                  <TableCell align="right">{alumno.anio.anio}</TableCell>
                  <TableCell align="right">
                    {alumno.especialidad.especialidad}
                  </TableCell>
                  <TableCell align="right">{alumno.curso.nombre}</TableCell>
                  <TableCell align="right">
                    {alumno.previas == "0" ? "-" : alumno.previas}
                  </TableCell>
                  <TableCell align="right">
                    <MiDialog
                      thisAlumno={alumno}
                      thisGeneros={generos}
                      onModificar={onModificar}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Alumnos;
