console.log('client.js is working');

class Quote{
    constructor(quote, author, picture){
        this.quote = quote;
        this.author = author;
        this.picture = picture;
    }
}

$(document).ready(pageReady);

function pageReady() {
    console.log('jq is working');
    clickHandler();
}

function clickHandler(){
    $('#quotesbutton').on('click', retrieveQuotes);
    $('#buttonIDsubmitquote').on('click', submitQuote);
    $('#randomquote').on('click', randomQuote);
}

function retrieveQuotes(){
    $('#forquotes').empty();
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
        $row = $('<tr></tr>');
        $row.append('<th>'+quoteList[i].quote+'</th>');
        $row.append('<th>'+quoteList[i].author+'</th>');
        $row.append('<th><img src="'+quoteList[i].picture+'" alt=""></th>')
        $('#forquotes').append($row);
    }
}

function submitQuote(){
    console.log('in submitQuotes');
    if ($('#inputIDquote').val()!='' && $('#inputIDauthor').val()!='') {
        let submittedQuote = new Quote($('#inputIDquote').val(), $('#inputIDauthor').val(), $('#inputIDpicture').val());
        $.ajax({
            url: '/submitquotes',
            type: 'POST',
            data: submittedQuote
        }).done(function(response){
            console.log(response);
            retrieveQuotes(response);
        }).fail(function(errorMessage){
            console.log('in errorMessage');
            alert('your quotes could not be submitted! isnt that an awful feeling? .'+ errorMessage.status);
        })
        clearInputs();
    }
    else{
        alert('you havent filled out all the inputs. what did you expect would happen?');
    }
}

function randomQuote(){
    $('#forquotes').empty();
    console.log('in randomQuote');
    let $row = $('<tr></tr>')
    $.ajax({
        url: '/random',
        type: 'GET'
    }).done(function(response){
        console.log(response);
        $row.append('<th>'+response.quote+'</th>');
        $row.append('<th>'+response.author+'</th>');
        $row.append('<th><img src="'+response.picture+'" alt=""></th>')
        $('#forquotes').append($row);
    }).fail(function(errorMessage){
        console.log('in errorMessage');
        alert('your quote could not be generated! Im sure something will happen eventually if u just wait...'+errorMessage.status);
    })
}

function clearInputs(){
    $('#inputIDquote').val('');
    $('#inputIDauthor').val('');
    $('#inputIDpicture').val('');
}