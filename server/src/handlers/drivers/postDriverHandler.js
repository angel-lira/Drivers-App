const postDriver = require("../../controllers/drivers/postDriver");

const postDriverHandler = async (req, res) => {
  const body = req.body;
  try {
    const driver = await postDriver(body);
    res.status(200).json(driver);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postDriverHandler;
