import { SocketClient } from "./lib/socketClient";
import { SocketClientProvider } from "./lib/socketClient";
import { UserForm } from "./components/UserNameForm";

const socketClient = new SocketClient();

export const App: React.FunctionComponent = function () {
  return (
    <SocketClientProvider client={socketClient}>
      <UserForm />
    </SocketClientProvider>
  );
};
