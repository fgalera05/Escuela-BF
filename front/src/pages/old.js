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
    console.log("123:",calificacion);
    console.log("calificacionesAlumno[0]:",calificacionesAlumno);
    setCalificacion(calificacionesAlumno.filter((c)=> (c._id === calificacion)));
    console.log("CALIF:", calificacionesAlumno.filter((c)=> (c._id === calificacion)));
    console.log(calificacion);
    setOpenCalif(true);
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
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((a) => (
                  <TableRow key={a[1]._id}>
                    <TableCell>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          setOpen(true);
                          setCalificacionesAlumno(
                            a[2].filter((c) => c.alumno === a[1]._id)
                          );
                          setAlumno(a[1].alumno.apellido+", "+a[1].alumno.nombre)
                        }}
                      >
                        {a[1].alumno.apellido}, {a[1].alumno.nombre}
                      </Link>
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
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{alumno} </DialogTitle>
          <DialogContent>
          <DialogContentText> Elegir materia calificar:</DialogContentText>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="calificacion"
                select
                label="Materia"
                defaultValue={""}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                onChange={(e) => {
                  setCalificacion(e.target.value);
                  console.log("121323:",e.target.value);
                }}
              >
                {[{_id:"1", materia: {materia: "-"}},...calificacionesAlumno].map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.materia.materia}
                  </option>
                ))}
                {errors.calificacion && <p role="alert">{errors.calificacion?.message}</p>}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleElegir}>
              Elegir
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCalif}
          onClose={handleClose}
        >
          <DialogTitle>Calificar: </DialogTitle>
          <DialogContent>
          <DialogContentText>{alumno}</DialogContentText>
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
                  id="primerCuatrimestre"
                  label="Primer cuatrimestre"
                  defaultValue={calificacion.primerCuatrimestre}
                  onChange={(e) => {
                    
                  }}
                  {...register("primerCuatrimestre", {
                    required: "La nota es requerida",
                  })}
                  aria-invalid={errors.primerCuatrimestre ? "true" : "false"}
                />
                {errors.primerCuatrimestre && <p role="alert">{errors.primerCuatrimestre?.message}</p>}
                </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleCloseCalif}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  export default AlumnosCurso;
  