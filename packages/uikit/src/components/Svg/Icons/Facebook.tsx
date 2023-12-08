import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 12.5125C24 5.8719 18.624 0.482422 12 0.482422C5.376 0.482422 0 5.8719 0 12.5125C0 18.3351 4.128 23.1832 9.6 24.302V16.1215H7.2V12.5125H9.6V9.50498C9.6 7.18317 11.484 5.29445 13.8 5.29445H16.8V8.90347H14.4C13.74 8.90347 13.2 9.44483 13.2 10.1065V12.5125H16.8V16.1215H13.2V24.4824C19.26 23.8809 24 18.7561 24 12.5125Z" fill="#E6E6E6"/>
    </Svg>
  );
};

export default Icon;
