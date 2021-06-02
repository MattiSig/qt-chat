import { FormEventHandler, useRef } from "react";
import { useSocketConnection } from "../lib/socketClient";
import { Button, TextField } from "./ui";

export const UserNameForm: React.FC = () => {
  const { state, requestUsername } = useSocketConnection();
  const inputEl = useRef<HTMLInputElement>(null);

  const submitUserName: FormEventHandler = (evt) => {
    evt.preventDefault();
    const input = inputEl.current;
    requestUsername(input ? input.value : "");
  };

  return (
    <div>
      <form onSubmit={submitUserName}>
        <TextField
          type="text"
          id="username"
          name="username"
          label="Username: "
          ref={inputEl}
        />
        <Button type="submit">Send!</Button>
      </form>
      <span> {state?.status}</span>
    </div>
  );
};
