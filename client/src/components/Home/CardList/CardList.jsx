import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";
import style from "./cardList.module.css";
const CardList = (props) => {
  const filteredDrivers = useSelector((state) => state.filteredDrivers);

  const driversPerPage = 9;
  const indexFin = props.currentPage * driversPerPage;
  const indexIni = indexFin - driversPerPage;

  const data = filteredDrivers.slice(indexIni, indexFin);
  const pages = Math.ceil(filteredDrivers.length / driversPerPage);

  const nextPage = () => {
    if (props.currentPage !== pages)
      props.setCurrentPage(props.currentPage + 1);
  };

  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.containerPagination}>
          <Pagination
            data={data}
            currentPage={props.currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            pages={pages}
          />
        </div>
        <div className={style.containerCards}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((driver) => {
              return (
                <Card
                  key={driver.id}
                  id={driver.id}
                  forename={driver.forename}
                  surname={driver.surname}
                  description={driver.description}
                  image={driver.image}
                  nationality={driver.nationality}
                  dob={driver.dob}
                  teams={driver.teams}
                  autoFavorito={driver.autoFavorito}
                />
              );
            })
          ) : (
            <p>No se encontraron datos de conductores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
