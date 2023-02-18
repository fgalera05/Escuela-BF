import {
  Button,
  CardHeader,
  IconButton,
  Paper,
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
import CheckIcon from '@mui/icons-material/Check';
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/alumnos/" + curso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data.alumnos[0]);
        setAlumnos(response.data.alumnos);
        setMaterias(response.data.alumnos[0][2]);
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="overline">Alumno</Typography>
              </TableCell>
              {materias.map((m) => (
                <TableCell key={m.materia._id}>{m.materia.materia}</TableCell>
              ))}
              <TableCell>Pasa de año</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((a) => (
              <TableRow key={a[1]._id}>
                <TableCell>{a[1].alumno.apellido}, {a[1].alumno.nombre}</TableCell>
                {a[2]
                  .sort((a, b) =>
                    a.materia.materia < b.materia.materia ? -1 : 1
                  )
                  .map((c) => (
                    <TableCell key={c._id}>
                      {c.aprobada ? <CheckIcon color="primary" /> : c.aprobada}
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
    </>
  );
}

export default AlumnosCurso;
