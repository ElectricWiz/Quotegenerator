const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show quote
function newQuote(){
    loading();
    //Pick a random Quote from the array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //check if author is blank
    if(!quote.author){
        authorText.textContent = "Unkown";
    }
    else{
        authorText.textContent = quote.author;
    }
    //check quote length
    if(quote.text.length > 50){
        quoteText.classList.add("long-quote");
    } else{
        quoteText.classList.remove("long-quote");        
    }

    quoteText.textContent = quote.text;
    complete();
}

//Get quotes from API
async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
       
    }
}

// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();
