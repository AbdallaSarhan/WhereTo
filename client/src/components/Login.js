import React, { Fragment, useState } from "react";
import AuthenticationProcess from "../apis/AuthenticationProcess";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthenticationProcess.post("/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        //console.log(response)
        setAuth(true);
        toast.success("Login Successful!");
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
          }}
        >
          <Typography variant="h1" sx={{ marginBottom: "50px" }}>
            Login
          </Typography>
          <input
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            placeholder="email"
            className="form-control my-3"
          ></input>
          <input
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-4"
          ></input>
          <button className="btn btn-success btn-block">Login</button>
        </Box>
        <Link className="btn btn-primary mt-5" to="/register">
          Register
        </Link>
      </form>
    </Fragment>
  );
};

export default Login;
