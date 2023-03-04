import { Typography } from '@mui/material'
import React from 'react'

export default function ValidacionTexto({msg}) {
  return (
    <p>
    <Typography variant="caption" display="block" gutterBottom style={{color:"#ff0000"}}>
      {msg}
    </Typography>
  </p>
  )
}
