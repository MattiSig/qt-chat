import { createContext, useContext, useEffect, useReducer } from "react";
import { chatReducer, Actions, initialState, State } from ".";
import { SocketClient } from "./socketClient";
import { Observer } from "../observer";

const SocketContext = createContext<SocketClient | undefined>(undefined);

type ProviderProps = {
  client: SocketClient;
};

export const SocketClientProvider: React.FC<ProviderProps> = ({
  client,
  children,
}) => {
  useEffect(() => {
    return () => {
      client.close();
    };
  }, [client]);

  return (
    <SocketContext.Provider value={client}>{children}</SocketContext.Provider>
  );
};

const useSocketClient: () => SocketClient = () => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error(
      "No socket client set, initialize one with the SocketClientProvider"
    );
  }

  return socketContext;
};

type Methods = {
  requestUsername: (name: string) => void;
  sendMessage: (message: string) => void;
};

export const useSocketConnection = (): Methods & { state: State } => {
  const socketClient = useSocketClient();
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const onSocketStateUpdate: Observer<Actions> = (action) => {
    dispatch(action);
  };

  useEffect(() => {
    socketClient.addObserver(onSocketStateUpdate);
    return () => {
      socketClient.removeObserver(onSocketStateUpdate);
    };
  }, [socketClient]);

  const methods: Methods = {
    requestUsername: socketClient.requestUser,
    sendMessage: socketClient.sendMessage,
  };

  return { state, ...methods };
};
