import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDrivers,
  getTeams,
  searchDrivers,
  orderDrivers,
  filterOrigin,
  filterTeams,
  resetFilterOrder,
} from "../../redux/actions";
import CardList from "./CardList/CardList";
import style from "./home.module.css";
const Home = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.allTeams);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getDrivers());
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, []);

  // ORDER
  const [selectedOrder, setSelectedOrder] = useState("");
  const handleOrder = (event) => {
    setSelectedOrder(event.target.value);
    dispatch(orderDrivers(event.target.value));
  };

  // FILTER_TEAMS
  const [selectedTeam, setSelectedTeam] = useState("");
  const handleFilterTeams = (event) => {
    setCurrentPage(1);
    setSelectedTeam(event.target.value);
    dispatch(filterTeams(event.target.value));
  };

  // FILTER_ORIGIN
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const handleFilterOrigin = (event) => {
    setCurrentPage(1);
    setSelectedOrigin(event.target.value);
    dispatch(filterOrigin(event.target.value));
  };

  // RESET
  const handleReset = () => {
    setCurrentPage(1);
    setSelectedOrder("");
    setSelectedTeam("");
    setSelectedOrigin("");
    dispatch(resetFilterOrder());
  };

  // SEARCH_DRIVERS
  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearch("");
    dispatch(searchDrivers(search));
  };

  // PAGINADO
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={style.container}>
      {/* ORDER */}
      <select value={selectedOrder} onChange={handleOrder}>
        <option value="disabled" style={{ fontWeight: "bold" }}>
          Order:
        </option>
        <option value="a">Ascending</option>
        <option value="d">Descending</option>
        <option value="dobA">Date of Birth (Asc)</option>
        <option value="dobB">Date of Birth (Desc)</option>
      </select>
      {/* FILTER_TEAMS */}
      <select value={selectedTeam} onChange={handleFilterTeams}>
        <option value="disabled" style={{ fontWeight: "bold" }}>
          Teams:
        </option>
        {teams &&
          teams.map((team) => {
            return (
              <option key={team} value={team}>
                {team}
              </option>
            );
          })}
      </select>
      {/* FILTER_ORIGIN */}
      <select value={selectedOrigin} onChange={handleFilterOrigin}>
        <option value="disabled" style={{ fontWeight: "bold" }}>
          Filter by Origin:
        </option>
        <option value="db">Created Drivers</option>
        <option value="api">Default Drivers</option>
      </select>
      {/* RESET */}
      <button onClick={handleReset}>RESET</button>
      {/* SEARCH_DRIVERS */}
      <input type="search" value={search} onChange={handleChangeSearch} />
      <button onClick={handleSearch}>Search</button>

      {error ? <p>{error}</p> : null}

      <CardList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
