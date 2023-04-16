import s from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={s.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
