import { SocketClient } from "./lib/socketClient";
import { SocketClientProvider } from "./lib/socketClient";
import { UserNameForm, Chat } from "./components";

const socketClient = new SocketClient();

export const App: React.FC = function () {
  return (
    <SocketClientProvider client={socketClient}>
      <UserNameForm />
      <Chat />
    </SocketClientProvider>
  );
};
