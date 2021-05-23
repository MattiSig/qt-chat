import { FormEventHandler, useRef, useState } from "react";
import { useSocketConnection } from "../lib/socketClient/SocketClientProvider";
export type ChatProps = null;

const Chat: React.FC = () => {
  const { state, sendMessage } = useSocketConnection();
  const messageArray = state.messages ? state.messages : [];

  const [showChat, setShowChat] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  if (state?.status === "username approved" && !showChat) {
    setShowChat(true);
  }

  if (!showChat) {
    return null;
  }

  const submitMessage: FormEventHandler = (evt) => {
    evt.preventDefault();
    const input = inputEl.current;
    sendMessage(input ? input.value : "");
    if (input) {
      input.value = "";
    }
  };

  return (
    <>
      <h1>This is the chat!</h1>
      {messageArray.map((msg) => (
        <p key={msg.message}>
          <b>{`${msg.name}`}</b>: {msg.message}
        </p>
      ))}
      <form onSubmit={submitMessage}>
        <label htmlFor="message">Message: </label>
        <input type="text" id="message" name="message" ref={inputEl} required />
        <button type="submit">Send!</button>
      </form>
    </>
  );
};

export default Chat;
