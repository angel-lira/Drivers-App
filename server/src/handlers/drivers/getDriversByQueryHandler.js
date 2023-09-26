const getDriversByQuery = require("../../controllers/drivers/getDriversByQuery");

const getDriversByQueryHandler = async (req, res) => {
  const { q } = req.query;

  try {
    const drivers = await getDriversByQuery(q);
    res.status(200).json(drivers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDriversByQueryHandler;
