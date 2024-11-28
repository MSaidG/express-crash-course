const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const { title } = require("process");
const app = express();
const blogRoutes = require("./routes/blogRoutes.js");

const USER = encodeURIComponent(process.env.DB_USER);
const PASS = encodeURIComponent(process.env.DB_PASS);

const dbURI = `mongodb+srv://${USER}:${PASS}@nodetuts.9gj5e.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);

app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "About",
  });
});

app.get("/about-us", function (req, res) {
  res.redirect("about");
});

// Should be at the bottom
app.use((req, res) => {
  res.status(404);
  res.render("404", {
    title: "Error",
  });
});
