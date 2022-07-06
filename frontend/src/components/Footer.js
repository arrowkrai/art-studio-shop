import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {FaTwitter, FaFacebook, FaInstagram, FaVimeo} from 'react-icons/fa'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{display:"flex", minHeight:'64px', color:"grey.400", backgroundColor: "#101010", justifyContent:'space-between', px:3, alignItems:"center"}}>
      <Typography>© Copyright West Studio {new Date().getFullYear()}</Typography>
      <Box>
        <Link sx={{color:'grey.400', ml:2, fontSize:'1.3rem', "&:hover": {color:'white'}}} target="_blank" href="http://facebook.com/weststudionews"><FaFacebook /></Link>
        <Link sx={{color:'grey.400', ml:2, fontSize:'1.3rem', "&:hover": {color:'white'}}} target="_blank" href="https://twitter.com/WestStudioNews"><FaTwitter /></Link>
        <Link sx={{color:'grey.400', ml:2, fontSize:'1.3rem', "&:hover": {color:'white'}}} target="_blank" href="https://www.instagram.com/weststudionews/"><FaInstagram /></Link>
        <Link sx={{color:'grey.400', ml:2, fontSize:'1.3rem', "&:hover": {color:'white'}}} target="_blank" href="https://vimeo.com/weststudio"><FaVimeo /></Link>
      </Box>
    </Box>
  )
}

export default Footer