const Comment = require("./models/comment_book.model");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);
        socket.on("comment", async(data) => {
            // io.emit("listComment", data);
            socket.broadcast.emit("listComment", data);
        });
        socket.on("typing", (data) => {
            socket.broadcast.emit("typing", data);
        });
    });
};
//localhost:5000/api/users