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
let numberOfCards = 0; //using this to keep number of cards pulled!
//Here, we are getting the HTML elements (byID). elements needed: hit, stand, newGame, (anything else?)

//Here, we want to instantiate the deck. 
var deck = {
    deckArr: [],

    fillDeck: function() {
        let ranks;
        let suits;
        ranks = [2,3,4,5,6,7,8,9,10,"K","Q","J","A"];
        suits = ["clubs","diamonds","hearts","spades"];

        //Here, we are creating the loop to fill the new deck with all the required cards. 
        for (let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.deckArr[i*13 + j] = { //I drew on a post by CodeAcademy which explained how to fill a deck of cards for this.
                    suit: suits[i],
                    rank: ranks[j]
                };
            }
        }
    },

    shuffleDeck: function() {
        let temporaryVal;
        let deckSize = this.deckArr.length;
        let randomVal;

        for(let i = 0; i < deckSize; i++) {
            temporaryVal = this.deckArr[i];
            randomVal = Math.floor(Math.random() * (this.deckArr.length+1 - (0 + 1)) + 0);
            this.deckArr[i] = this.deckArr[randomVal];
            this.deckArr[randomVal] = temporaryVal; 
        }
        let tempDeckArr = this.deckArr;
        deck.setDeckArr(tempDeckArr);
},
    getDeckArr: function() {
        return this.deckArr;
    },

    setDeckArr: function(deckArr2) {
        this.deckArr = deckArr2;
    }
}

/*
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
*/ 

//Here, we create the necessary game functions.
function valueOfCards(cards) {
    let cardSum = 0;
    let numAces = 0;
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
  return cardSum;
}

function makeBet(result) {
    let betAmount = document.getElementById("playerBet").parseInt();

    //Here, we are going to see if the user passed in a 1 (win) or 0 (loss).
    if (result === 0) {
        player.money = player.money - betAmount;
    }

    if (result === 1) {
        player.money = player.money + betAmount;
    }

}

function drawDealer() {
    //This function is somewhat similar to the hit function, except its made for the dealer. 
    //We first grab a random card, and then we need to push it to the array used for the dealer.
    let tempCards = deck.deckArr[numberOfCards];
    dealer.cards.push(tempCards);
    let tempScore = valueOfCards(dealer.cards);
    dealer.score = tempScore; //Here, we temporarily need the current score of the dealer. Then we grab their cards as
    //String (using json.stringify)
    let dealerCardsString = JSON.stringify(dealer.cards);
    document.getElementById("Dealer Cards").innerHTML = "Dealer's Cards: " + dealerCardsString;
    document.getElementById("Score: Dealer").innerHTML = "Score Dealer: " + tempScore;
    numberOfCards++;
}

function hit() {
    //Grabbing a card from the deck, and then placing it in the players cards array.
    let tempCard = deck.deckArr[numberOfCards];
    player.cards.push(tempCard);
    //Finding the sum of the card values currently in hand. 
    let tempScore = valueOfCards(player.cards);
    player.score = tempScore;
    let playerCardsString = JSON.stringify(player.cards);
    //Here we edit the HTML after the player has asked to hit.
    document.getElementById("Score: Player").innerHTML = "Score Player: " + tempScore;
    document.getElementById("Player Cards").innerHTML = "Player's Current Cards: " + playerCardsString;
    numberOfCards++;

    endGame();
}

function stand() {
    drawDealer();
    endGame();
}

function newGame() {
    /*
    let gameDiv = document.getElementById("gameBox").querySelectorAll("button");
    gameDiv[0].disabled = true;
    gameDiv[1].disabled = false;
    gameDiv[2].disabled = false; 
    */
    deck.fillDeck();
    deck.shuffleDeck();
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnHit").disabled = false;
    document.getElementById("btnStay").disabled = false;
    
    hit();
    hit();
    drawDealer();
    endGame();
}


function endGame() {
    let tempPlayerScore = player.currentScore;
    let tempPlayerMoney = player.money;
    let tempDealerScore = dealer.currentScore;

    if(tempPlayerScore === 21) {
        //Player wins!
        document.getElementById('msgBox').innerHTML = "Congratulations, you win!";
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        makeBet(1);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
    }

    if(tempDealerScore === 21) {
        document.getElementById('msgBox').innerHTML = "Uh oh, looks like the dealer wins :(";
        makeBet(0);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
    }

    if(tempPlayerScore > 21) {
        document.getElementById('msgBox').innerHTML = "Sorry, your total card value is over 21. Dealer wins :(";
        makeBet(0);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
    }

    if(tempDealerScore > 21) {
        document.getElementById('msgBox').innerHTML = "Congratulations, dealer score is greater than 21. You win!";
        makeBet(1);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
    }

    if (tempPlayerMoney === 0) {
        document.getElementById('msgBox').innerHTML = "Sorry, you ran out of money! :((";
        //disable the buttons to play
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
    }

}





