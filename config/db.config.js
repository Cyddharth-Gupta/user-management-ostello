module.exports = {
    HOST: process.env.HOST, // Usually does not need updating
    USER: process.env.USER, // This is default username
    PASSWORD: process.env.PASSWORD, // You might have to set password for this 
    DB: process.env.DB, // The DB we created in Prerequisites section
    dialect: "postgres", // to tell Sequelize that we are using PostgreSQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };