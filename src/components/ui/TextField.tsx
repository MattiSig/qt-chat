import { useTextField, AriaTextFieldOptions } from "@react-aria/textfield";
import { useRef } from "react";

export const TextField: React.FC<AriaTextFieldOptions> = (props) => {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps: inputOrTextfield } = useTextField(props, ref);

  //
  const inputProps =
    inputOrTextfield as React.InputHTMLAttributes<HTMLInputElement>;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
    </div>
  );
};
