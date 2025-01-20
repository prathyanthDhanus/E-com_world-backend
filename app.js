const express = require("express");
const app = express();
const cors = require("cors");

//Middlewares
app.use(express.json());
app.use(cors());

// Error handling middleware
app.use(errorHandler);

module.exports = app;
