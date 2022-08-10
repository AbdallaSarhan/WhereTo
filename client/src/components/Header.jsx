import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export function Header() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        background: "lightblue",
        justifyContent: "center",
      }}
    >
      <img src="client/src/images/Shipem-07" alt="" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "lightgray",
          justifyContent: "space-between",
          padding: "200px",
        }}
      >
        <Typography variant="h2" color="white">
          WhereTo
        </Typography>
        <Box
          sx={{
            margin: "30px",
            paddingX: "150px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => goToLogin(e)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => goToRegister(e)}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Share your trip details!</Typography>
      </Box>
    </Box>
  );
}
