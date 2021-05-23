import { SocketClient } from "./lib/socketClient";
import { SocketClientProvider } from "./lib/socketClient";
import { UserNameForm, Chat } from "./components";

// making sure socket client is initialized once
const socketClient = new SocketClient();

export const App: React.FC = function () {
  return (
    <SocketClientProvider client={socketClient}>
      <UserNameForm />
      <Chat />
    </SocketClientProvider>
  );
};
