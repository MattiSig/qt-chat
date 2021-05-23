import { createServer } from "http";
import { Server } from "socket.io";
import { handleClose, handleMessage } from "./serverSocketHandler.mjs";
import CONSTS from "../src/constants.js";

const { SOCKET_REQUEST_USERNAME, SOCKET_MESSAGE } = CONSTS;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on(SOCKET_MESSAGE, (message) => handleMessage(socket, io, message));

  socket.on(SOCKET_REQUEST_USERNAME, (message) =>
    handleUsernameRequest(socket, io, message)
  );
  socket.on("disconnect", () => handleClose(socket));
});

httpServer.listen(8083);
