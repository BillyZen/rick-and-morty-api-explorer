import s from "./loader.module.scss";
import { Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const LoaderComponent = ({ isInternal }: { isInternal?: boolean }) => {
  return (
    <Loader
      incline="centered"
      size={isInternal ? "medium" : "massive"}
      active
      className={`${s.container} ${isInternal ? s.internal : ""}`}
    />
  );
};

export default LoaderComponent;
