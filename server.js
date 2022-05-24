const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const errorHandle = require("./middlewares/errorHandle");

const app = express();

dotenv.config({
  path: "./config/dev.env",
});
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

require("./config/database")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

