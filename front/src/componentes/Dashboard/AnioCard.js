import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

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
                        {/* <TableCell>{parseInt(materia._id)}</TableCell> */}
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

export default AnioCard;