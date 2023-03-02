import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import EditIcon from "@mui/icons-material/Edit";

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
  

export default MiDialogEditarBoletinHistoria
