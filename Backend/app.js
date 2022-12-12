const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


//Routes declared here
const userRoutes = require("./routes/users");
const statRoutes = require("./routes/statistics")


const security = require("./middleware/security");
const { NotFoundError } = require("./utils/errors");


const app = express();

//enable cross-origin resource sharing for all origin for all requests
app.use(cors());
//parse incoming requests with JSON payloads
app.use(express.json());
//log requests info
app.use(morgan("tiny"));
//for every request, check if a token exists 
//in the authorization header
//if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt);

app.use("/user", userRoutes);
app.use("/stats", statRoutes)

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

//Handle 404 errors(route doesnt match) - this matches everything
app.use((req, res, next) => {
  return next(new NotFoundError());
});

//Generic error handler; anything unhandled goes here
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;