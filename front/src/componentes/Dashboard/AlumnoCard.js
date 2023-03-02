import { Alert, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AlumnoCard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [anios, setAnios] = React.useState([]);
    const [cursos, setCursos] = React.useState([]);
    const [alumnos, setAlumnos] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");
  
    const handleVerAlumnos = () => {
      if (alumnos.length === 0) {
        setMsg("No hay alumnos inscriptos");
        setOpen(true);
      } else {
        navigate("/alumnos");
      }
    };

    const handleVerEgresados = () => {
        if (alumnos.length === 0) {
          setMsg("No hay egresados");
          setOpen(true);
        } else {
          navigate("/egresados");
        }
      };
  
    // const handleRegistrar = () => {
    //   if (anios.length === 0) {
    //     setMsg("No hay anios creados para inscribir alumnos");
    //     setOpen(true);
    //   } else if (cursos.length === 0) {
    //     setMsg("No hay cursos creados para inscribir alumnos");
    //     setOpen(true);
    //   } else {
    //     navigate("/registrar");
    //   }
    // };
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/anios/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setAnios(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/alumnos/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAlumnos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
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
  
    const handleClose = (data) => {
      setOpen(false);
    };
  
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Alumnos
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={1}>
            <Button variant="contained" onClick={handleVerAlumnos} size="small">
              Buscar alumno
            </Button>
            <Button variant="contained" onClick={handleVerEgresados} size="small">
              Egresados
            </Button>
          </Stack>
        </CardActions>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {msg}
          </Alert>
        </Snackbar>
      </Card>
    );
  }
  

export default AlumnoCard
