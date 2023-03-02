import NavBar from "./componentes/Comun/NavBar";
import Card from "@mui/material/Card";
import {
  Alert,
  CardHeader,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import EgresadosCard from "./componentes/Dashboard/EgresadosCard";
import CursoCard from "./componentes/Dashboard/CursoCard";
import AlumnoCard from "./componentes/Dashboard/AlumnoCard";





function MiDialog({ thisMateria, onModificar, anio, especialidad }) {
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
    console.log(data);
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
                  required: "Materia is required",
                })}
                aria-invalid={errors.materia ? "true" : "false"}
              />
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

function MateriaCard() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [anios, setAnios] = React.useState([]);
  const [copyList, setCopyList] = React.useState(anios);

  const handleClickOpen = async () => {
    await axios
    .get("http://localhost:8000/anios/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response.data);
      setAnios(response.data);
      setCopyList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/anios/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAnios(response.data);
        setCopyList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const requestSearch = (searched) => {
    const aniosFiltrados = anios.map((a) => ({
      anio: a.anio,
      especialidad: a.especialidad,
      materias: a.materias.filter((m) =>
        m.materia.includes(
          searched ? searched[0].toUpperCase() + searched.slice(1) : searched
        )
      ),
    }));
    setCopyList(aniosFiltrados.filter((a) => a.materias.length > 0));
  };

  const onModificar = async (id, materia) => {
    try {
      console.log("Received values of form: ", id, materia);

      await axios.patch(
        "http://localhost:8000/materias/" + id,
        {
          materia: materia,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      await axios
        .get("http://localhost:8000/anios/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAnios(response.data);
          setCopyList(response.data);
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
          Materias
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          {/* <Button variant="contained" size="small">
            Nueva Materia
          </Button> */}
          <Button variant="contained" size="small" onClick={handleClickOpen}>
            Ver Materias
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography>Materias:</Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                sx={{ width: 1 / 2 }}
                variant="outlined"
                placeholder="Buscar materia por nombre..."
                type="search"
                onChange={(e) => requestSearch(e.target.value)}
              />
              <DialogContentText></DialogContentText>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Código</TableCell>
                      <TableCell align="left">Materia</TableCell>
                      <TableCell align="left">Año</TableCell>
                      <TableCell align="left">Especialidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {copyList
                      .filter((a) => a.nombre !== "Egresados")
                      .map((a) =>
                        a.materias
                          .sort((b, c) => (b.materia < c.materia ? -1 : 1))
                          .map((m) => (
                            <TableRow key={m._id}>
                              <TableCell>{parseInt(m._id)}</TableCell>
                              <TableCell>{m.materia}</TableCell>
                              <TableCell align="left">{a.anio}</TableCell>
                              <TableCell align="left">
                                {a.especialidad.especialidad}
                              </TableCell>
                              <TableCell align="right">
                                <MiDialog
                                  thisMateria={m}
                                  onModificar={onModificar}
                                  anio={a.nombre}
                                  especialidad={a.especialidad.especialidad}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                      )}
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

function RowAnio(props) {
  const { anio } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"></TableCell>
        <TableCell align="left">
          {anio.nombre}: {anio.especialidad.especialidad}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Materias
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {anio.materias
                    .sort((b, c) => (b.materia < c.materia ? -1 : 1))
                    .map((materia) => (
                      <TableRow key={materia._id}>
                        <TableCell>{parseInt(materia._id)}</TableCell>
                        <TableCell>{materia.materia}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function AnioCard() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [anios, setAnios] = React.useState([]);

  const handleClickOpen = async () => {
    await axios
        .get("http://localhost:8000/anios/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAnios(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/anios/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAnios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Años
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small" onClick={handleClickOpen}>
            Ver años
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography>Años:</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>
                    {anios
                      .filter((a) => a.nombre !== "Egresados")
                      .map((a) => (
                        <RowAnio key={a._id} anio={a} />
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
          const especialidadesCopy = especialidades.filter((e)=>(
            e._id !== response.data._id
          ));
          setEspecialidades([response.data,...especialidadesCopy]);
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
                    {especialidades.sort((a,b)=>(a.especialidad<b.especialidad?-1:1))
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

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <CardHeader />
      <Container fixed>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Grid container spacing={2}>
            <Grid item>
              <EspecialidadCard />
            </Grid>
            <Grid item>
              <AnioCard />
            </Grid>
            <Grid item>
              <MateriaCard />
            </Grid>
            <Grid item>
              <AlumnoCard />
            </Grid>
            <Grid item>
              <CursoCard />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
