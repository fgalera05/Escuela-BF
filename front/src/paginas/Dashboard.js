import NavBar from "../componentes/Comun/NavBar";
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

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import EgresadosCard from "../componentes/Dashboard/EgresadosCard";
import CursoCard from "../componentes/Dashboard/CursoCard";
import AlumnoCard from "../componentes/Dashboard/AlumnoCard";
import EspecialidadCard from "../componentes/Dashboard/EspecialidadCard";
import AnioCard from "../componentes/Dashboard/AnioCard";
import MateriaCard from "../componentes/Dashboard/MateriaCard";

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
