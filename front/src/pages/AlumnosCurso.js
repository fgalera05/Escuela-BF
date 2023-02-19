import {
  Alert,
  Button,
  CardHeader,
  IconButton,
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
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import NavBar from "../componentes/NavBar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function AlumnosCurso() {
  const { curso } = useParams();
  const token = localStorage.getItem("token");
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigate("/cursos");
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
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
          // console.log(response.data.alumnos);
          console.log(response.data.alumnos[0]);
          setAlumnos(response.data.alumnos);
          setMaterias(response.data.alumnos[0][2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                {materias.sort((a, b) =>
                      a.materia.materia < b.materia.materia ? -1 : 1
                    ).map((m) => (
                  <TableCell key={m.materia._id}>{m.materia.materia}</TableCell>
                ))}
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
    </>
  );
}

export default AlumnosCurso;
