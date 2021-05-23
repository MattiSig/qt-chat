import { FormEventHandler, useRef } from "react";
import { useSocketConnection } from "../lib/socketClient";

export type Props = null;

export const UserForm: React.FC = () => {
  const { state, requestUsername } = useSocketConnection();
  const inputEl = useRef<HTMLInputElement>(null);

  const submitUserName: FormEventHandler = (evt) => {
    evt.preventDefault();
    const input = inputEl.current;
    requestUsername(input ? input.value : "");
  };

  return (
    <div>
      SOCKET
      <form onSubmit={submitUserName}>
        <label htmlFor="name">Name (4 to 8 characters):</label>
        <input type="text" id="name" name="name" ref={inputEl} required />
        <button type="submit">Submit</button>
      </form>
      <span> {state?.status}</span>
    </div>
  );
};
