import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import EditIcon from "@mui/icons-material/Edit";

function EditarMateria({ thisMateria, onModificar, anio, especialidad }) {
    const {
      register,
      formState: { errors },
      handleSubmit,
      required,
    } = useForm();
    const [open, setOpen] = React.useState(false);
    const [materia, setMateria] = React.useState(thisMateria);
    const idMateria = thisMateria._id;
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClickGuardar = (data) => {
      onModificar(idMateria, data.materia);
      setOpen(false);
    };
  
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
          <DialogTitle>Editar materia:</DialogTitle>
          <DialogContent>
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
                  id="materia"
                  label="Materia"
                  defaultValue={materia.materia}
                  onChange={(e) => {
                    setMateria(e.target.value);
                  }}
                  {...register("materia", {
                    required: true,
                  pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                  })}
                  aria-invalid={errors.materia ? "true" : "false"}
                />
                {errors.materia && (
                <p>
                  <Typography variant="caption" display="block" gutterBottom style={{color:"#ff0000"}}>
                    El nombre de la materia puede contener sólo letras.
                  </Typography>
                </p>
              )}
              </div>
              <div>
                <TextField
                  disabled
                  id="anio"
                  label="Año"
                  defaultValue={anio}
                  onChange={(e) => {
                    setMateria(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  disabled
                  id="especialidad"
                  label="Especialidad"
                  defaultValue={especialidad}
                  onChange={(e) => {
                    setMateria(e.target.value);
                  }}
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


export default EditarMateria
