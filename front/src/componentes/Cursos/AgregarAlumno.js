import { Alert, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ValidacionTexto from '../Comun/ValidacionTexto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function BasicDatePicker(props) {  const [value, setValue] = React.useState(dayjs(Date.today));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Fecha de nacimiento"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.setFechaDeNacimiento(newValue.$d);
        }}
        disableFuture
        renderInput={(params) => <TextField {...params} />}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}


function AgregarAlumno({ openAgregar, curso, lugar, generos }) {
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
    const [open, setOpen] = React.useState(false);
    const [sucess, setSucess] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const [fechaDeNacimiento, setFechaDeNacimiento] = React.useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    const handleClose = () => {
      setOpenAgregarDialog(false);
      setOpen(false);
      reset();
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
          process.env.REACT_APP_URL+"alumnos",
          {
            apellido:
              data.apellido.charAt(0).toUpperCase() + data.apellido.slice(1),
            nombre: data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1),
            genero: data.genero,
            dni: data.dni,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            curso: curso,
            anio: curso.anio._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSucess(true);
        setOpen(true);
        reset();
        navigate("/curso/alumnos/" + curso._id);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401){
          navigate("/");
  }
        setMsg(err.response.data);
        setOpen(true);
      }
    };
  
    return (
      <>
        {lugares > 0 ? (
          <IconButton
            color="primary"
            aria-label="agregar alumno"
            onClick={handleAgregarAlumno}
          >
            <PersonAddAltIcon />
          </IconButton>
        ) : (
          " "
        )}
        <Dialog open={openAgregarDialog} onClose={handleClose}>
          <DialogTitle>
            Agregar alumno a Curso: {curso.nombre} - {curso.anio.nombre}
          </DialogTitle>
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
                  required
                  id="apellido"
                  label="Apellidos"
                  defaultValue={apellido}
                  type="text"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                  {...register("apellido", {
                    required: true,
                    pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                  })}
                  aria-invalid={errors.apellido ? "true" : "false"}
                />
                {errors.apellido && (
                   <ValidacionTexto msg={"El apellido puede contener sólo letras."}/>
                )}
                <TextField
                  required
                  id="nombre"
                  label="Nombres"
                  type="text"
                  defaultValue={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  {...register("nombre", {
                    required: true,
                    pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                  })}
                  aria-invalid={errors.nombre ? "true" : "false"}
                />
                {errors.nombre && (
                   <ValidacionTexto msg={"El nombre puede contener sólo letras."}/>
                )}
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
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {email.length === 0 && (
                  <p role="alert">{errors.email?.message}</p>
                )}
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
                    valueAsNumber: true,
                    validate: (value) => (value > 0 && value < 99999999 && value > 9999999),
                  })}
                  aria-invalid={errors.dni ? "true" : "false"}
                />
                {errors.dni && (
                   <ValidacionTexto msg={"El DNI debe ser de 8 números: xxxxxxxx"}/>
                )}
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
                {errors.direccion && (
                   <ValidacionTexto msg={"Ingrese la dirección del alumno."}/>
                )}
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
                    valueAsNumber: true,
                    validate: (value) => (value > 0),
                  })}
                  aria-invalid={errors.telefono ? "true" : "false"}
                />
                {telefono.length === 0 && (
                  <p role="alert">{errors.telefono?.message}</p>
                )}
                <BasicDatePicker
                  fecha={fechaDeNacimiento}
                  setFechaDeNacimiento={setFechaDeNacimiento}
                />
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
          autoHideDuration={400}
          onClose={handleClose}
          message="Note archived"
        >
          {sucess ? (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Guardado!
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          )}
        </Snackbar>
      </>
    );
  }

export default AgregarAlumno
