import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

function PasarDeAnio({alumno, course, pasarDeAnio}) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
    } = useForm();
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem("token");
    const [cursosDisponibles, setCursosDisponibles] =  React.useState([]);
    const [seAnotaEn, setSeAnotaEn] =  React.useState("");
    const [alumnoQuePasa, setAlumnoQuePasa] = React.useState(alumno[1]._id);

  
    const handleClose = () => {
      setOpen(false);

    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickGuardar = async (data) => {
      console.log(data, alumnoQuePasa);
        axios
          .patch("http://localhost:8000/alumnos/pasardeanio/"+alumnoQuePasa, 
            {
              curso: data.seAnotaEn,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            console.log("PSARRRR", response);
            setOpen(false);
            pasarDeAnio(alumnoQuePasa);
          
          })
          .catch((error) => {
            console.log(error);
          });
  
    }
      
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/cursos/pasar/" + alumno[1]._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
         console.log("@@@@:",response);
         setCursosDisponibles(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
  
    return (
      <>
        {alumno[0].pasaDeAnio ? (
          <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
            Pasar
          </Button>
        ) : (
          alumno.pasaDeAnio
        )}
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Pasa de año: {alumno[1].alumno.apellido}, {alumno[1].alumno.nombre} </DialogTitle>
          <DialogContent>
            <DialogContentText>Elija el curso dónde se inscribe:</DialogContentText>
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
                  id="seAnotaEn"
                  select
                  label="Curso disponibles"
                  defaultValue={seAnotaEn}
                  SelectProps={{
                    native: true,
                  }}
                  variant="filled"
                  onChange={(e) => {
                    setSeAnotaEn(e.target.value);
                  }}
                  {...register("seAnotaEn", {
                    required: "El género es requerido",
                  })}
                  aria-invalid={errors.seAnotaEn ? "true" : "false"}
                >
                  {cursosDisponibles.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.nombre} - {c.anio.nombre} año 
                    </option>
                  ))}
                  {errors.seAnotaEn && <p role="alert">{errors.seAnotaEn?.message}</p>}
                </TextField>
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

export default PasarDeAnio
