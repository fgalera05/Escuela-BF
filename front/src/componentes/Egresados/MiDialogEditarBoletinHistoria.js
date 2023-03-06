import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import ValidacionTexto from "../Comun/ValidacionTexto";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
        process.env.REACT_APP_URL+"calificaciones/" + id,
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
      onModificar(nueva.data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401){
        navigate("/");
}

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
                  validate: (value) => value >= 0 && value <= 10,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                aria-invalid={errors.primer ? "true" : "false"}
              />
              {errors.primer && (
                <ValidacionTexto
                  msg={"La nota deber ser mayor que 0 y menor a 10"}
                />
              )}
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
                  validate: (value) => value >= 0 && value <= 10,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                aria-invalid={errors.segundo ? "true" : "false"}
              />
              {errors.segundo && (
                <ValidacionTexto
                  msg={"La nota deber ser mayor que 0 y menor a 10"}
                />
              )}
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
                  validate: (value) => value >= 0 && value <= 10,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                aria-invalid={errors.tercer ? "true" : "false"}
              />
              {errors.tercer && (
                <ValidacionTexto
                  msg={"La nota deber ser mayor que 0 y menor a 10"}
                />
              )}
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
                  validate: (value) => value >= 0 && value <= 10,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                aria-invalid={errors.diciembre ? "true" : "false"}
              />
              {errors.diciembre && (
                <ValidacionTexto
                  msg={"La nota deber ser mayor que 0 y menor a 10"}
                />
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
                  validate: (value) => value >= 0 && value <= 10,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                aria-invalid={errors.marzo ? "true" : "false"}
              />
              {errors.marzo && (
                <ValidacionTexto
                  msg={"La nota deber ser mayor que 0 y menor a 10"}
                />
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

export default MiDialogEditarBoletinHistoria;
