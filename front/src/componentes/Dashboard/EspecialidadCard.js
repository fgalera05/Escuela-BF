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
import VerEspecialidades from "../Especialidad/VerEspecialidades";
import { useNavigate } from "react-router-dom";


function EspecialidadCard() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const [especialidades, setEspecialidades] = React.useState([]);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
  };

  useEffect(() => {
    
    axios
      .get(process.env.REACT_APP_URL+"especialidades/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setEspecialidades(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  const onModificar = async (id, especialidad) => {
    try {
      console.log("Received values of form: ", id, especialidad, token);

      await axios
        .patch(
          process.env.REACT_APP_URL+"especialidades/" + id,
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
          const especialidadesCopy = especialidades.filter(
            (e) => e._id !== response.data._id
          );
          setEspecialidades([response.data, ...especialidadesCopy]);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
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
          <VerEspecialidades open={open} handleClose={handleClose} especialidades={especialidades} onModificar={onModificar} />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default EspecialidadCard;
