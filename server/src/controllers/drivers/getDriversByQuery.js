const axios = require("axios");
const { Driver, Team } = require("../../db");
const { Op } = require("sequelize");

// Función para quitar acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const getDriversByQuery = async (query) => {
  const url = "http://localhost:5000/drivers";
  const noImage =
    "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

  const searchName = removeAccents(query.toLowerCase());

  // Se consulta en la base de datos local
  const dbDrivers = await Driver.findAll({
    where: {
      forename: {
        [Op.iLike]: `%${searchName}%`,
      },
    },
    limit: 15,
    include: [
      {
        model: Team,
        through: "DriverTeam",
        attributes: ["name"], // Obtenemos solo el atributo "name" de la relación Teams
      },
    ],
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

  const apiDriversFilter = response.data.filter((driver) => {
    const driverName = removeAccents(driver.name.forename.toLowerCase());
    return driverName.includes(searchName);
  });
  const apiDrivers = apiDriversFilter.map((driver) => {
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
  const combinedDrivers = [...formattedDbDrivers, ...apiDrivers];

  if (combinedDrivers.length === 0) {
    throw new Error(`No se encontro el conductor: ${query}`);
  }

  const limitedDrivers = combinedDrivers.slice(0, 15);

  return limitedDrivers;
};

module.exports = getDriversByQuery;
