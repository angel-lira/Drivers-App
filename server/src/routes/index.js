const getDriverByIdHandler = require("../handlers/drivers/getDriverByIdHandler");
const getDriversByQueryHandler = require("../handlers/drivers/getDriversByQueryHandler");
const getDriversHandler = require("../handlers/drivers/getDriversHandler");
const postDriverHandler = require("../handlers/drivers/postDriverHandler");
const getTeamsHandler = require("../handlers/teams/getTeamsHandler");
const router = require("express").Router();

router.get("/drivers", getDriversHandler);
router.get("/drivers/name", getDriversByQueryHandler);
router.get("/drivers/:id", getDriverByIdHandler);
router.get("/teams", getTeamsHandler);

router.post("/drivers", postDriverHandler);

module.exports = router;
