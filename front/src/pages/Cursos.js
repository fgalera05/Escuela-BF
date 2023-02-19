import NavBar from "../componentes/NavBar";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const UserContext = React.createContext();

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [calificaciones, setCalificaciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/calificaciones/calificacion/curso/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCalificaciones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <CardHeader />
      <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Curso</TableCell>
              <TableCell align="left">Año</TableCell>
              <TableCell align="left">Especialidad</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.sort((a,b)=> (
              (a.anio.anio > b.anio.anio?1:-1)
            )).map((curso) => (
              <Row key={curso._id} row={curso} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </>
  );
}

export default Cursos;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <UserContext.Provider value={row}>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.nombre}
          </TableCell>
          <TableCell align="left">{row.anio.anio}</TableCell>
          <TableCell align="left">
            {row.anio.especialidad.especialidad}
          </TableCell>
          <TableCell align="left">
            <MiButton label ="Ver alumnos" curso={row}/>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </UserContext.Provider>
  );
}

function MiTableCell(props) {
  return <TableCell key={props.materia._id}>{props.materia.materia}</TableCell>;
}

function MiButton(props) {
  const [curso, setCurso] = useState(props.curso)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/curso/alumnos/"+curso._id);

  }

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClick}
    >
      {props.label}
    </Button>
  );
}
