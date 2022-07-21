import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  type: string;
  placeholder: string;
  required?: boolean;
}
const Input = ({ type, placeholder, ...props }: InputProps) => {
  const { input } = styles;
  return (
    <input
      className={input}
      type={"email"}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
