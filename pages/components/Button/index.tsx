import s from "./button.module.scss";
import { FaLock } from "react-icons/fa6";
import { ButtonProps } from "../../../utils/type-definitions";

const Button = ({
  size = "medium",
  color = "primary",
  label,
  className,
  isDisabled,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`${s.appButton} ${s[`btnSize${size}`]} ${
        s[`btnColor${color}`]
      } ${className ? className : ""} ${isDisabled ? s.disabled : ""}`}
      onClick={onClick}
      type={type}
    >
      {label}
      {isDisabled && <FaLock className={s.lock} />}
    </button>
  );
};

export default Button;
