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
const numberOfCards = 0; //using this to keep number of cards pulled!
//Here, we are getting the HTML elements (byID). elements needed: hit, stand, (anything else?)

//Here, we want to instantiate the deck. 
let deck = {
    deckArr = [],

    fillDeck: function() {
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

    getDeckArr: function() {
        return this.deckArr;
    },

    setDeckArr: function(deckArr2) {
        this.deckArr = deckArr2;
    }
}

function shuffleDeck(deck) {
        let temporaryVal;
        let tempDeckArr = deck.getDeckArr();
        let deckSize = tempDeckArr.length();
        let randomVal;

        for(let i = 0; i < deckSize; i++) {
            temporaryVal = tempDeckArr[i];
            randomVal = Math.floor(Math.random() * (tempDeckArr.length+1 - (0 + 1)) + 0);
            tempDeckArr[i] = tempDeckArr[randomVal];
            tempDeckArr[randomVal] = temporaryVal; 
        }
        deck.setDeckArr(tempDeckArr);
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

function makeBet() {

}

function draw() {

}

function hit() {
    //Grabbing a card from the deck, and then placing it in the players cards array.
    let tempCard = deck.deckArr[numberOfCards];
    player.cards.push(tempCard);
    //Finding the sum of the card values currently in hand. 
    let tempScore = valueOfCards(player.cards);
    let playerCardsString = JSON.stringify(player.cards);
    //Here we edit the HTML after the player has asked to hit.
    document.getElementById("Score: Player").innerHTML = "Score Player: " + tempScore;
    document.getElementById("Player Cards").innerHTML = "Player's Current Cards: " + playerCardsString;
    numberOfCards++;


}

function stand() {
    let score = dealer.currentScore;
    while (score < 17) {
        draw();
    }
}

function newGame() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnHit").disabled = false;
    document.getElementById("btnStay").disabled = false;

    hit();
    hit();
    draw();
    endGame();
}

function endGame() {
    let tempPlayerScore = player.score;
    let tempPlayerMoney = player.money;
    let tempDealerScore = dealer.score;

    if(tempPlayerScore === 21) {
        //Player wins!
        document.getElementById("msgBox").innerHTML = "Congratulations, you win!";
        document.getElementById("Money").innerHTML = "Total Money: " + tempPlayerMoney;
        //need to reset board here somehow...
    }

    if(tempDealerScore === 21) {
        document.getElementById("msgBox").innerHTML = "Uh oh, looks like the dealer wins :(";
        //reset the board...
    }

    if(tempPlayerScore > 21) {
        document.getElementById("msgBox").innerHTML = "Sorry, your total card value is over 21. Dealer wins :(";
        //reset the board...
    }

    if(tempDealerScore > 21) {
        document.getElementById("msgBox").innerHTML = "Congratulations, dealer score is greater than 21. You win!";
        //reset the board...
    }

    if (tempPlayerMoney === 0) {
        document.getElementById("msgBox").innerHTML = "Sorry, you ran out of money! :((";
        //disable the buttons to play
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
    }
}





