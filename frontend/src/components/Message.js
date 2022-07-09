import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const Message = ({ variant, text }) => {
  return (
    <Alert severity={variant}>
      <Typography variant="p" sx={{ fontWeight: 500 }}>
        {text}
      </Typography>
    </Alert>
  );
};

Message.defaultProps = {
  variant: "error",
};

export default Message;
