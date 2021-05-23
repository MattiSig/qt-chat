import path from "path";
import express from "express";

import { handleMessage, handleClose } from "./serverSocketHandler.mjs";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// esm would not allow __dirname
// fix found at https://github.com/nodejs/help/issues/2907
// futher reading https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_differences_between_es_modules_and_commonjs
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 8083;

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
app.use(cors());

// app.ws("/", (ws, _) => {
//   ws.on("message", (message) => handleMessage(ws, message));
//   ws.on("close", () => handleClose(ws));
// });

// app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
);

let server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

let io = Server.listen(server);
io.on("connection", (socket) => {
  console.log("a user connected");
});
