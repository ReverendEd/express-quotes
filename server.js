console.log('server.js is working');
const express = require('express');
const app = express();
const port = 5000;


app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('listening on '+port);
});

let quotes = [{
    quote: 'make it so',
    author: 'Picard'
  },{
    quote: 'want a peanut',
    author: 'vizzini'
  },{
    quote: 'life is like a box of chocolates',
    author: 'forest gump'
  }
  ];

app.get('/quotes', function(req, res){
    res.send(quotes);
});

app.get('/random', function(req, res){
    res.send(randomQuotes());
});
// app.post('/submitquotes'),{
//     quote: 
// }

function randomQuotes(){
    let randomNum = Math.floor(Math.random()*3)+1;
    return quotes[randomNum];
}










module.exports = quotes;