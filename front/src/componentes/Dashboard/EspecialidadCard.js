import {
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
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

function MiDialogEspecialidad({ thisEspecialidad, onModificar }) {
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
                  required: "Especialidad is required",
                })}
                aria-invalid={errors.especialidad ? "true" : "false"}
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

function EspecialidadCard() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [especialidades, setEspecialidades] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/especialidades/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEspecialidades(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onModificar = async (id, especialidad) => {
    try {
      console.log("Received values of form: ", id, especialidad, token);

      await axios
        .patch(
          "http://localhost:8000/especialidades/" + id,
          {
            especialidad: especialidad,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          const especialidadesCopy = especialidades.filter(
            (e) => e._id !== response.data._id
          );
          setEspecialidades([response.data, ...especialidadesCopy]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Especialidades
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small" onClick={handleClickOpen}>
            Ver especialidades
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography>Especialidades:</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>
                    {especialidades
                      .sort((a, b) =>
                        a.especialidad < b.especialidad ? -1 : 1
                      )
                      .filter((e) => e.especialidad != " ")
                      .map((e) => (
                        <TableRow key={e._id}>
                          <TableCell>
                            <SchoolIcon />
                          </TableCell>
                          <TableCell>{e.especialidad}</TableCell>
                          <TableCell align="right">
                            <MiDialogEspecialidad
                              thisEspecialidad={e}
                              onModificar={onModificar}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ mt: 3, ml: 1 }}
                  color="secondary"
                >
                  Cerrar
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default EspecialidadCard;
