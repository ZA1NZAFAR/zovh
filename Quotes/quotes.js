var quotes = [];

// Read the CSV file and store the quotes in the quotes array
var xhr = new XMLHttpRequest();
xhr.open("GET", "Quotes.csv", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var lines = xhr.responseText.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var quote = lines[i].split(";");
            quotes.push({
                text: quote[0], author: quote[1], genre: quote[2]
            });
        }
    }
};
xhr.send();

// Get a random quote from the quotes array
function getRandomQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Display the random quote along with its author in the next line
let quote = getRandomQuote();
document.getElementById("quoteId").innerHTML = quote.text + "<br><br>" + quote.author;

// quotes.js
const text = document.querySelector('#quoteId');

anime.timeline({loop: true})
    .add({
        targets: text, opacity: [0, 1], easing: "easeInOutQuad", duration: 2000,
    })
    .add({
        targets: text, opacity: [1, 1], easing: "easeInOutQuad", duration: 5000,
    })
    .add({
        targets: text, opacity: [1, 0], easing: "easeInOutQuad", duration: 2000, complete: function () {
            location.reload();
        }
    });



