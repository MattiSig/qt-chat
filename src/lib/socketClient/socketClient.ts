import io from "socket.io-client";
import {
  SOCKET_MESSAGE,
  SOCKET_REQUEST_USERNAME,
  SOCKET_USERNAME_DENIED,
  SOCKET_CONNECTED,
  SOCKET_USERNAME_OK,
} from "../../../shared/constants";
import { Actions } from "./reducer";
import { Subject } from "../observer";

export type Message = { name: string; message: string };

export class SocketClient extends Subject<Actions> {
  private socket;
  error = "";
  forceUpdate: () => void = () => {
    return;
  };

  constructor() {
    super();

    this.socket = io("http://localhost:8083");

    this.socket.on(SOCKET_CONNECTED, () => {
      this.notify({ type: SOCKET_CONNECTED });
    });

    this.socket.on(SOCKET_USERNAME_DENIED, () => {
      this.notify({ type: SOCKET_USERNAME_DENIED });
    });

    this.socket.on(SOCKET_USERNAME_OK, (username: string) => {
      this.notify({ type: SOCKET_USERNAME_OK, payload: username });
    });

    this.socket.on(SOCKET_MESSAGE, (msg) => {
      const message = msg as Actions;
      this.recieveMessage(message);
    });
  }

  recieveMessage = (msg: Actions): void => {
    this.notify(msg);
  };

  sendMessage = (message: string): void => {
    const jsonMessage = JSON.stringify({
      type: SOCKET_MESSAGE,
      payload: message,
    });

    this.socket.emit(SOCKET_MESSAGE, jsonMessage);
  };

  requestUser = (userName = ""): void => {
    if (!userName) return;

    const jsonMessage = JSON.stringify({
      type: SOCKET_REQUEST_USERNAME,
      payload: userName,
    });
    this.socket.emit(SOCKET_MESSAGE, jsonMessage);
  };

  close(): void {
    this.socket.emit("close");
  }
}
