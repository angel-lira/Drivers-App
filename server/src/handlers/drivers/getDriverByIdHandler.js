const getDriversById = require("../../controllers/drivers/getDriverById");

const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await getDriversById(id);
    res.status(200).json(driver);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDriverByIdHandler;
