import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  mode: "primary" | "secondary";
  label: string;
  type?: "submit";
  onClick?: () => void;
  className: string;
}
const Button = ({ mode, label, className, ...props }: ButtonProps) => {
  const { button } = styles;
  return (
    <button className={`${button} ${className}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
