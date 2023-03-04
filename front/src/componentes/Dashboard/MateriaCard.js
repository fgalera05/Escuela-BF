import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import EditarMateria from '../Materias/EditarMateria';

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
                                  <EditarMateria
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
  

export default MateriaCard
