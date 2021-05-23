import { SocketClient } from "./lib/socketClient";
import { SocketClientProvider } from "./lib/socketClient";
import { UserForm, Chat } from "./components";
import { useState } from "react";

// making sure socket client is initialized once
const socketClient = new SocketClient();

export const App: React.FC = function () {
  const [showChat, setShowChat] = useState<boolean>(false);

  const toggleChat = (openChat: boolean): void => {
    setShowChat(openChat);
  };

  return (
    <SocketClientProvider client={socketClient}>
      <UserForm toggleChat={toggleChat} />
      {showChat && <Chat />}
    </SocketClientProvider>
  );
};
