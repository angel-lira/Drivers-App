import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeams, setError, resetError } from "../../redux/actions";
import validation from "./validation";
import axios from "axios";
import style from "./driverCreate.module.css";
const DriverCreate = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.allTeams);
  const error = useSelector((state) => state.error);
  const drivers = useSelector((state) => state.allDrivers);

  useEffect(() => {
    dispatch(resetError());
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, []);

  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });
  const [errors, setErrors] = useState({ allConditions: false });
  const [selectedTeamValue, setSelectedTeamValue] = useState("disabled");
  const [customTeam, setCustomTeam] = useState("");

  const handleChange = (event) => {
    setNewDriver({ ...newDriver, [event.target.name]: event.target.value });
    setErrors(
      validation({ ...newDriver, [event.target.name]: event.target.value })
    );
  };

  const handleChangeImage = async (event) => {
    const url = event.target.value;
    const regex = /^(http(s)?:\/\/)?\S+\.(jpeg|jpg|png)$/i;

    const checkImageExistence = async (imageUrl) => {
      try {
        const response = await axios.head(imageUrl);

        return response.status === 200;
      } catch (error) {
        return false;
      }
    };

    if (regex.test(url)) {
      const imageExists = await checkImageExistence(url);

      if (imageExists) {
        setNewDriver({ ...newDriver, [event.target.name]: url });
        setErrors(
          validation({ ...newDriver, [event.target.name]: event.target.value })
        );
      } else {
        setErrors(
          validation({ ...newDriver, [event.target.name]: "ImageNotFound" })
        );
      }
    } else {
      setNewDriver({ ...newDriver, [event.target.name]: "" });
      setErrors(
        validation({ ...newDriver, [event.target.name]: event.target.value })
      );
    }
  };

  const handleTeamsAdd = (event) => {
    event.preventDefault();
    const selectedTeam = selectedTeamValue;

    if (selectedTeam !== "disabled") {
      if (newDriver.teams) {
        if (!newDriver.teams.includes(selectedTeam)) {
          setNewDriver((prevState) => ({
            ...prevState,
            teams: `${prevState.teams}, ${selectedTeam}`,
          }));
          setErrors(
            validation({
              ...newDriver,
              [event.target.name]: event.target.value,
            })
          );
        } else {
          window.alert("Este Team ya ha sido agregado anteriormente");
        }
      } else {
        setNewDriver({ ...newDriver, teams: selectedTeam });
        setErrors(validation({ ...newDriver, teams: selectedTeam }));
      }
    }

    setSelectedTeamValue("disabled"); // Reiniciamos la lista de Teams
  };

  const handleCustomTeam = (event) => {
    setCustomTeam(event.target.value);
  };

  const handleCustomTeamAdd = (event) => {
    event.preventDefault();
    const team = customTeam.trim();
    if (team && !newDriver.teams.includes(team)) {
      if (newDriver.teams) {
        setNewDriver((prevState) => ({
          ...prevState,
          teams: `${prevState.teams}, ${team}`,
        }));
      } else {
        setNewDriver({ ...newDriver, teams: team });
        setErrors(validation({ ...newDriver, teams: team }));
      }
      setCustomTeam(""); // Limpiamos el valor del input
    } else {
      window.alert("Este Team ya ha sido agregado anteriormente");
      setCustomTeam("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "/drivers";

    if (
      drivers.some(
        (driver) =>
          driver.forename.toLowerCase() === newDriver.forename.toLowerCase() &&
          driver.surname.toLowerCase() === newDriver.surname.toLowerCase()
      )
    ) {
      window.alert("Ya existe un driver con este nombre y apellido");
      return; // Evitar la ejecución del resto del código
    }

    if (errors.allConditions) {
      try {
        await axios.post(endpoint, newDriver);
        setNewDriver({
          forename: "",
          surname: "",
          nationality: "",
          image: "",
          dob: "",
          description: "",
          teams: "",
        });
        document.getElementById("imageUrlInput").value = "";
      } catch (error) {
        dispatch(setError(error.message));
      }
    } else {
      window.alert("Debe llenar todos los inputs");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.containerOther}>
        <p style={{ color: "red" }}>{error ? error : "\u00A0"}</p>
        <form className={style.form}>
          <div className={style.formAntesDentro}>
            <div className={style.formDentro}>
              <div>
                <label>Nombre: </label>
                <input
                  type="text"
                  name="forename"
                  value={newDriver.forename}
                  onChange={handleChange}
                />
              </div>
              <p>{errors.forename ? errors.forename : "\u00A0"}</p>

              <div>
                <label>Apellido: </label>
                <input
                  type="text"
                  name="surname"
                  value={newDriver.surname}
                  onChange={handleChange}
                />
              </div>
              <p>{errors.surname ? errors.surname : "\u00A0"}</p>

              <div>
                <label>Nacionalidad: </label>
                <input
                  type="text"
                  name="nationality"
                  value={newDriver.nationality}
                  onChange={handleChange}
                />
              </div>
              <p>{errors.nationality ? errors.nationality : "\u00A0"}</p>

              <div>
                <label>Fecha de Nacimiento: </label>
                <input
                  type="date"
                  name="dob"
                  value={newDriver.dob}
                  onChange={handleChange}
                />
              </div>
              <p>{errors.dob ? errors.dob : "\u00A0"}</p>

              <div></div>
              <label className={style.labelDescription}>Descripcion</label>
              <textarea
                className={style.inputDescription}
                name="description"
                value={newDriver.description}
                onChange={handleChange}
              />
              <p>{errors.description ? errors.description : "\u00A0"}</p>
            </div>
            <div className={style.formDentro}>
              <div>
                <label>Imagen: </label>
                <input
                  type="url"
                  name="image"
                  onChange={handleChangeImage}
                  id="imageUrlInput"
                />
              </div>
              <p>{errors.image ? errors.image : "\u00A0"}</p>
              {!newDriver.image || newDriver.image === "NotFound" ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1170/1170459.png"
                  alt="Pic Driver"
                />
              ) : (
                newDriver.image && (
                  <img src={newDriver.image} alt="Pic Driver" />
                )
              )}

              <div>
                <label>Select teams: </label>
                <select
                  name="teams"
                  value={selectedTeamValue}
                  onChange={(event) => setSelectedTeamValue(event.target.value)}
                >
                  <option value="disabled" style={{ fontWeight: "bold" }}>
                    Teams:
                  </option>
                  {teams &&
                    teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                </select>

                <button className={style.aDD} onClick={handleTeamsAdd}>
                  +
                </button>
              </div>

              <div>
                <label>Custom Team:</label>
                <input
                  type="text"
                  value={customTeam}
                  onChange={handleCustomTeam}
                />
                <button className={style.aDD} onClick={handleCustomTeamAdd}>
                  +
                </button>
              </div>

              <textarea value={newDriver.teams} readOnly />
              <p>{errors.teams ? errors.teams : "\u00A0"}</p>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={!errors.allConditions}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverCreate;
