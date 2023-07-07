const express = require("express");
const PORT = 4048;
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use("/api", require("./app"));

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
