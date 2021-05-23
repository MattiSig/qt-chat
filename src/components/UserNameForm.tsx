import { FormEventHandler, useRef } from "react";
import { useSocketConnection } from "../lib/socketClient";

export type Props = { toggleChat: (set: boolean) => void };

export const UserForm: React.FC<Props> = ({ toggleChat }) => {
  const { state, requestUsername } = useSocketConnection();
  const inputEl = useRef<HTMLInputElement>(null);

  const submitUserName: FormEventHandler = (evt) => {
    evt.preventDefault();
    const input = inputEl.current;
    requestUsername(input ? input.value : "");
  };

  if (state?.status === "username approved") {
    toggleChat(true);
  }

  return (
    <div>
      <form onSubmit={submitUserName}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" ref={inputEl} required />
        <button type="submit">Submit</button>
      </form>
      <span> {state?.status}</span>
    </div>
  );
};
