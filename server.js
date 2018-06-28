console.log('server.js is working');
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function(){
    console.log('listening on '+port);
});

let quotes = [{
    quote: 'make it so',
    author: 'Picard',
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Captain_Picard_Chair.jpg/220px-Captain_Picard_Chair.jpg?size=50'
  },{
    quote: 'inconceivable!',
    author: 'vizzini',
    picture: 'https://i.pinimg.com/736x/5c/c2/cf/5cc2cff2638ec5a6d9c2098630edcfb8--the-princess-bride-so-funny.jpg?size=50'
  },{
    quote: 'life is like a box of chocolates',
    author: 'forest gump',
    picture: 'http://static4.uk.businessinsider.com/image/583ed72ddd0895af198b47d0-480/forrest-gump-tom-hanks-1.jpg?size=50'
  }
  ];

app.get('/quotes', function(req, res){
    res.send(quotes);
});

app.get('/random', function(req, res){
    res.send(randomQuotes());
});

app.post('/submitquotes', function(req, res){
    quotes.push(req.body);
    res.sendStatus(201);
});

function randomQuotes(){
    let randomNum = Math.floor(Math.random()*quotes.length);
    console.log(randomNum);
    return quotes[randomNum];
}
