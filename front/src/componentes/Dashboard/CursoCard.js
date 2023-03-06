import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ValidacionTexto from "../Comun/ValidacionTexto";
import NuevoCurso from "../Cursos/NuevoCurso";

function CursoCard() {
  const navigateCursos = useNavigate();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [anios, setAnios] = React.useState([]);
  const [anio, setAnio] = React.useState("-");
  const [noHayAnios, setNoHayAnios] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    required,
    reset,
  } = useForm();
  const [curso, setCurso] = React.useState("");

  const [sucess, setSucess] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    if (anios.length === 1) {
      setNoHayAnios(true);
    } else {
      setOpen(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    setSucess(false);
  };

  const handleClose = (data) => {
    // console.log(data);
    reset({ curso: " " });
    setOpen(false);
  };

  const handleCursos = () => {
    navigateCursos("/cursos");
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL+"anios/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAnios(response.data
            .slice(0, -1)
            .map((e) => ({
              id: e._id,
              anio: e.nombre + ": " + e.especialidad.especialidad,
            })),
        );
            
      setAnio(anios[1])
      
      
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  const handleGuardar = async (data) => {
    try {

      const msg = await axios.post(
        process.env.REACT_APP_URL+"cursos/curso",
        {
          curso: data.curso,
          anio: data.anio,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // reset({curso: ''});
      setOpen(false);
      setOpenAlert(true);
      setSucess(true);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        navigate("/");
      }
      console.log(err.response.status);
      setSucess(false);
      setMsg(err.response.data);
      setOpenAlert(true);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Cursos
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" onClick={handleClickOpen} size="small">
            Nuevo Curso
          </Button>
          {noHayAnios ? (
            <Snackbar
              open={noHayAnios}
              autoHideDuration={3000}
              onClose={handleClose}
              message="Note archived"
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                No hay años creados para asociar cursos!
              </Alert>
            </Snackbar>
          ) : (
           <NuevoCurso  open={open} handleClose={handleClose} curso={curso} anios={anios} anio={anio} setAnio={setAnio} handleGuardar={handleGuardar}/>
          )}
          <Button
            variant="contained"
            onClick={handleCursos}
            size="small"
            color="secondary"
          >
            Ver cursos
          </Button>
        </Stack>
      </CardActions>
      <Snackbar
        open={openAlert}
        autoHideDuration={100}
        onClose={handleClose}
        message="Note archived"
      >
        {sucess ? (
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Guardado!
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        )}
      </Snackbar>
    </Card>
  );
}

export default CursoCard;
