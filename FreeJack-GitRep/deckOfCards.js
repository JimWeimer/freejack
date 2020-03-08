const numberOfCards = 0;
//Here, we instantiate the 2 objects used for the game, player and dealer.
let player = {
    cards: [],
    money: 50,
    currentScore: 0
};

let dealer = {
    cards: [],
    currentScore: 0
};

//Here, we are getting the HTML elements (byID). elements needed: hit, stand, (anything else?)

//Here, we want to instantiate the deck. 
let deck = {
    deckArr = [],

    createDeck: function() {
        let ranks;
        let suits;
        ranks = [2,3,4,5,6,7,8,9,10,"K","Q","J","A"];
        suits = ["clubs","diamonds","hearts","spades"];

        //Here, we are creating the loop to fill the new deck with all the required cards. 
        for (let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                deckArr[s*13 + r] = { //I drew on a post by CodeAcademy which explained how to fill a deck of cards for this.
                    suit: suits[i],
                    rank: ranks[j]
                };
            }
        }
    },

    shuffleDeck: function() {
        let temporaryVal;
        let deckSize = deckArr.length;
        let randomVal;

        for(let i = 0; i < deckSize; i++) {
            temporaryVal = deckArr[i];
            randomVal = Math.floor(Math.random() * (deckArr.length+1 - (0 + 1)) + 0);
            deckArr[i] = deckArr[randomVal];
            deckArr[randomVal] = temporaryVal; 
        }
    }
}
//Here, we create the necessary game functions.

function valueOfCards(cards) {
    let cardSum = 0;
    let numAces;
    //In this block, we aim to go through the array of cards and keep track of the total SUM. We have to check the rank of each
    //card in the deck. Since Blackjack views kings, queens, and jacks as being all worth 10, we check if the card at index i is either of those
    //and assign it value of 10.
    for (i = 0; i < cards.length; i += 1) {
        if (cards[i].rank === "K" || cards[i].rank === "Q" || cards[i].rank === "J") {
            cardSum += 10;
        }

        if (cards[i].rank === "A") {
            cardSum += 11;
        }

        else {
            cardSum += cards[i].rank
        }
    }
//Aces are dealt with in a different fashion. We keep track of the number of aces in a previous if statement, and then at the end,
//we use this while loop to keep track of the number of aces left. For each ace, now we subtract 10 IF the player total is > 21. 
while (numAces >= 1) {
    if (sum > 21) {
        cardSum = cardSum - 10;
        numAces = numAces - 1;
    }
  }
}

function bet() {

}

function drawDealer() {

}

function endGame() {

}

function newGame() {

}

function hit() {

}

function stand() {

}

function reset() {

}





