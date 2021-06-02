"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const serverSocketHandler_1 = require("./serverSocketHandler");
const constants_js_1 = require("../shared/constants.js");
const httpServer = http_1.createServer();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("Connection established");
    socket.on(constants_js_1.SOCKET_MESSAGE, (message) => serverSocketHandler_1.handleMessage(socket, io, message));
    socket.on("disconnect", () => serverSocketHandler_1.handleClose(socket));
});
httpServer.listen(8083);
