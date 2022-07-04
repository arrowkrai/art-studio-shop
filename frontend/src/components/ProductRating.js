import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const ProductRating = ({value, props, text}) => {
  return (
    <Box sx={props}>
      {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
    </Box>
  )
}

export default ProductRating