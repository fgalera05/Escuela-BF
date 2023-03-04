import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React from 'react'
import SchoolIcon from "@mui/icons-material/School";
import EditarEspecialidad from './EditarEspecialidad';

function VerEspecialidades({open,handleClose,especialidades,onModificar}) {
  return (
    <div>
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
                            <EditarEspecialidad
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
    </div>
  )
}

export default VerEspecialidades
