const express = require("express");
const app = express();
app.get("/", function (req, res) {
  res.send("Hello World!");
});
const server = app.listen(8000, function () {});
