const express = require("express");
const app = express();

//estou dizendo para o express utilizar o EJS como View Engine
app.set("view engine","ejs");
app.use(express.static('public')) //express quer usar alguma coisa


// criando rotas
/* rota padrão */
app.get("/", (req, res) => { // estou pegando a informação que o usuário digitar
    res.render("index");
});

// criando a página de cadastro de perguntas
app.get("/perguntar", (req, res) => {
    res.render("perguntar"); // renderizando um html (mais especificamente, a view perguntar)
});

// rodando a aplicação
app.listen(8080, () => {
    console.log("App rodando!");
});