const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const errorHandle = require("./middlewares/errorHandle");
const socket = require("./socket");

const app = express();
const cors = require("cors");
app.use(cors({
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    }))
    // app.use(cors());
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

dotenv.config({
    path: "./config/dev.env",
});
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

require("./config/database")();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRouter);
socket(io);
app.use(errorHandle);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});