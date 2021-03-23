const Sequelize = require("sequelize"); // importando o sequelize
const connection = require("./database"); // importando a conexão com o banco de dados. Como está na mesma pasta, só usar ./

// definindo model (definindo tabela com sequelize)

const Pergunta = connection.define('perguntas', {
    titulo:{ // nome do campo
        type: Sequelize.STRING, // tipo dele (texto curto)
        allowNUll: false // não é permitido valor nulo nesse campo
    },
    descricao:{
        type: Sequelize.TEXT, // (texto longo)
        allowNull: false
    }
},{}); // precisamos passar um json de opções. Podemos apenas não passar, mas preferi passar para deixar claro que ele está aí.

// criando de fato a tabela no banco

Pergunta.sync({force: false}).then(() => { // o then está servindo apenas para sinalizar que a tabela foi criada (opcional)
    console.log("Tabela criada!")
}); // vai sincronizar o que está aqui com o que está no bd. Se não existir uma tabela pergunta, ele vai criar.
// o force significa que ele não vai forçar a criação da tabela caso ela já exista.
