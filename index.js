const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

io.on("connection", (socket) => {
	console.log(`User with id ${socket.id} connected`);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room ${data}`);
	});

	socket.on("send-message", (data) => {
		socket.to(data.room).emit("receive-message", data);
	});

	socket.on("disconnect", () => {
		console.log(`User with id ${socket.id} disconnected`);
	});
});

server.listen(PORT, function () {
	console.log("Server listening on port " + PORT);
});
