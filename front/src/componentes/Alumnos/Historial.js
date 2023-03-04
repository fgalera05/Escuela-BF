import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import BoletinHistoriaAlumno from './BoletinHistoriaAlumno';

function Historial({ alumno, update }) {
    const token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const [historia, setHistoria] = React.useState([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/calificaciones/historial/" + alumno._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log("HISTORIAAAAA", response.data);
          setHistoria(response.data);
          update(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
    const handleClickOpen = () => {
      console.log("Historia:", alumno);
      setOpen(true);
      
    };
    const handleClose = () => {
      try {
        axios
        .get("http://localhost:8000/calificaciones/historial/" + alumno._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log("HISTORIAAAAA", response.data);
          setHistoria(response.data);
          update(true);
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        
      }
      
      // update(true);
    };
  
    return (
      <div>
        {historia.length> 0 ?
        <>
        <IconButton
          color="secondary"
          aria-label="edit"
          component="label"
          onClick={handleClickOpen}
        >
          <HistoryEduIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} maxWidth="string">
          <DialogTitle>
            <Typography>Calificaciones anteriores:</Typography>
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
                <BoletinHistoriaAlumno calificaciones={historia} />
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Box
            >
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
        </>
        :" "}
      </div>
    );
  }

export default Historial