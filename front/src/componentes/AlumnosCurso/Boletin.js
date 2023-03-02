import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DoneAllIcon from "@mui/icons-material/DoneAll";

function EditarBoletin({ thisCalificacion, onModificar }) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
    } = useForm();
    const [open, setOpen] = React.useState(false);
  
    const [calificacion, setCalificacion] = React.useState(thisCalificacion);
    const [id, setId] = React.useState(thisCalificacion._id);
    const [primer, setPrimer] = React.useState(
      calificacion.notas.primerCuatrimestre
    );
    const [segundo, setSegundo] = React.useState(
      calificacion.notas.segundoCuatrimestre
    );
    const [tercer, setTercer] = React.useState(
      calificacion.notas.tercerCuatrimestre
    );
    const [diciembre, setDiciembre] = React.useState(
      calificacion.notas.diciembre
    );
    const [marzo, setMarzo] = React.useState(calificacion.notas.marzo);
    const [notaFinal, setNotaFinal] = React.useState(
      calificacion.notas.notaFinal
    );
  

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickGuardar = async (data) => {
      console.log(data);
      try {
        console.log(
          "Received values of form: ",
          id,
          primer,
          segundo,
          tercer,
          diciembre,
          marzo
        );
  
        const nueva = await axios.patch(
          "http://localhost:8000/calificaciones/" + id,
          {
            primerCuatrimestre: data.primer,
            segundoCuatrimestre: data.segundo,
            tercerCuatrimestre: data.tercer,
            diciembre: data.diciembre,
            marzo: data.marzo,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("nuevaaaa", nueva);
  
        onModificar(nueva.data);
      } catch (err) {
        console.log(err);
      }
  
      setOpen(false);
    };
  
    const token = localStorage.getItem("token");
  
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
          <DialogTitle>{calificacion.materia.materia} </DialogTitle>
          <DialogContent>
            <DialogContentText>Calificaciones: </DialogContentText>
  
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
                  id="primer"
                  label="Primer cuatrimestre"
                  defaultValue={primer}
                  onChange={(e) => {
                    setPrimer(e.target.value);
                  }}
                  type="number"
                  {...register("primer", {
                    valueAsNumber: true,
                    validate: (value) => (value >= 0 && value <= 10),
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  aria-invalid={errors.primer ? "true" : "false"}
                />
                {errors.primer && <p role="alert">{errors.primer?.message}</p>}
              </div>
              <div>
                <TextField
                  required
                  id="segundo"
                  label="Segundo cuatrimestre"
                  defaultValue={segundo}
                  onChange={(e) => {
                    setSegundo(e.target.value);
                  }}
                  type="number"
                  {...register("segundo", {
                    valueAsNumber: true,
                    validate: (value) => (value >= 0 && value <= 10),
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  aria-invalid={errors.segundo ? "true" : "false"}
                />
                {errors.segundo && <p role="alert">{errors.segundo?.message}</p>}
              </div>
              <div>
                <TextField
                  required
                  id="tercer"
                  label="Tercer cuatrimestre"
                  defaultValue={tercer}
                  onChange={(e) => {
                    setTercer(e.target.value);
                  }}
                  type="number"
                  {...register("tercer", {
                    valueAsNumber: true,
                    validate: (value) => (value >= 0 && value <= 10),
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  aria-invalid={errors.tercer ? "true" : "false"}
                />
                {errors.tercer && <p role="alert">{errors.tercer?.message}</p>}
              </div>
              <div>
                <TextField
                  required
                  id="diciembre"
                  label="Diciembre"
                  defaultValue={diciembre}
                  onChange={(e) => {
                    setDiciembre(e.target.value);
                  }}
                  type="number"
                  {...register("diciembre", {
                    valueAsNumber: true,
                    validate: (value) => (value >= 0 && value <= 10),
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  aria-invalid={errors.diciembre ? "true" : "false"}
                />
                {errors.diciembre && (
                  <p role="alert">{errors.diciembre?.message}</p>
                )}
              </div>
              <div>
                <TextField
                  required
                  id="marzo"
                  label="Marzo"
                  defaultValue={marzo}
                  onChange={(e) => {
                    setMarzo(e.target.value);
                  }}
                  type="number"
                  {...register("marzo", {
                    valueAsNumber: true,
                    validate: (value) => (value >= 0 && value <= 10),
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  aria-invalid={errors.marzo ? "true" : "false"}
                />
                {errors.marzo && <p role="alert">{errors.marzo?.message}</p>}
              </div>
              <div>
                <TextField
                  required
                  id="notaFinal"
                  label="Nota Final"
                  defaultValue={notaFinal}
                  type="number"
                  disabled
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
          "http://localhost:8000/calificaciones/calificacion/curso/" +
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
                          <EditarBoletin
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
