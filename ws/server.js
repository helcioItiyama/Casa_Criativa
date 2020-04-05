//usar o express para criar e configurar servidor
const express = require('express');
const server = express();

const db = require('./db');

//configurar arquivos estáticos (css, arquivos, imagens )
server.use(express.static('public'));

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}));

//configurar o nunjucks
//pasta views
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true,
})

//criar rota
//capturar pedido do cliente para responder
server.get('/', (req, res) => {
    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados") 
        }
        const reverseIdeas = [...rows].reverse();
        let lastIdeas = [];
        for (let idea of reverseIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }
        return res.render('index.html', {ideas: lastIdeas})
    })
})

server.get('/ideias', (req, res) => {
    //Consultar dados na tabela
    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        const reverseIdeas = [...rows].reverse();
        return res.render('ideias.html', {ideas: reverseIdeas})
    })
})

server.post('/', (req, res) => {
    //inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?, ?)
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, (err) => {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        return res.redirect('/ideias');
    })

})

//ligar servidor na porta 3000;
server.listen(3000);
