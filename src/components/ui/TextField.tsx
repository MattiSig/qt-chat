import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import { useRef, RefObject, forwardRef } from "react";

export const TextField = forwardRef<HTMLInputElement, AriaTextFieldProps>(
  (props, ref) => {
    const { label } = props;

    const localRef = useRef<HTMLInputElement>(null);
    const actualRef = ref ? (ref as RefObject<HTMLInputElement>) : localRef;

    const { labelProps, inputProps: inputOrTextfield } = useTextField(
      props,
      ref as RefObject<HTMLInputElement>
    );

    const inputProps =
      inputOrTextfield as React.InputHTMLAttributes<HTMLInputElement>;

    return (
      <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
        <label {...labelProps}>{label}</label>
        <input {...inputProps} ref={actualRef} />
      </div>
    );
  }
);
