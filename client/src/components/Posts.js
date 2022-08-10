import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationProcess from "../apis/AuthenticationProcess";
import { TripsContext } from "../context/tripsContext";

const Posts = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { trips, setTrips } = useContext(TripsContext);

  const goHome = (e) => {
    navigate("/dashboard");
  };
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
  const fetchData = async () => {
    try {
      const response = await AuthenticationProcess.get("/trips");
      console.log(response.data.data.trips);
      setTrips(response.data.data.trips);
    } catch (err) {}
  };
  useEffect(() => {
    getName();

    fetchData();
  }, []);
  return (
    <>
      <button className="btn btn-warning mt-5" onClick={(e) => goHome(e)}>
        Back to Dashboard
      </button>
      <Typography variant="h5" sx={{ marginTop: "50px" }}>
        Check who's Travelling{" "}
      </Typography>
      <Typography variant="h6" color="red">
        {name}
      </Typography>

      <div className="row row-cols-3 mt-5">
        {trips.map((trip) => {
          return (
            <div
              key={trip.id}
              className="card text-white bg-info mb-3 mr-4"
              style={{ maxWidth: "30%" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span className="text-dark">{trip.user_name}</span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  From: {trip.user_from}
                  <i className="fa-solid fa-plane-departure ml-3"></i>
                </p>
                <p className="card-text">
                  To: {trip.user_to}
                  <i className="fa-solid fa-plane-arrival ml-3"></i>
                </p>
                <p className="card-text">
                  Allowing: {trip.user_restrictions}
                  <i className="fa-solid fa-box mr-3 ml-3"></i>
                  <i className="fa-solid fa-envelope"></i>
                </p>
                <p className="card-text">
                  Date: {trip.trip_date}
                  <i className="fa-solid fa-calendar ml-3"></i>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
