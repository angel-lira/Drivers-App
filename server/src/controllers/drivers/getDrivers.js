const axios = require("axios");
const { Driver, Team } = require("../../db");

const getDrivers = async () => {
  const url = `${
    process.env.PRODUCTION_API_URL || "http://localhost:5000"
  }/drivers`;
  const noImage =
    "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

  // Se consulta en la base de datos local
  const dbDrivers = await Driver.findAll({
    include: [Team],
  });

  const formattedDbDrivers = dbDrivers.map((driver) => {
    return {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team) => team.name).join(", "),
      createInDb: driver.createInDb,
    };
  });

  // Se realiza la solicitud a la API
  const response = await axios.get(url);
  const apiDrivers = response.data.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description || "",
      image: driver.image.url || noImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
    };
  });

  // Combina los resultados de la base de datos y la API
  const combinedDrivers = [...formattedDbDrivers, ...apiDrivers];

  return combinedDrivers;
};

module.exports = getDrivers;
