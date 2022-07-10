import React from "react";

import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (isNaN(page)) page = 1;
  const navigate = useNavigate();

  const handleChange = (e, value) => {
    navigate(
      !isAdmin ? (keyword ? `/search/${keyword}/page/${value}` : `/page/${value}`) : `/admin/productlist/${value}`
    );
  };

  return (
    pages > 1 && (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", my: 4 }}>
        <Pagination
          color="primary"
          sx={{ "& .MuiPaginationItem-root": { color: "white" } }}
          count={pages}
          page={page}
          onChange={handleChange}
        />
      </Box>
    )
  );
};

export default Paginate;
