import path from "path";
import express from "express";
import addWebSockets from "express-ws";
import { handleMessage, handleClose } from "./serverSocketHandler.mjs";

// esm would not allow __dirname
// fix found at https://github.com/nodejs/help/issues/2907
// futher reading https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_differences_between_es_modules_and_commonjs
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
addWebSockets(app);

const PORT = 8080;

app.ws("/", (ws, _) => {
  ws.on("message", (message) => handleMessage(ws, message));
  ws.on("close", () => handleClose(ws));
});

app.use(express.static(path.join(__dirname, "..", "dist")));

// app.get("*", (_, res) =>
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
// );

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
