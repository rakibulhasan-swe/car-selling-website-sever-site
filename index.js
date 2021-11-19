const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routesHandler = require("./creative-agency/user/routesHandler");
const adminroutesHandler = require("./creative-agency/admin/adminRoutes");
const makeAdmin = require("./creative-agency/makeAdmin/makeAdminRoutes");
const reviewRoute = require("./creative-agency/review/reviewRoute");

const app = express();
const port = 4000 || process.env.PORT;

//express middleware
app.use(express.json());
app.use(cors());
-app.use(bodyParser.json());
app.use(fileUpload());
require("dotenv").config();
app.use(authentication);
// customer
app.use("/creative-agency", routesHandler);
app.use("/review", reviewRoute);
//admin
app.use("/admin", adminroutesHandler);
app.use("/make-admin", makeAdmin);

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rggmg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connect...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.json({ error: "404 not found" });
});

app.listen(port, () => {
  console.log("server listening...");
});