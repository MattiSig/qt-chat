const {
  SOCKET_REQUEST_USERNAME,
  SOCKET_USERNAME_OK,
  SOCKET_USERNAME_DENIED,
  SOCKET_MESSAGE,
} = require("./constants");

let users = {};

function handleMessage(ws, message) {
  message = JSON.parse(message);
  switch (message.type) {
    case SOCKET_REQUEST_USERNAME:
      requestUsername(ws, message.payload);
      break;
    case SOCKET_MESSAGE:
      messageReceived(ws, message.payload);
      break;
  }
}

function handleClose(ws) {
  const remainingUsers = Object.entries(users).filter(
    ([name, socket]) => socket !== ws
  );
  users = Object.fromEntries(remainingUsers);
}

function requestUsername(ws, username) {
  if (users[username] != null) {
    send(ws, { type: SOCKET_USERNAME_DENIED });
  } else {
    send(ws, { type: SOCKET_USERNAME_OK });
    users[username] = ws;
    broadcast(users, {
      type: SOCKET_MESSAGE,
      payload: `${username} has joined`,
    });
  }
}

function messageReceived(ws, message) {
  const from = Object.entries(users).find(([user, socket]) => socket === ws)[0];

  broadcast(users, { type: SOCKET_MESSAGE, payload: `${from}: ${message}` });
}

function broadcast(users, message) {
  Object.entries(users).forEach(([_, socket]) => {
    send(socket, message);
  });
}

function send(ws, message) {
  ws.send(JSON.stringify(message));
}

module.exports = { handleMessage, handleClose };
