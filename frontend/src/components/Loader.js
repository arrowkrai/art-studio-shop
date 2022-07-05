import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loader = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", pt:5}}>
      <CircularProgress />
    </Box>
  )
}

export default Loader