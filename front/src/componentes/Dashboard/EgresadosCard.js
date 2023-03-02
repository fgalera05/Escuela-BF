import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react'

function EgresadosCard() {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Egresados
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={1}>
            <Button variant="contained" size="small">
              Egresados
            </Button>
          </Stack>
        </CardActions>
      </Card>
    );
  }

export default EgresadosCard
