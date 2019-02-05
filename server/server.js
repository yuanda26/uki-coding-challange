const express = require("express");

// initialize express server
const server = express();

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`Server Running on Port http://localhost:${port}/`)
);
