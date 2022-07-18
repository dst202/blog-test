import React from "react";
import styles from "./layout.module.scss";

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper = ({ children }: IWrapper) => {
  const { wrapper } = styles;
  return <div className={wrapper}>{children}</div>;
};

export default Wrapper;
