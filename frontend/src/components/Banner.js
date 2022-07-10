import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Banner = () => {
  const theme = useTheme();

  const xlargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const bannerHeight = xlargeScreen ? 550 : 400;
  const textPositionTop = xlargeScreen ? 500 : largeScreen ? 380 : smallScreen ? 400 : 350;
  const textFontSize = xlargeScreen ? 96 : largeScreen ? 68 : smallScreen ? 46 : 38;
  return (
    <Box sx={{ mb: 10 }}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${"/images/055_Obsidian_Dragon_Sett.jpg"})`,
          height: bannerHeight,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          color: "grey.100",
          fontWeight: 600,
          position: "absolute",
          top: textPositionTop,
          left: 50,
          fontSize: textFontSize,
          pr: 5,
        }}
      >
        West Studio Art Shop
      </Typography>
    </Box>
  );
};

export default Banner;
