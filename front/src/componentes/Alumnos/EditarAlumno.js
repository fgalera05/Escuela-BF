import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ValidacionTexto from '../Comun/ValidacionTexto';
import { IMaskInput } from 'react-imask';

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
          disableFuture
          renderInput={(params) => <TextField {...params} />}
          inputFormat="DD/MM/YYYY"
        />
      </LocalizationProvider>
    );
  }

function EditarAlumno({ thisAlumno, thisGeneros, onModificar, update}) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
      reset,
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
    const [dni, setDni] = React.useState("");
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/alumnos//alumno/ver/"+thisAlumno._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
            console.log("al",response.data.dni)
            setDni(response.data.dni);
          
        })
        .catch((error) => {
          console.log("error:",error);
        });
    }, []);


    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpen = () => {
      axios
      .get("http://localhost:8000/alumnos//alumno/ver/"+thisAlumno._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
          console.log("al",response.data.dni)
          setDni(response.data.dni);
        
      })
      .catch((error) => {
        console.log("error:",error);
      });
      setOpen(true);
    };
  
    const handleClickGuardar = (data) => {
      onModificar(
        alumno._id,
        data.apellido,
        data.nombre,
        genero,
        data.dni,
        data.email,
        fechaDeNacimiento,
        data.telefono,
        data.direccion
      );
      // update(true);
      setOpen(false);
      reset();
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
          console.log("error:",error);
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
                "& .MuiTextField-root": { m: 1, width: "50ch" },
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
                {errors.dni && (
                   <ValidacionTexto msg={"El DNI debe ser de 8 números: xxxxxxxx"}/>
                )}
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
                  {...register("direccion", {
                    required: true,
                    // pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                  })}
                  aria-invalid={errors.direccion ? "true" : "false"}
                />
                {errors.direccion && (
                   <ValidacionTexto msg={"Ingrese la dirección del alumno."}/>
                )}
                <TextField
                  required
                  id="email"
                  label="Email"
                  defaultValue={alumno.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                 {...register("email", {
                  required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <Typography variant="caption" display="block" gutterBottom style={{color:"#ff0000"}}>
                    El formato del email es incorrecto.
                  </Typography>

              )}
                <TextField
                  id="telefono"
                  label="Teléfono"
                  defaultValue={alumno.telefono?alumno.telefono:0}
                  type="numero"
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  {...register("telefono", {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => (value >= 0),
                  })}
                  aria-invalid={errors.telefono ? "true" : "false"}    
                />
                {errors.telefono && (
                   <ValidacionTexto msg={"Ingrese el número de teléfono: 11XXXXXXXX"}/>
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