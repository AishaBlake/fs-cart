const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "master-driving-speed-boat",
  host: "localhost",
  port: 5433,
  database: "aishablake",
  ssl: false
});

module.exports = credentials;