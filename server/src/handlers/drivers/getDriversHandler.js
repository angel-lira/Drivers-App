const getDrivers = require("../../controllers/drivers/getDrivers");

const getDriversHandler = async (req, res) => {
  try {
    const drivers = await getDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDriversHandler;
