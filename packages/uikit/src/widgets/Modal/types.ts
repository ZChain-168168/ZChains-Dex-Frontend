import { BoxProps } from "../../components/Box";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export type HandlerArgs = (args?: any) => void;
export interface InjectedProps {
  dataModal?: any;
  onDismiss?: Handler;
  mode?: string;
}

export interface ModalWrapperProps extends InjectedProps, Omit<BoxProps, "title"> {
  hideCloseButton?: boolean;
}

export interface ModalProps extends ModalWrapperProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
}
