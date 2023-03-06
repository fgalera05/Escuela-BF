import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import BoletinHistoria from './BoletinHistoria';
import { useDefaultDates } from '@mui/x-date-pickers/internals';
import { useNavigate } from 'react-router-dom';

function Historial({ alumno}) {
    const token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const [historia, setHistoria] = React.useState([]);
    const [actualizacion, setActualizacion] = React.useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(process.env.REACT_APP_URL+"calificaciones/historial/" + alumno._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setHistoria(response.data);
          
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401){
            navigate("/");
    }
        });
    }, []);
    
    const handleClickOpen = () => {
      setOpen(true);
      
    };

    const actualizar = (data) =>{
      if(data){
        try {
          axios
        .get(process.env.REACT_APP_URL+"calificaciones/historial/" + alumno._id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setHistoria(response.data);
          setActualizacion(data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401){
            navigate("/");
    }
        });
        } catch (error) {
          if (error.response.status === 401){
            navigate("/");
    }
        }
      
      }
    }

    const handleClose = () => {
      // update(actualizacion);
      setOpen(false);
      

    };
  
    return (
      <div>
        {historia.length> 0 ?
        <>
        <IconButton
          color="primary"
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
                <BoletinHistoria calificaciones={historia} actualizar={actualizar}/>
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
