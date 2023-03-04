import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditarBoletinHistoriaAlumno from './EditarBoletinHistoriaAlumno';

function BoletinHistoriaAlumno({calificaciones}) {
    const [calif, setCalif] = React.useState(calificaciones)
    const onModificarBoletinHistoria = (data) => {
     
      const filtro = calif.filter( c => (
        c._id !== data._id
      ))
      console.log("DAAAAA",[data,...filtro]);
  
      setCalif([data,...filtro])
    }
    
    return (
      <>
      <React.Fragment>
     
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Año</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Primer cuatrimestre</TableCell>
                <TableCell>Segundo cuatrimestre</TableCell>
                <TableCell>Tercer cuatrimestre</TableCell>
                <TableCell>Diciembre</TableCell>
                <TableCell>Marzo</TableCell>
                <TableCell>Nota final</TableCell>
                <TableCell>Aprobada</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calif
                .sort((c, d) => (c.curso.anio.anio < d.curso.anio.anio ? -1 : 1))
                .map((c, i) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.curso.anio.nombre}</TableCell>
                    <TableCell>{c.materia.materia}</TableCell>
                    <TableCell align="center">
                      {c.notas.primerCuatrimestre > 0
                        ? c.notas.primerCuatrimestre
                        : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.notas.segundoCuatrimestre > 0
                        ? c.notas.segundoCuatrimestre
                        : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.notas.tercerCuatrimestre > 0
                        ? c.notas.tercerCuatrimestre
                        : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.notas.diciembre > 0 ? c.notas.diciembre : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.notas.marzo > 0 ? c.notas.marzo : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.notas.notaFinal > 0 ? c.notas.notaFinal : " "}
                    </TableCell>
                    <TableCell align="center">
                      {c.aprobada ? <DoneAllIcon color="primary" /> : ""}
                    </TableCell>
                    <TableCell align="center">
                      <EditarBoletinHistoriaAlumno
                        thisCalificacion={c}
                        onModificar={onModificarBoletinHistoria}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
     
        </React.Fragment>
        </>
    );
}

export default BoletinHistoriaAlumno