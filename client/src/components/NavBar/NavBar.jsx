import { Link } from "react-router-dom";
import style from "./navBar.module.css";
const NavBar = () => {
  return (
    <div>
      <div className={style.container}>
        <Link to="/home">Home</Link>
        <Link to="/create">Driver create</Link>
        <Link to="/">Log out</Link>
      </div>
    </div>
  );
};

export default NavBar;
