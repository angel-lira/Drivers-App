import style from "./error.module.css";
const Error = () => {
  return (
    <div className={style.container}>
      <h2>
        Oops! It seems that you have lost. Return to the home page to find what
        you are looking for. Thank you!
      </h2>
    </div>
  );
};

export default Error;
