import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationProcess from "../apis/AuthenticationProcess";
import { TripsContext } from "../context/tripsContext";
import { toast } from "react-toastify";
import { Button } from "@mui/material/";

const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState();
  const [restriction, setRestriction] = useState("Restriction");
  //const {addTrips} = useContext(TripsContext)

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
  async function getId() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token,
        name,
      };

      const getId = await AuthenticationProcess.get("/trips/id", { headers });
      setId(getId.data.data.id.user_id);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);

  const handleTripSubmission = async (e) => {
    e.preventDefault();
    getId();
    console.log(id);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        token,
        name,
        id,
        from,
        to,
        restriction,
        trip_date: date,
      };
      //console.log(id.data.data.id.user_id)
      const response = await AuthenticationProcess.post("/trips/post", {
        headers,
      });
      console.log(response);
      //addTrips(response)
      toast.success("Trip Added!");
    } catch (error) {
      console.error(error.message);
      toast.error("There was a problem submitting your trip!");
    }
  };

  return (
    <div className="container">
      <div className="mb-2">
        <form action="">
          <div className="form-col">
            <div className="form-row">
              <div className="form-group col-6">
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  id="from"
                  placeholder="from"
                  type="text"
                  className="form-control"
                />
                <i className="fa-solid fa-plane-departure mt-2"></i>
              </div>

              <div className="form-group col-6">
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  id="to"
                  placeholder="to"
                  type="text"
                  className="form-control"
                />
                <i class="fa-solid fa-plane-arrival mt-2"></i>
              </div>
            </div>
            <div className="form-group col-8">
              <select
                value={restriction}
                onChange={(e) => setRestriction(e.target.value)}
                id="restriction"
                className="custom-select mt-3 mb-3"
              >
                <option disabled>Restriction</option>
                <option value="Letters only">Letters only</option>
                <option value="Packages only">Packages only</option>
                <option value="Both">Both</option>
              </select>
              <i className="fa-solid fa-box mr-3"></i>
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Review">Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              placeholder="yyyy-mm-dd"
              type="date"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Review">Extra info</label>
            <textarea id="info" className="form-control"></textarea>
          </div>
          <Button
            type="submit"
            onClick={(e) => handleTripSubmission(e)}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
      <button className="btn btn-warning mt-5" onClick={(e) => goHome(e)}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Form;
