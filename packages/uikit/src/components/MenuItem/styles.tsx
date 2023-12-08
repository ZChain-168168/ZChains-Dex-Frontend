import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ theme, $isActive }) => ($isActive ? "#fff" : theme.colors.primary)};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "500" : "400")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "inherit")};
  ${({ $variant }) => $variant === "default" && "border-radius: 10px;"};
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : "unset")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `&:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 30px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
    ${({ $variant }) => $variant === "default" && "border-radius: 10px;"};
  }

  svg {
    fill: ${({ theme, $isActive }) => ($isActive ? "#fff" : theme.colors.primary)};
    &:hover {
      fill: #fff;
    }
  }
`;

export default StyledMenuItem;
