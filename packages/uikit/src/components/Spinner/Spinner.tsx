import React from "react";
import styled from "styled-components";
// import { Image } from "@pancakeswap/uikit";
import { SpinnerProps } from "./types";

const CustomSpinner = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width || "50px"};
  height: ${({ height }) => height || "50px"};
  max-width: ${({ width }) => width || "50px"};
  max-height: ${({ height }) => height || "50px"};
  position: relative;
  span {
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    display: block;
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgb(255, 139, 199);
    border-radius: 50%;
    animation: 1s linear 0s infinite normal none running BoxOverOut;
  }
  &.play_now span {
    border-color: var(--colors-primary);
  }
`;

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 128 }) => {
  return (
    <CustomSpinner className="play_now" width={size} height={size}>
      <span />
      <img
        width={size}
        height={size}
        // src="https://assets.pancakeswap.finance/web/pancake-3d-spinner-v2.gif"
        src="/logo.png"
        alt=""
      />
    </CustomSpinner>
  );
};

export default Spinner;
