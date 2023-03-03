import {
  Alert,
  Button,
  CardHeader,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../componentes/Comun/NavBar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PasarDeAnio from "../componentes/AlumnosCurso/PasarDeAnio";
import Boletin from "../componentes/AlumnosCurso/Boletin";
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
  const [miCurso, setMiCurso] = React.useState("");
  const [openPasa, setOpenPasa] = React.useState(false);

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
          setAlumnos(response.data.alumnos);
          setMaterias(response.data.alumnos[0][2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/" + curso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setMiCurso(response.data);
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
    setCalificacion(calificacionesAlumno.filter((c) => c._id === calificacion));
    console.log(
      "CALIF:",
      calificacionesAlumno.filter((c) => c._id === calificacion)
    );
    console.log(calificacion);
    setOpenCalif(true);
  };

  const onModificarResumen = async (data) => {
    if (data) {
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
            setAlumnos(response.data.alumnos);
            setMaterias(response.data.alumnos[0][2]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pasarDeAnio = (id) => {
    const alumnosRestantes = alumnos.filter(a=> (
      a[1]._id != id
    ))
    setAlumnos(alumnosRestantes)
    setOpenPasa(true)
  }

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
                <TableCell>Curso: {miCurso.nombre}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alumno</TableCell>
                {materias
                  .sort((a, b) =>
                    a.materia.materia < b.materia.materia ? -1 : 1
                  )
                  .map((m) => (
                    <TableCell key={m.materia._id}>
                      {m.materia.materia}
                    </TableCell>
                  ))}
                <TableCell>Boletín</TableCell>
                <TableCell>Pasa de año</TableCell>
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
                  <TableCell align="right">
                    <Boletin
                      thisAlumno={a[1]}
                      thisCurso={curso}
                      onModificar={onModificarResumen}
                    />
                  </TableCell>
                  <TableCell>
                    <PasarDeAnio alumno={a} course={curso} pasarDeAnio={pasarDeAnio}/>
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
        <Snackbar
        open={openPasa}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%"}}>
          El alumno se asignó correctamente!
        </Alert>
      </Snackbar>
      
    </>
  );
}

export default AlumnosCurso;
