import NavBar from "./componentes/NavBar";
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';

function AlumnoCard() {
  const navigate = useNavigate();
  const handleVerAlumnos = () => {
    navigate("/alumnos");
  };
  const handleRegistrar = () => {
    navigate("/registrar");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Alumnos
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" onClick={handleRegistrar} size="small">
            Registrar alumno
          </Button>
          <Button variant="contained" onClick={handleVerAlumnos} size="small">
            Buscar alumno
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

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
            // console.log(e.especialidad.especialidad)
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

function CalificacionCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Calificaciones
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small">
            Calificar
          </Button>
          <Button variant="contained" size="small">
            Buscar calificación
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

function MateriaCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Materias
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small">
            Nueva Materia
          </Button>
          <Button variant="contained" size="small">
            Buscar Materia
          </Button>
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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          
        </TableCell>
        <TableCell align="left">{anio.nombre}: {anio.especialidad.especialidad}</TableCell>
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
                  {anio.materias.map((materia) => (
                    <TableRow key={materia._id}>
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

  const handleClickOpen = () => {
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
          <Button variant="contained" size="small">
            Nuevo año
          </Button>
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
                    {anios.filter(
                      (a)=>(
                        a.nombre !== "Egresados"
                      )
                    ).map((a ) => (
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

function EspecialidadCard() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [especialidades, setEspecialidades] = React.useState([]);
  let aux;

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
              <List>
                {/* {console.log(especialidades)} */}
                {especialidades.filter(
                  (e) => (
                      e.especialidad != " "
                  )
                ).map((e) => (
                  <ListItem key={e._id}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={e.especialidad} />
                    
                  </ListItem>
                ))}
              </List>
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
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Grid container spacing={2}>
            <Grid item>
              <AlumnoCard />
            </Grid>
            <Grid item>
              <CursoCard />
            </Grid>
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
              <CalificacionCard />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
