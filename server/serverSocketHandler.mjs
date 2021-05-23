"use-strict";
import CONSTS from "../src/constants.js";
const {
  SOCKET_REQUEST_USERNAME,
  SOCKET_USERNAME_OK,
  SOCKET_USERNAME_DENIED,
  SOCKET_MESSAGE,
  SOCKET_USER_JOINED,
} = CONSTS;

let users = {};

export async function handleMessage(socet, io, message) {
  console.log(message);
  message = JSON.parse(message);

  switch (message.type) {
    case SOCKET_REQUEST_USERNAME:
      await requestUsername(socet, io, message.payload);
      break;
    case SOCKET_MESSAGE:
      console.log(message.payload);
      messageReceived(socet, io, message.payload);
      io.emit("message", JSON.stringify);
      break;
  }
}

export function handleClose(socet) {
  const remainingUsers = Object.entries(users).filter(
    ([_, socket]) => socket !== socet
  );
  users = Object.fromEntries(remainingUsers);
}

async function requestUsername(socet, io, username) {
  const sockets = await io.fetchSockets();

  const hasName = sockets.findIndex((usr) => usr.data.username === username);
  console.log(hasName);
  if (hasName >= 0) {
    console.log("DENIED");
    socet.emit({ type: SOCKET_USERNAME_DENIED });
  } else {
    console.log("taking names");
    socet.data.username = username;
    socet.emit(SOCKET_USERNAME_OK);
    io.emit({
      type: SOCKET_MESSAGE,
      payload: `${username} has joined`,
    });
  }
}

function messageReceived(socet, io, message) {
  const from = Object.entries(users).find(
    ([user, socket]) => socket === socet
  )[0];

  broadcast(users, { type: SOCKET_MESSAGE, payload: `${from}: ${message}` });
}

function broadcast(users, message) {
  Object.entries(users).forEach(([_, socket]) => {
    send(socket, message);
  });
}

function send(socet, message) {
  socet.send(JSON.stringify(message));
}
