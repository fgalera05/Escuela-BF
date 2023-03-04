import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";

function EditarEspecialidad({ thisEspecialidad, onModificar }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    required,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [especialidad, setEspecialidad] = React.useState(thisEspecialidad);
  const idEspecialidad = especialidad._id;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickGuardar = (data) => {
    console.log(data);
    onModificar(idEspecialidad, data.especialidad);
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
        <DialogTitle>Editar especialidad:</DialogTitle>
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
                id="especialidad"
                label="Especialidad"
                defaultValue={especialidad.especialidad}
                onChange={(e) => {
                  setEspecialidad(e.target.value);
                }}
                {...register("especialidad", {
                  required: true,
                  pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
                })}
                aria-invalid={errors.especialidad ? "true" : "false"}
              />
              {errors.especialidad && (
                <p>
                  <Typography variant="caption" display="block" gutterBottom style={{color:"#ff0000"}}>
                    El nombre de la especialidad puede contener sólo letras.
                  </Typography>
                </p>
              )}
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

export default EditarEspecialidad;
