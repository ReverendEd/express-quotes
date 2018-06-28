console.log('client.js is working');

$(document).ready(pageReady);

function pageReady() {
    console.log('jq is working');
    clickHandler();
    
}

function clickHandler(){
    $('#quotesbutton').on('click', retrieveQuotes);
    $('#submitquote').on('click', submitQuote);
}

function retrieveQuotes(){
    console.log('in retrieveQuotes');
    $.ajax({
        url: '/quotes',
        type: 'GET'
    }).done(function(response){
        console.log(response);
        loopThruQuotes(response);
    }).fail(function(errorMessage){
        console.log('in errorMessage');
        alert('your quotes could not be found! feel free to panic, i promise it WILL help.'+ errorMessage.status);
    })
}

function loopThruQuotes(quoteList){
    console.log('in loopThruQuotes');
    for (let i = 0; i < quoteList.length; i++) {
        $('#forquotes').append('<li class="table">'+quoteList[i].quote+': "'+quoteList[i].author+'"</li>');
    }
}

function submitQuote(){
    console.log('in submitQuotes');
    $.post({
        url: '/submitquotes',
        type: 'POST'
    }).done(function(response){
        console.log(response);
    }).fail(function(errorMessage){
        console.log('in errorMessage');
        alert('your quotes could not be submitted! isnt that an awful feeling? .'+ errorMessage.status);
    })
}


