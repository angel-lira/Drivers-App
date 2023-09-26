const getTeams = require("../../controllers/teams/getTeams");

const getTeamsHandler = async (req, res) => {
  try {
    const teams = await getTeams();
    res.status(200).json(teams);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getTeamsHandler;
