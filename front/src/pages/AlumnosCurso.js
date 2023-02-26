import {
  Alert,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "../componentes/NavBar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";

function AlumnosCurso() {
  const { curso } = useParams();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState("");
  const [materias, setMaterias] = useState([]);
  const [calificacion, setCalificacion] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openCalif, setOpenCalif] = React.useState(false);
  const [calificacionesAlumno, setCalificacionesAlumno] = useState([]);

  const handleClick = () => {
    navigate("/cursos");
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    setOpen(false);
  };

  const handleCloseCalif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCalif(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/alumnos/" + curso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.alumnos.length === 0) {
          setOpenAlert(true);
        } else {
          console.log(openAlert);
          console.log(response.data.alumnos[0]);
          setAlumnos(response.data.alumnos);
          setMaterias(response.data.alumnos[0][2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    required,
    reset,
  } = useForm();

  const handleElegir = () => {
    console.log("123:", calificacion);
    console.log("calificacionesAlumno[0]:", calificacionesAlumno);
    setCalificacion(calificacionesAlumno.filter((c) => c._id === calificacion));
    console.log(
      "CALIF:",
      calificacionesAlumno.filter((c) => c._id === calificacion)
    );
    console.log(calificacion);
    setOpenCalif(true);
  };

  const onModificarResumen = async (data) =>{
   if (data){
    await axios
      .get("http://localhost:8000/cursos/alumnos/" + curso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.alumnos.length === 0) {
          setOpenAlert(true);
        } else {
          console.log(openAlert);
          console.log(response.data.alumnos[0]);
          setAlumnos(response.data.alumnos);
          setMaterias(response.data.alumnos[0][2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

 
  return (
    <>
      <NavBar />
      <CardHeader />
      <Button variant="contained" size="small" onClick={handleClick}>
        Volver
      </Button>
      {!openAlert ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="overline">Alumno</Typography>
                </TableCell>
                {materias
                  .sort((a, b) =>
                    a.materia.materia < b.materia.materia ? -1 : 1
                  )
                  .map((m) => (
                    <TableCell key={m.materia._id}>
                      {m.materia.materia}
                    </TableCell>
                  ))}
                <TableCell>Pasa de año</TableCell>
                <TableCell>Calificaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.map((a) => (
                <TableRow key={a[1]._id}>
                  <TableCell>
                    {a[1].alumno.apellido}, {a[1].alumno.nombre}
                  </TableCell>
                  {a[2]
                    .sort((a, b) =>
                      a.materia.materia < b.materia.materia ? -1 : 1
                    )
                    .map((c) => (
                      <TableCell key={c._id}>
                        {c.aprobada ? (
                          <DoneAllIcon color="primary" />
                        ) : (
                          c.aprobada
                        )}
                      </TableCell>
                    ))}
                  <TableCell>
                    {a[0].pasaDeAnio ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        Pasar
                      </Button>
                    ) : (
                      a.pasaDeAnio
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Boletin
                      thisAlumno={a[1]}
                      thisCurso={curso}
                      onModificar={onModificarResumen}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        message="El curso no tiene alumnos!"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          El curso no tiene alumnos!
        </Alert>
      </Snackbar>
    </>
  );
}

function Boletin({ thisAlumno, thisCurso, onModificar}) {
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


  const onModificarBoletin= (data) =>{
    const filtradas = calificaciones.filter(c => (
      c._id !== data._id
    ))
    setCalificaciones([data,...filtradas]);
  }


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
                        {c.aprobada ? <DoneAllIcon color="primary" /> : ""}
                      </TableCell>
                      <TableCell align="center">
                        <MiDialog
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

function MiDialog({ thisCalificacion, onModificar }) {
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

  // console.log(calificacion);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickGuardar = async (data) => {
    console.log(data);
    try {
      console.log("Received values of form: ", id, primer, segundo, tercer, diciembre, marzo);

    const nueva = await axios.patch(
        "http://localhost:8000/calificaciones/"+ id,
        {
          primerCuatrimestre: data.primer,
          segundoCuatrimestre: data.segundo,
          tercerCuatrimestre: data.tercer,
          diciembre: data.diciembre,
          marzo: data.marzo
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

export default AlumnosCurso;
