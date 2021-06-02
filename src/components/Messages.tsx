import { Message } from "../lib/socketClient";

type Props = {
  messages: Message[];
};

export const Messages: React.FC<Props> = (props) => {
  return (
    <>
      {props.messages.map((msg) => (
        <p key={msg.message}>
          <b>{`${msg.name}`}</b>: {msg.message}
        </p>
      ))}
    </>
  );
};
