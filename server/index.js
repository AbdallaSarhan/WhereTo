const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");


const app = express();



app.use(express.json())
app.use(cors());

// ROUTES //

// register and login routes

app.use("/auth", auth);


// dashboard route

app.use("/dashboard", require("./routes/dashboard"))

// trips route
app.use("/trips", require("./routes/trips"))


app.listen(3003, () => {
    console.log("Server is running on port 3003")
});