import NavBar from "./componentes/NavBar";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from 'react-router-dom';
import  {useEffect} from 'react';


function AlumnoCard() {
  const navigate = useNavigate();

  const handleVerAlumnos = () => {
   navigate('/alumnos');

  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Alumnos
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small">
            Registrar alumno
          </Button>
          <Button variant="contained" onClick={handleVerAlumnos}size="small">
            Buscar alumno
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

function CursoCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Cursos
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant="contained" size="small">
            Nuevo Curso
          </Button>
          <Button variant="contained" size="small">
            Buscar Curso
          </Button>
        </Stack>
      </CardActions>
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

export default function Dashboard() {
  const navigate = useNavigate();

    useEffect(() => {
      if(!localStorage.getItem('token')) {
        navigate('/');
      } }, [])

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
    
  
  

