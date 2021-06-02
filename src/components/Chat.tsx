import { FormEventHandler, useRef, useState } from "react";
import { useSocketConnection } from "../lib/socketClient/SocketClientProvider";
import { Messages } from ".";
import { TextField, Button } from "./ui";

export type ChatProps = null;

const Chat: React.FC = () => {
  const { state, sendMessage } = useSocketConnection();

  const [showChat, setShowChat] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  console.log(state?.status);
  if (state?.status === "username approved" && !showChat) {
    setShowChat(true);
  }

  if (!showChat) return null;

  const submitMessage: FormEventHandler = (evt) => {
    evt.preventDefault();
    const input = inputEl.current;
    sendMessage(input ? input.value : "");

    if (input) input.value = "";
  };

  return (
    <>
      <h1>Welcome to the chat! {state.username}</h1>
      <Messages messages={state.messages} />
      <form onSubmit={submitMessage}>
        <TextField
          type="text"
          id="message"
          name="message"
          label="Message: "
          ref={inputEl}
        />
        <Button type="submit">Send!</Button>
      </form>
    </>
  );
};

export default Chat;
