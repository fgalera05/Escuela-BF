import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

function EditarAlumno({ thisAlumno, thisGeneros, onModificar }) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
    } = useForm();

    const [open, setOpen] = React.useState(false);
    const alumno = thisAlumno;
  
    const [generos, setGeneros] = React.useState(thisGeneros);
  
    const [apellido, setApellido] = React.useState(thisAlumno.alumno.apellido);
    const [nombre, setNombre] = React.useState(thisAlumno.alumno.nombre);
    const [direccion, setDireccion] = React.useState(thisAlumno.alumno.direccion);
    const [email, setEmail] = React.useState(thisAlumno.alumno.email);
    const [telefono, setTelefono] = React.useState(thisAlumno.alumno.telefono);
    const [fechaDeNacimiento, setFechaDeNacimiento] = React.useState(
      thisAlumno.fechaDeNacimiento
    );
    const [genero, setGenero] = React.useState(thisAlumno.genero);
    const [dni, setDni] = React.useState(thisAlumno.dni);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickGuardar = (data) => {
      onModificar(
        alumno._id,
        apellido,
        nombre,
        genero,
        data.dni,
        data.email,
        fechaDeNacimiento,
        data.telefono,
        direccion
      );
  
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
                  type="text"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                />
                <TextField
                  required
                  id="nombre"
                  label="Nombres"
                  type="text"
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
                {dni.length === 0 && <p role="alert">{errors.dni?.message}</p>}
              </div>
              <div>
                <TextField
                  required
                  id="direccion"
                  label="Dirección"
                  type="text"
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
                 {...register("email", {
                  required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
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
                {errors.telefono && (
                  <p role="alert">{errors.telefono?.message}</p>
                )}
                <BasicDatePicker
                  fecha={alumno.fechaDeNacimiento}
                  setFechaDeNacimiento={setFechaDeNacimiento}
                />
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
            <Button variant="contained" color="secondary" onClick={handleClose}>
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

export default EditarAlumno