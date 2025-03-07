require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { db } = require("./db/db");
const { readdirSync } = require("fs");

const PORT = process.env.PORT || 443;

//middlewares
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "*" }));

//routes
readdirSync("./routes").map((route) => {
  app.use("/api/v1", require("./routes/" + route));
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
