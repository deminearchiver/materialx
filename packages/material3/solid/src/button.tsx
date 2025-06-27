import { splitProps, type Component, type JSX } from "solid-js";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  label: JSX.Element;
};

export const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["icon", "label"]);
  return (
    <button {...others}>
      {local.label}
      {props.icon}
    </button>
  );
};
