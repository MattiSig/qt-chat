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
  message = JSON.parse(message);

  switch (message.type) {
    case SOCKET_REQUEST_USERNAME:
      await requestUsername(socet, io, message.payload);
      break;
    case SOCKET_MESSAGE:
      console.log(message.payload);
      messageReceived(socet, io, message.payload);
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
  if (hasName >= 0) {
    socet.emit({ type: SOCKET_USERNAME_DENIED });
  } else {
    socet.data.username = username;
    socet.emit(SOCKET_USERNAME_OK, username);
    io.emit({
      type: SOCKET_USER_JOINED,
      payload: `${username} has joined`,
    });
  }
}

function messageReceived(socet, io, message) {
  const username = socet.data.username;

  io.emit(SOCKET_MESSAGE, {
    type: SOCKET_MESSAGE,
    payload: { name: username, message },
  });
}
