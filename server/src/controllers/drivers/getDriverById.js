const axios = require("axios");
const { Driver, Team } = require("../../db");

const getDriversById = async (id) => {
  const url = `${
    process.env.PRODUCTION_API_URL || "http://localhost:5000"
  }/drivers`;
  const noImage =
    "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

  // Comprueba si el ID es un UUID válido
  const isUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );

  // Si es un UUID, se consulta en la base de datos local
  if (isUUID) {
    const dbDriver = await Driver.findOne({
      where: { id }, // Se busca en la base de datos local por el UUID
      include: [Team],
    });

    if (!dbDriver) {
      throw new Error(`No se encontro el conductor: ${id}`);
    }

    if (dbDriver) {
      const formattedDbDrivers = {
        id: dbDriver.id,
        forename: dbDriver.forename,
        surname: dbDriver.surname,
        description: dbDriver.description,
        image: dbDriver.image,
        nationality: dbDriver.nationality,
        dob: dbDriver.dob,
        teams: dbDriver.Teams.map((team) => team.name).join(", "),
        createInDb: dbDriver.createInDb,
      };

      return formattedDbDrivers;
    }
  }

  try {
    // Si no se encuentra en la base de datos local, se realiza la solicitud a la API
    const response = await axios.get(`${url}/${id}`);
    const data = response.data;

    const apiDrivers = {
      id: data.id,
      forename: data.name.forename,
      surname: data.name.surname,
      description: data.description || "",
      image: data.image.url || noImage,
      nationality: data.nationality,
      dob: data.dob,
      teams: data.teams,
    };

    return apiDrivers;
  } catch (error) {
    throw new Error(`No se encontro el conductor: ${id}`);
  }
};

module.exports = getDriversById;
