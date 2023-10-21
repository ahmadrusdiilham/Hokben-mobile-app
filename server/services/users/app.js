const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4001;
const cors = require("cors");
const { connect } = require("./config/mongodb");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./router/index"));

connect().then((db) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
