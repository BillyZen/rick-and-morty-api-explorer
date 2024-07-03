import s from "./popup.module.scss";
import { BiSolidCommentError } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import { FaWindowClose } from "react-icons/fa";
import Button from "../Button";
import { createPortal } from "react-dom";
import { PopUpProps } from "../../../utils/type-definitions";

const PopUp: React.FC<PopUpProps> = ({
  message,
  setMessage,
  isError,
  isChecker = false,
  callback,
  hasLogout = false,
  isClosable = false,
}) => {
  const logoutUrl = "";
  if (typeof document !== "undefined") {
    return createPortal(
      <dialog open className={s.popup}>
        {!hasLogout && (
          <>
            <div className={s.popupTop}>
              <p>
                {isError
                  ? "Something went wrong..."
                  : isChecker
                  ? "It will be deleted forever..."
                  : "Success!"}
              </p>
              {isError ? (
                <BiSolidCommentError className={s.icon} />
              ) : isChecker ? (
                ""
              ) : (
                <GrStatusGood className={s.icon} />
              )}
              {!isError && (
                <FaWindowClose
                  className={s.close}
                  onClick={() => {
                    setMessage && setMessage(undefined);
                  }}
                />
              )}
            </div>

            <div className={s.line} />
          </>
        )}
        <div className={s.popupMiddle}>
          <p>{message}</p>
        </div>
        <div className={s.line} />
        <div className={s.popupbottom}>
          {isChecker && (
            <Button
              label={"Yes"}
              className={s.clickBack}
              onClick={() => {
                callback && callback();
                setMessage && setMessage(undefined);
              }}
            />
          )}
          {!hasLogout && isError && !isClosable && (
            <Button
              label={"Return home"}
              className={s.clickBack}
              onClick={() => {
                window.location.assign("/");
              }}
            />
          )}
          {isClosable && (
            <Button
              label={"Close"}
              className={s.clickBack}
              onClick={() => {
                setMessage && setMessage(undefined);
              }}
            />
          )}
          {hasLogout && (
            <a href={logoutUrl} className={s.logoutLink}>
              <Button label={"Log Out"} className={s.clickBack} />
            </a>
          )}
        </div>
      </dialog>,
      document?.body
    );
  }
  return <></>;
};

export default PopUp;
