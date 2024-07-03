import s from "./wrapper.module.scss";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default Wrapper;
