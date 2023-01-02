require("dotenv").config();
require("./config/config");
require("./db/mongoose");
const listEndpoints = require("express-list-endpoints");

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const index = require("./routes/index");
const behave = require("./routes/behave");
const upload = require("./routes/upload");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(fileUpload());

app.use("/", index);
app.use("/behave", behave);
app.use("/upload", upload);
app.use("*", function (req, res) {
  res.status(404).send({ status: "error", message: "Invalid Url" });
});

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === "development") {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    return res.status(404).json({
      message: "Route not Exist",
    });
  }
});

if (process.env.NODE_ENV === "development") {
  // list all routes
  console.log(listEndpoints(app));
}

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
