const Comment = require("./models/comment_book.model");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.on("comment", async (data) => {
      data.time = Date();
      socket.broadcast.emit("comment", data);
    });
    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
    });
  });
};
