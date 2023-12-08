import { SpaceProps, TypographyProps, LayoutProps } from "styled-system";

export interface TextGradientProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  bold?: boolean;
  small?: boolean;
  ellipsis?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}
