import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationProcess from "../apis/AuthenticationProcess";
import { Button, Typography } from "@mui/material";
// I need a change
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  //   const [test, setTest] = useState(false);
  async function getName() {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const response = await AuthenticationProcess.get("/dashboard/", {
        headers,
      });
      setName(response.data.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  const goToPosts = (e) => {
    navigate("/posts");
  };
  const goToPost = (e) => {
    navigate("/post");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <div className="text-center mt-3">
        <div className="flex-col">
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="h3">Welcome!</Typography>
          <Typography variant="h5">{name}</Typography>
        </div>

        <div className="mt-5">
          <button className="btn btn-primary" onClick={(e) => logout(e)}>
            Logout
          </button>
          <button className="btn btn-warning" onClick={(e) => goToPosts(e)}>
            See Who's Travelling
          </button>
          <button className="btn btn-warning" onClick={(e) => goToPost(e)}>
            Post a Trip
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
