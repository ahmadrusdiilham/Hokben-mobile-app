const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./router/index"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
