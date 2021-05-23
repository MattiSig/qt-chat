import { Reducer } from "react";
import { Message, State } from ".";
import {
  SOCKET_CONNECTED,
  SOCKET_USERNAME_OK,
  SOCKET_USERNAME_DENIED,
  SOCKET_MESSAGE,
} from "../../constants";

export type Actions =
  | {
      type:
        | typeof SOCKET_USERNAME_DENIED
        | typeof SOCKET_USERNAME_OK
        | typeof SOCKET_CONNECTED;
    }
  | { type: typeof SOCKET_MESSAGE; payload: Message };

export const chatReducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case SOCKET_USERNAME_DENIED:
      return {
        ...state,
        error: "username in use",
      };
    case SOCKET_USERNAME_OK:
      return {
        ...state,
        status: "username approved",
      };
    case SOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SOCKET_CONNECTED:
      console.log("yubb");
      return {
        ...state,
        status: "connected",
      };

    default:
      return state;
  }
};
