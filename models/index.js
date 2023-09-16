const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   host: dbConfig.HOST,
//   port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL for Heroku
      rejectUnauthorized: false, // Disabling SSL verification is not recommended for production, but this may be necessary for some Heroku configurations
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

// Our `Users` Model, we will create it in next step
db.users = require('./user.model.js')(db.connection, db.Sequelize)

module.exports = db;