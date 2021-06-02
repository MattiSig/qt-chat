import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { useRef } from "react";

export const Button: React.FC<AriaButtonProps> = (props) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref) as {
    buttonProps: AriaButtonProps;
  };
  const { children } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
};
