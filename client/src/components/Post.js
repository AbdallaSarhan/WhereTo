import React, { useState, useEffect } from "react";
import Form from "./Form";
import AuthenticationProcess from "../apis/AuthenticationProcess";
import { Box } from "@mui/system";
const Post = () => {
  const [name, setName] = useState("");

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
  useEffect(() => {
    getName();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="mt-5">
        <div
          //key={review.id}
          className="card text-white bg-info mb-3 mr-4"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span className="text-danger">{name}</span>
          </div>
          <div className="card-body">
            <Form />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Post;
