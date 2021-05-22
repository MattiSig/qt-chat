const path = require("path");
const express = require("express");
const app = express();
const addWebSockets = require("express-ws");
const socketHandler = require("./serverSocketHandler");

addWebSockets(app);

const PORT = 8080;

app.ws("/", (ws, _) => {
 ws.on("message", (message) => socketHandler.handleMessage(ws, message));
  ws.on("close", () => socketHandler.handleClose(ws));
});
 
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
