import React from "react";
import { Typography, Divider } from "@mui/material";

function Navbar() {
  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          mb: 2,
          fontWeight: "bold",
          color: "#000000",
          background:"#52e1dc",
          borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
          
        }}
      >
        Task Management System
      </Typography>
      <Divider sx={{ mb: 3 }} />
    </>
  );
}

export default Navbar;
