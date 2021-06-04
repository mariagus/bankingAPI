const express = require("express");
const routes = require("./Config/routes");

const app = express();

app.use(express.json());

routes(app);

module.exports = app;
