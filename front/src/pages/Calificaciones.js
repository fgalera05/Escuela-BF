import {
  Button,
  CardHeader,
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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../componentes/NavBar";

function Calificaciones() {
  const { curso } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [materias, setMaterias] = React.useState([]);
  const [alumnos, setAlumnos] = React.useState([]);
  const [miCurso, setMiCurso] = React.useState([]);

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
        console.log(
          response.data.curso.materias,
          response.data.curso,
          response.data.alumnos
        );
        setMiCurso(response.data.curso);
        setAlumnos(response.data.alumnos);
        setMaterias(response.data.curso.materias);
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
              <TableCell align="center">
                <Typography variant="overline">
                  Calificar curso: {miCurso.nombre}
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias
              .sort((a, b) => (a.materia < b.materia ? -1 : 1))
              .map((m) => (
                <TableRow key={m._id}>
                  <TableCell>{m.materia}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                    >
                        Calificar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Calificaciones;
