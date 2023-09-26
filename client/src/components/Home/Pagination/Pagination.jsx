import React from "react";
import style from "./pagination.module.css";
const Pagination = (props) => {
  return (
    <div>
      <div className={style.container}>
        {Array.isArray(props.data) && props.data.length > 0 ? (
          <div className={style.pagination}>
            <button onClick={props.prevPage}>Prev</button>
            <h3>
              {props.currentPage} / {props.pages}
            </h3>
            <button onClick={props.nextPage}>Next</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
