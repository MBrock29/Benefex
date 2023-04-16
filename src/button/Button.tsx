import s from "./Button.module.scss";

export interface ButtonProps {
  variant?: string;
  handleClick?: () => void;
  text: string;
  disabled?: boolean;
  width?: string;
}

export const Button = (props: ButtonProps) => {
  const { variant, handleClick, text, disabled, width } = props;
  const buttonStyle = width ? { width } : undefined;

  switch (variant) {
    case "secondary":
      return (
        <button
          className={s.secondary}
          onClick={handleClick}
          disabled={disabled}
          style={buttonStyle}
        >
          {text ? text : "Click here"}
        </button>
      );
    default:
      return (
        <button
          className={s.primary}
          onClick={handleClick}
          disabled={disabled}
          style={buttonStyle}
        >
          {text ? text : "Click here"}
        </button>
      );
  }
};
