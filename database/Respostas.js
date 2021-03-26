const Sequelize = require("sequelize"); // sequelize
const connection = require("./database"); // código de conexão com o banco

const Respostas = connection.define("respostas", { // nome da tabela será respostas
    corpo: { // campo corpo, onde a resposta será escrita
        type: Sequelize.TEXT,
        allowNull: false // não permite que ele seja vazio
    },
    perguntaId: { // o id da pergunta que está sendo respondida, para linkar de alguma forma (relacionando uma tabela com a outra)
        type: Sequelize.INTEGER, 
        allowNull: false // NUNCA pode ser vazio
    }
});

Respostas.sync({force: false}); // force: false = impede que a tabela seja recriada caso exista

module.exports = Respostas; // exportando para poder utilizar esse model fora desse arquivo