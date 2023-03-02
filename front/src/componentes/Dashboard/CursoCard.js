import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
    const [curso, setCurso] = React.useState(" ");
  
    const [sucess, setSucess] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [openAlert, setOpenAlert] = React.useState(false);
  
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
      reset({ anio: "", curso: " " });
      setOpen(false);
    };
  
    const handleCursos = () => {
      navigateCursos("/cursos");
    };
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/anios/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setAnios([
            { id: "1", anio: "-" },
            ...response.data.slice(0, -1).map((e) =>
              ({ id: e._id, anio: e.nombre + ": " + e.especialidad.especialidad })
            ),
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleGuardar = async (data) => {
      try {
        console.log(data);
  
        const msg = await axios.post(
          "http://localhost:8000/cursos/curso",
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
        reset({ anio: "", curso: " " });
        setOpen(false);
        setOpenAlert(true);
        setSucess(true);
      } catch (err) {
        console.log(err);
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
                a
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
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  <Typography>Nuevo curso:</Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="curso"
                    defaultValue={curso}
                    label="Nombre del curso"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register("curso", {
                      required: "El nombre del curso es requerido",
                    })}
                    aria-invalid={errors.curso ? "true" : "false"}
                  />
                  <TextField
                    id="anio"
                    select
                    label="Año al que pertenece:"
                    defaultValue={anio}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    variant="filled"
                    onChange={(e) => {
                      setAnio(e.target.value);
                    }}
                    {...register("anio", {
                      required: "El año es requerido",
                    })}
                    aria-invalid={errors.anio ? "true" : "false"}
                  >
                    {anios.map((anio) => (
                      <option key={anio.id} value={anio.id}>
                        {anio.anio}
                      </option>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{ mt: 3, ml: 1 }}
                      color="secondary"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit(handleGuardar)}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Guardar
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
            )}
            <Button variant="contained" onClick={handleCursos} size="small">
              Ver cursos
            </Button>
          </Stack>
        </CardActions>
        <Snackbar
          open={openAlert}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Note archived"
          a
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
  

export default CursoCard
