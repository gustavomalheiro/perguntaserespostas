const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '123456', {
    host: 'localhost', // onde está rodando o mysql
    dialect: 'mysql' // qual tipo de bd queremos nos conectar
});

module.exports = connection;
