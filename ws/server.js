//usar o express para criar e configurar servidor
const express = require('express');
const server = express();

//configurar arquivos estáticos (css, arquivos, imagens )
server.use(express.static('public'));

const ideas = [
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        title: 'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia ea architecto quos et! Necessitatibus consequatur nisi excepturi reprehenderit obcaecati accusantium cum quaerat! Iste harum tempora consequatur sed! Distinctio, libero',
        url: 'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        title:'Exercícios',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia ea architecto quos et! Necessitatibus consequatur nisi excepturi reprehenderit obcaecati accusantium cum quaerat! Iste harum tempora consequatur sed! Distinctio, libero.',
        url:'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        title: 'Meditação',
        category: 'Mentalidade',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia ea architecto quos et! Necessitatibus consequatur nisi excepturi reprehenderit obcaecati accusantium cum quaerat! Iste harum tempora consequatur sed! Distinctio, libero.',
        url: 'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        title: 'Karaoke',
        category: 'Diversão em familia',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia ea architecto quos et! Necessitatibus consequatur nisi excepturi reprehenderit obcaecati accusantium cum quaerat! Iste harum tempora consequatur sed! Distinctio, libero.',
        url: 'https://rocketseat.com.br'
    }
];

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
    const reverseIdeas = [...ideas].reverse();
    let lastIdeas = [];
    for (let idea of reverseIdeas) {
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea);
        }
    }
    return res.render('index.html', {ideas: lastIdeas})
})

server.get('/ideias', (req, res) => { 
    const reverseIdeas = [...ideas].reverse();
    return res.render('ideias.html', {ideas: reverseIdeas})
})

//ligar servidor na porta 3000;
server.listen(3000);
