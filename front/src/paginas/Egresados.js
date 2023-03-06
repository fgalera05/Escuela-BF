import React from "react";

import NavBar from "../componentes/Comun/NavBar";
import Card from "@mui/material/Card";
import { Alert, CardHeader, Collapse, Divider, Snackbar } from "@mui/material";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

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
import Historial from "../componentes/Egresados/Historial";

function Boletin({ thisAlumno, thisCurso, onModificar, update }) {
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
    setOpen(false);
    update(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickGuardar = (data) => {
    console.log(data);
    onModificar(alumno._id, apellido, nombre);
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  //   axios
  //     .get(process.env.REACT_APP_URL+"cursos/"+curso._id,{
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setMaterias(response.data.anio.materias);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "calificaciones/calificacion/curso/" +
          curso._id +
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
          Boletín de: {apellido}, {nombre}
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
                  <TableCell></TableCell>
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
                        <MiDialogEditarBoletin
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

function MiDialogEditarBoletin({ thisCalificacion, onModificar }) {
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
        process.env.REACT_APP_URL + "calificaciones/" + id,
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

function Egresados() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [copyList, setCopyList] = useState(alumnos);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const requestSearch = (searched) => {
    setCopyList(alumnos.filter((a) => parseInt(a.dni) === parseInt(searched)));
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
        process.env.REACT_APP_URL + "alumnos/modificar/" + id,
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
      const alumnosOld = alumnos.filter(
        (element) => element._id !== newUser.data._id
      );
      setAlumnos([newUser.data, ...alumnosOld]);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "alumnos/egresados", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length == 0) {
          setOpenAlert(true);
        } else {
          setAlumnos(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "generos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setGeneros(response.data);
        if (response.data.length === 0) {
          setOpenAlert(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const update = (data) => {
    if (data) {
      axios
        .get(process.env.REACT_APP_URL + "alumnos/egresados", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log("llego>", response.data);
          setAlumnos(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
        });
    }
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
                <TableCell align="center">Especialidad</TableCell>
                <TableCell align="center">Curso</TableCell>
                <TableCell align="center">Previas</TableCell>
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
                    <TableCell align="center">
                      {alumno.especialidad.especialidad}
                    </TableCell>
                    <TableCell align="center">{alumno.curso.nombre}</TableCell>
                    <TableCell align="center">
                      {alumno.previas == "0" ? " " : alumno.previas}
                    </TableCell>
                    <TableCell align="center">
                      <Historial
                        alumno={alumno}
                        onModificar={onModificar}
                        update={update}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <EditarAlumno
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
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            No hay egresados!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Egresados;
