import NavBar from "../componentes/NavBar";
import Card from "@mui/material/Card";
import { Alert, CardHeader, Collapse, Divider, Snackbar } from "@mui/material";
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
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

function MiDialog({ thisAlumno, thisGeneros, onModificar }) {
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
    console.log(data);
    onModificar(
      alumno._id,
      apellido,
      nombre,
      genero,
      dni,
      data.email,
      fechaDeNacimiento,
      telefono,
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
                defaultValue={alumno.telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
              />
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

function Boletin({ thisAlumno, thisCurso, onModificar, update}) {
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
  //     .get("http://localhost:8000/cursos/"+curso._id,{
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
        "http://localhost:8000/calificaciones/calificacion/curso/" +
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

function Alumnos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [copyList, setCopyList] = useState(alumnos);
  const [openAlert, setOpenAlert] = useState(false);

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
      const alumnosOld = alumnos.filter(
        (element) => element._id !== newUser.data._id
      );
      setAlumnos([newUser.data, ...alumnosOld]);
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
        if (response.data.length === 0) {
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

  const update = (data) => {

    console.log("WWWWWWW", data);

    if(data){
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
    }
  }

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
                    <TableCell align="center">{alumno.curso.nombre}</TableCell>
                    <TableCell align="center">
                      {alumno.previas == "0" ? " " : alumno.previas}
                    </TableCell>
                    <TableCell align="center">
                      <Boletin
                        thisAlumno={alumno}
                        thisCurso={alumno.curso}
                        onModificar={onModificar}
                        update={update}
                      />
                    </TableCell>
                    <TableCell>
                      <Historial alumno={alumno} onModificar={onModificar} update={update}/>
                    </TableCell>
                    <TableCell align="center">
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
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
          a
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            No hay alumnos inscriptos!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

function Historial({ alumno, update }) {
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [historia, setHistoria] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/calificaciones/historial/" + alumno._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("HISTORIAAAAA", response.data);
        setHistoria(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const handleClickOpen = () => {
    console.log("Historia:", alumno);
    setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
    update(true);
  };

  return (
    <div>
      {historia.length> 0 ?
      <>
      <IconButton
        color="secondary"
        aria-label="edit"
        component="label"
        onClick={handleClickOpen}
      >
        <HistoryEduIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="string">
        <DialogTitle>
          <Typography>Boletines Anteriores:</Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableBody>
                <RowAnio alumno={alumno} historia={historia} />
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Box
          >
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ mt: 3, ml: 1 }}
              color="secondary"
            >
              Cerrar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </>
      :" "}
    </div>
  );
}

function RowAnio({ alumno, historia }) {
  console.log("ROWWWW", historia)
  const [open, setOpen] = React.useState(false);
  const nombre = historia[0].curso.nombre;

  return (
    <>
    {historia.length >0 ?
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"></TableCell>
        <TableCell align="left">Curso: {nombre}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{
              "& .MuiTextField-root": { m: 1, width: "100ch" },
            }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <BoletinHistoria calificaciones={historia} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </React.Fragment>
      : " "}
      </>
  );
}

function BoletinHistoria({ calificaciones }) {
  const [calif, setCalif] = React.useState(calificaciones)
  const onModificarBoletinHistoria = (data) => {
   
    const filtro = calif.filter( c => (
      c._id !== data._id
    ))
    console.log("DAAAAA",[data,...filtro]);

    setCalif([data,...filtro])
  }
  
  return (
    <>
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
            {calif
              .sort((c, d) => (c.materia.materia < d.materia.materia ? -1 : 1))
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
                    <MiDialogEditarBoletinHistoria
                      thisCalificacion={c}
                      onModificar={onModificarBoletinHistoria}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function MiDialogEditarBoletinHistoria({ thisCalificacion, onModificar }) {
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

      onModificar(nueva.data)

      // onModificar(nueva.data);
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

export default Alumnos;
