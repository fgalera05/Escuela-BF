import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ValidacionTexto from "../Comun/ValidacionTexto";

function NuevoCurso({
  open,
  handleClose,
  curso,
  anios,
  anio,
  setAnio,
  handleGuardar,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    required,
    reset,
  } = useForm();

  return (
    <div>
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
              required: true,
            })}
            aria-invalid={errors.curso ? "true" : "false"}
          />
          {errors.curso && (
            <ValidacionTexto msg={"Ingrese un nombre para el curso."} />
          )}
          <TextField
            id="anio"
            select
            label="Año al que pertenece:"
            defaultValue={anios.length > 0 ? anios[1].anio : anio}
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
              validate: (value) => value !== "0",
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
    </div>
  );
}

export default NuevoCurso;
