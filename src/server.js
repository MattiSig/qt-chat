const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const socketHandler = require('./serverSocketHandler');

const port = 8080;

app.ws('/', (ws, req) => {
  ws.on('message', (...args) => socketHandler.handleMessage(ws, ...args));
  ws.on('close', (...args) => socketHandler.handleClose(ws, ...args));
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));

app.listen(port, () => console.log(`Listening on port ${port}`));

