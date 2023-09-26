const axios = require("axios");
const { Team } = require("../../db");

const onlyTeams = (data) => {
  // Obtenemos solo los teams de cada driver
  const allTeams = data.map((obj) => obj.teams);

  // Validamos que no haya datos undefined en la constante. Luego, separamos cada string por "," y eliminamos espacios al inicio y final.
  const separation = allTeams
    .filter((str) => str !== undefined)
    .flatMap((str) => str.split(",").map((item) => item.trim()));

  // Eliminamos elementos repetidos
  const noRepeat = separation.filter(
    (item, index) => separation.indexOf(item) === index
  );

  // Ordenamos el array noRepeat de A a Z
  noRepeat.sort();

  return noRepeat;
};

const getTeams = async () => {
  const url = "http://localhost:5000/drivers";
  try {
    const response = await axios.get(url);
    const data = response.data;
    const drivers = onlyTeams(data);

    // Verificar si los equipos ya existen en la base de datos
    const existingTeams = await Team.findAll({
      where: {
        name: drivers,
      },
    });

    // Filtrar los equipos que no existen en la base de datos
    const teamsToCreate = drivers.filter((nameTeam) => {
      return !existingTeams.some((team) => team.name === nameTeam);
    });

    // Transformamos los string a objetos solo para los equipos que deben insertarse
    const teams = teamsToCreate.map((nameTeam) => ({ name: nameTeam }));

    if (teams.length > 0) {
      await Team.bulkCreate(teams);
    }

    return drivers;
  } catch (error) {
    throw new Error(
      `No se obtuvieron los Teams o no se logró crear en la base de datos`
    );
  }
};

module.exports = getTeams;
