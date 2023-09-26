import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./detail.module.css";
const Detail = () => {
  const [driver, setDriver] = useState({});
  const { id } = useParams();
  const endpoint = "http://localhost:3001/drivers/";

  useEffect(() => {
    axios.get(`${endpoint}${id}`).then((response) => {
      setDriver(response.data);
    });

    return setDriver({});
  }, []);

  return (
    <div>
      <div className={style.container}>
        {Object.keys(driver).length !== 0 ? (
          <div className={style.detail}>
            <div>
              <img
                src={driver.image}
                alt={`${driver.name} ${driver.surname}`}
              />
            </div>
            <div>
              <p>
                <strong>Nombre completo:</strong>
                {"\u00A0"}
                {driver.forename} {driver.surname}
              </p>
              <p>
                <strong>Equipos:</strong>
                {"\u00A0"}
                {driver.teams}
              </p>
              <p>
                <strong>Nacionalidad:</strong>
                {"\u00A0"}
                {driver.nationality}
              </p>
              <div className={style.detailP}>
                <p>
                  <strong>Descripcion:</strong>
                  {"\u00A0"}
                  {driver.description}
                </p>
              </div>
              <p>
                <strong>Fecha de nacimiento:</strong>
                {"\u00A0"}
                {driver.dob}
              </p>
            </div>
          </div>
        ) : (
          <p>{`No se encontro el conductor: ${id}`}</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
