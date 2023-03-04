import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

export default function NavBar() {
    const navigate = useNavigate();

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }

    const handleVolver = () =>{
        navigate('/dashboard');
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  >
      <Container maxWidth="xl">
        <Toolbar  >
         
            <SchoolRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Escuela App
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleVolver}>Home</Button>
          <Button variant="contained" color="secondary" onClick={handleLogOut}>Salir</Button>
        </Toolbar>
        </Container>
      </AppBar>
      
    </Box>
  );
}