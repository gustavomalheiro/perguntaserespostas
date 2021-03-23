const express = require("express");
const app = express();
const connection = require("./database/database.js");
const Pergunta = require("./database/Perguntas")

//Database

connection
    .authenticate() // vai tentar logar no mysql
    .then(() => {
        console.log("Conexão feita com o banco de dados!") // se a conexão for um sucesso, quem será executado será o then
    })
    .catch((msgErro) => {
        console.log(msgErro) // caso o contrário, será o catch
    })

//estou dizendo para o express utilizar o EJS como View Engine
app.set("view engine","ejs");
app.use(express.static('public')) //express quer usar alguma coisa

// configurando o express para ler os dados enviados para o formulario (disponibilizar o objeto body)
app.use(express.urlencoded({extended: false})) // esse comando permite com que a pessoa envie esses dados pelo formulário e seja traduzido para que possamos
// usar aqui no nosso backend

// isso aqui permite com que leiamos dados de formulários enviados via json
app.use(express.json());

// criando rotas
/* rota padrão */
app.get("/", (req, res) => { // estou pegando a informação que o usuário digitar *
    Pergunta.findAll({ raw: true}).then(perguntas => { // método do sequelize responsável por procurar todas as perguntas e nos retornar. Ele equivale a um select no banco
    // raw significa que só queremos os dados e nada mais
        console.log(perguntas) // se exibido, provará que as perguntas foram recebidas (opcional)

        // colocando o render dentro do then do método findAll, podemos renderizar apenas se os dados estiverem sendo recebidos.
        res.render("index", {
            perguntas: perguntas // estou criando uma variável perguntas, que recebe as perguntas do banco de dados, possibilitando que as usemos no nosso frontend na view index.
        });

    }); // esse then vai fazer com que, caso as perguntas sejam recebidas pelo método findAll, elas sejam colocadas dentro da variável 'perguntas', e desta forma
    // as receberemos 
});

// criando a página de cadastro de perguntas
app.get("/perguntar", (req, res) => {
    res.render("perguntar"); // renderizando um html (mais especificamente, a view perguntar)
});

// rota para receber dados do formulário
app.post("/salvarpergunta", (req, res) => { // o formulário trabalha com POST, então a rota também deve ser post.

    let titulo = req.body.titulo; // uma variável para receber o título vindo do body
    let descricao = req.body.descricao; // uma variável para receber a decricao vinda do body

    // salvando perguntas que foram enviadas para a rota
    Pergunta.create({ // método equivalente a um insert no banco
        titulo: titulo,
        descricao: descricao
    }).then(() => { // agora colocaremos o que queremos fazer após a pergunta ser salva no banco
        res.redirect("/"); // apenas a barra, significando que eu quero redirecionar para minha página principal após fazer a pergunta
    });
    
});

// rodando a aplicação
app.listen(8080, () => {
    console.log("App rodando!");
});