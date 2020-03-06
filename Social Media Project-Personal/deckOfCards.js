const fetch = require("node-fetch");
let deck;
let player = [];
let dealer = [];


    fetch('https://deckofcardsapi.com/api/deck/new/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        this.deck = data.deck_id;
        console.log(data.deck_id);
    });
    




