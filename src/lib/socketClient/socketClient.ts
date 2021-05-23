import io from "socket.io-client";
import constants, { SOCKET_USERNAME_OK } from "../../constants";
import { Actions } from "./reducer";
import { Subject } from "../observer";

const {
  SOCKET_MESSAGE,
  SOCKET_REQUEST_USERNAME,
  SOCKET_USERNAME_DENIED,
  SOCKET_CONNECTED,
} = constants;

export type Message = { name: string; message: string };

export type State = {
  status: string;
  messages: Message[];
  error: string | null;
};

export const initialState: State = {
  status: "connecting...",
  messages: [],
  error: null,
};

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

    this.socket.on(SOCKET_USERNAME_OK, () => {
      this.notify({ type: SOCKET_USERNAME_OK });
    });

    this.socket.on(SOCKET_MESSAGE, (msg) => {
      const message = JSON.parse(msg) as Message;
      this.recieveMessage(message);
    });
  }

  recieveMessage = (msg: Message): void => {
    this.notify({ type: SOCKET_MESSAGE, payload: msg });
  };

  sendMessage(message: string): void {
    const jsonMessage = JSON.stringify({
      type: SOCKET_MESSAGE,
      payload: message,
    });
    this.socket.emit(SOCKET_MESSAGE, jsonMessage);
  }

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
