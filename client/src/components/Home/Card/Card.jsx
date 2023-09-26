import { Link } from "react-router-dom";
import style from "./card.module.css";
const Card = (props) => {
  return (
    <div className={style.container}>
      <h4>{`${props.forename} ${props.surname}`}</h4>

      <p style={{ overflowY: "auto", wordWrap: "break-word" }}>{props.teams}</p>

      <Link to={`/detail/${props.id}`}>
        <img
          src={props.image}
          alt={`${props.forename} ${props.surname}`}
          width="240"
        />
      </Link>
    </div>
  );
};

export default Card;
