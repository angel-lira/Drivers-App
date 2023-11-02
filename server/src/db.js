require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`,
//   {
//     logging: false,
//     native: false,
//   }
// );

const database = new Sequelize(DB_DEPLOY, {
  dialectModule: require("pg"),
  logging: false,
  native: false,
  ssl: {
    require: true,
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(database));

let entries = Object.entries(database.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
database.models = Object.fromEntries(capsEntries);

const { Driver, Team } = database.models;

Driver.belongsToMany(Team, { through: "DriverTeam" });
Team.belongsToMany(Driver, { through: "DriverTeam" });

module.exports = {
  ...database.models,
  conn: database,
};
