import NavBar from "../componentes/Comun/NavBar";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect } from "react";

import React from "react";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Payment details", "Review your order"];

function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.fecha);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Fecha de nacimiento"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.setFechaDeNacimiento(newValue.$d);
        }}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}

function RegistrarAlumno() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const [apellido, setApellido] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [fechaDeNacimiento, setFechaDeNacimiento] = React.useState("");
  const [previas, setPrevias] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [anio, setAnio] = React.useState("-");
  const [anios, setAnios] = React.useState([]);

  const [cursos, setCursos] = React.useState([]);
  const [cursoDispo, setCursoDispo] = React.useState(cursos);
  const [curso, setCurso] = React.useState("-");
  const [cursosAux, setCursosAux] = React.useState("-");

  const [generos, setGeneros] = React.useState([]);
  const [genero, setGenero] = React.useState("-");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSucess(false)
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
        data.curso,
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
          curso: data.curso,
          anio: anio,
          previas: previas,
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
      changeCurso()
    } catch (err) {
      console.log(err);
      setMsg(err.response.data)
      setOpen(true);

    }
  };

  const handleCancelar = () => {
    navigate("/dashboard");
  };

  const changeCurso = (e) => {
    const disponibles = cursos.slice(1).filter((c) => c.anio._id === e);
    setCursoDispo(disponibles);
    setCurso(disponibles[0]._id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/anios/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAnios([
          { id: "1", anio: "-" },
          ...response.data.slice(0, -1).map((e) =>
            ({ id: e._id, anio: e.nombre + ": " + e.especialidad.especialidad })
          ),
        ]);
        if(response.data.length === 0){
          setMsg("No hay años creados para realizar inscripciones");
          setOpen(true);
        }
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
        setGeneros([{ _id: "1", genero: "-" }, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCursos([{ _id: "1", nombre: "-" }, ...response.data]);
        setCursosAux([{ _id: "1", nombre: "-" }, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <CardHeader />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h5" component="div">
          Registrar nuevo alumno
        </Typography>
        <Paper>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="apellido"
                label="Apellidos"
                defaultValue={apellido}
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
                {...register("apellido", {
                  required: "El apellido es requerido",
                })}
                aria-invalid={errors.apellido ? "true" : "false"}
              />
              {errors.apellido && <p role="alert">{errors.apellido?.message}</p>}
              <TextField
                required
                id="nombre"
                label="Nombres"
                defaultValue={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                {...register("nombre", {
                  required: "El nombre es requerido",
                })}
                aria-invalid={errors.nombre ? "true" : "false"}
              />
              {errors.nombre && <p role="alert">{errors.nombre?.message}</p>}
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
              <TextField
                required
                id="dni"
                label="DNI"
                defaultValue={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                }}
                {...register("dni", {
                  required: "El dni es requerido",
                })}
                aria-invalid={errors.dni ? "true" : "false"}
              />
              {errors.dni && <p role="alert">{errors.nombre?.dni}</p>}
            </div>
            <div>
              <TextField
                required
                id="direccion"
                label="Dirección"
                defaultValue={direccion}
                onChange={(e) => {
                  setDireccion(e.target.value);
                }}
                {...register("direccion", {
                  required: "La dirección es requerida",
                })}
                aria-invalid={errors.direccion ? "true" : "false"}
              />
              {errors.direccion && (
                <p role="alert">{errors.direccion?.message}</p>
              )}
              <TextField
                required
                id="email"
                label="email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p role="alert">{errors.email?.message}</p>}
              <TextField
                required
                id="telefono"
                label="Teléfono"
                defaultValue={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
                {...register("telefono", {
                  required: "El teléfono es requerido",
                })}
                aria-invalid={errors.telefono ? "true" : "false"}
              />
              {errors.telefono && (
                <p role="alert">{errors.telefono?.message}</p>
              )}
              <BasicDatePicker
                fecha={Date()}
                setFechaDeNacimiento={setFechaDeNacimiento}
              />
              <TextField
                required
                id="previas"
                label="Previas"
                defaultValue={0}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
              />
              <TextField
                id="anio"
                select
                label="Año en que se inscribe"
                defaultValue={anio}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                onChange={(e) => {
                  setAnio(e.target.value);
                  changeCurso(e.target.value);
                }}
              >
                {anios.map((anio) => (
                  <option key={anio.id} value={anio.id}>
                    {anio.anio}
                  </option>
                ))}
              </TextField>
              <TextField
                id="curso"
                select
                label="Cursos disponibles"
                defaultValue={curso}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                onChange={(e) => {
                  setCurso(e.target.value);
                }}
                {...register("curso", {
                  required: "El curso es requerido",
                })}
                aria-invalid={errors.curso ? "true" : "false"}
              >
                {cursoDispo.map((curso) => (
                  <option key={curso._id} value={curso._id}>
                    {curso.nombre}
                  </option>
                ))}
                {errors.curso && <p role="alert">{errors.curso?.message}</p>}
              </TextField>
            </div>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleCancelar}
                sx={{ mt: 3, ml: 1 }}
                color="secondary"
              >
                {1 === steps.length - 1 ? "Place order" : "Cancelar"}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit(handleGuardar)}
                sx={{ mt: 3, ml: 1 }}
              >
                {1 === steps.length - 1 ? "Place order" : "Guardar"}
              </Button>
            </Box>
          </Box>
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
          a
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
      </Container>
    </>
  );
}

export default RegistrarAlumno;
