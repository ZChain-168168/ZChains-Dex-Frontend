import styled, { DefaultTheme } from "styled-components";
import { space, typography } from "styled-system";
import getThemeValue from "../../utils/getThemeValue";
import { TextGradientProps } from "./types";

interface ThemedProps extends TextGradientProps {
  theme: DefaultTheme; 
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(theme, `colors.${color}`, color);
};

const Text = styled.div<TextGradientProps>`
  background-image: ${getColor};
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent; 

  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  margin: auto 0;
  line-height: 120%;
  
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
  
  ${({ small }) => small && `font-size: 14px;`}
`;

Text.defaultProps = {
  color: "textGradient",
  small: false,
  fontSize: "16px",
  ellipsis: false,
};

export default Text;
