import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { useRef } from "react";

export const Button: React.FC<AriaButtonProps> = (props) => {
  let ref = useRef(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
};
