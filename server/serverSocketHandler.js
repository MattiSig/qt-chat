"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClose = exports.handleMessage = void 0;
const constants_1 = require("../shared/constants");
let users = {};
async function handleMessage(socet, io, message) {
    message = JSON.parse(message);
    switch (message.type) {
        case constants_1.SOCKET_REQUEST_USERNAME:
            await requestUsername(socet, io, message.payload);
            break;
        case constants_1.SOCKET_MESSAGE:
            console.log(message.payload);
            messageReceived(socet, io, message.payload);
            break;
    }
}
exports.handleMessage = handleMessage;
function handleClose(socet) {
    const remainingUsers = Object.entries(users).filter(([_, socket]) => socket !== socet);
    users = Object.fromEntries(remainingUsers);
}
exports.handleClose = handleClose;
async function requestUsername(socet, io, username) {
    const sockets = await io.fetchSockets();
    const hasName = sockets.findIndex((usr) => usr.data.username === username);
    if (hasName >= 0) {
        socet.emit({ type: constants_1.SOCKET_USERNAME_DENIED });
    }
    else {
        socet.data.username = username;
        socet.emit(constants_1.SOCKET_USERNAME_OK, username);
        io.emit({
            type: constants_1.SOCKET_USER_JOINED,
            payload: `${username} has joined`,
        });
    }
}
function messageReceived(socet, io, message) {
    const username = socet.data.username;
    io.emit(constants_1.SOCKET_MESSAGE, {
        type: constants_1.SOCKET_MESSAGE,
        payload: { name: username, message },
    });
}
