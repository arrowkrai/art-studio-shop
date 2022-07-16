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
  const textPositionTop = xlargeScreen ? 530 : largeScreen ? 380 : smallScreen ? 380 : 380;
  const textFontSize = xlargeScreen ? 72 : largeScreen ? 62 : smallScreen ? 62 : 38;
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
          fontWeight: 500,
          position: "absolute",
          top: textPositionTop,
          left: 60,
          fontSize: textFontSize,
          pr: 5,
          letterSpacing:-1
        }}
      >
        Art Prints
      </Typography>
    </Box>
  );
};

export default Banner;
