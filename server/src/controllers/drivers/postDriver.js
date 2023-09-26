const { Driver, Team } = require("../../db");

const postDriver = async (body) => {
  const driver = body;

  const newDriver = await Driver.create({
    forename: driver.forename,
    surname: driver.surname,
    description: driver.description,
    image: driver.image,
    nationality: driver.nationality,
    dob: driver.dob,
  });

  const teamNames = driver.teams.split(",").map((teamName) => teamName.trim());

  // Crear un arreglo para almacenar los equipos encontrados o creados
  const teams = [];

  // Iterar a través de los nombres de los equipos
  for (const teamName of teamNames) {
    // Buscar el equipo en la base de datos o crearlo si no existe
    const [team] = await Team.findOrCreate({
      where: {
        name: teamName,
      },
    });

    // Agregar el equipo al arreglo de equipos
    teams.push(team);
  }

  // Relacionar el nuevo conductor con los equipos encontrados o creados
  await newDriver.addTeams(teams);

  return newDriver;
};

module.exports = postDriver;
