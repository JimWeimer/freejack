//Here, we instantiate the 2 objects used for the game, player and dealer. Each have cards array and currentScore to keep points.
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

//Here, we want to instantiate the deck 
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

    getDeckArr: function() {
        return this.deckArr;
    },

    setDeckArr: function(deckArr2) {
        this.deckArr = deckArr2;
    }
}

//This function will take the array of the deck object, replace a "buncha" values using the for loop, and return a new array.
function shuffletheDeck() {
    let temporaryVal;
    let tempDeck = deck.getDeckArr();
    let deckSize = deck.deckArr.length;
    let randomVal;

    for(let i = 0; i < deckSize; i++) {
        temporaryVal = tempDeck[i];
        randomVal = Math.floor(Math.random() * (tempDeck.length + 1 - (0 + 1)) + 0);
        tempDeck[i] = tempDeck[randomVal];
        tempDeck[randomVal] = temporaryVal; 
    }
    deck.setDeckArr(tempDeck);
}

//From this point on, we are creating the necessary game functions that have been outlined. 
function valueOfCards(cards) {
    let cardSum = 0;
    let numAces = 0;
    //In this block, we aim to go through the array of cards and keep track of the total SUM. We have to check the rank of each
    //card in the deck. Since Blackjack views kings, queens, and jacks as being all worth 10, we check if the card at index i is either of those
    //and assign it value of 10.
    for (i = 0; i < cards.length; i++) {
        if (cards[i].rank === "K" || cards[i].rank === "Q" || cards[i].rank === "J") {
            cardSum += 10;
        }

        else if (cards[i].rank === "A") {
            cardSum += 11;
        }
        //isNaN normally checks if a variable is NOT a number, but I want the opposite (IS it a number)
        else if (!isNaN(cards[i].rank)) {
            cardSum += cards[i].rank;
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

    else {
        player.money = player.money + betAmount;
    }

}

function drawDealer() {
    //This function is somewhat similar to the hit function, except its made for the dealer. 
    //We first grab a random card, and then we need to push it to the array used for the dealer.
    let tempIndex = numberOfCards;
    let tempCards = deck.deckArr[tempIndex];
    dealer.cards.push(tempCards);
    let tempScore = valueOfCards(dealer.cards);
    dealer.currentScore = tempScore; //Here, we temporarily need the current score of the dealer. Then we grab their cards as
    //String (using json.stringify)
    let dealerCardsString = JSON.stringify(dealer.cards);
    document.getElementById("Dealer Cards").innerHTML = "Dealer's Cards: " + dealerCardsString;
    document.getElementById("Score: Dealer").innerHTML = "Score Dealer: " + tempScore;

    endGame();
    numberOfCards++;
}

function hit() {
    //Grabbing a card from the deck, and then placing it in the players cards array.
    let tempIndex = numberOfCards;
    let tempCard = deck.deckArr[tempIndex];
    player.cards.push(tempCard);
    //Finding the sum of the card values currently in hand. 
    let tempScore = valueOfCards(player.cards);
    player.currentScore = tempScore;
    let playerCardsString = JSON.stringify(player.cards);
    //Here we edit the HTML after the player has asked to hit.
    document.getElementById("Score: Player").innerHTML = "Score Player: " + tempScore;
    document.getElementById("Player Cards").innerHTML = "Player's Current Cards: " + playerCardsString;
    numberOfCards++;

    endGame();
   
}

function stand() {
    //Simple function here where the dealer is supposed to draw once the player chooses stand. Then endGame() is called
    //to check status of cards. 
    tempDealerScore = dealer.currentScore;
    while(tempDealerScore< 17) {
        drawDealer();
        tempDealerScore = dealer.currentScore;
    }
    endGame();
    
}

function newGame() {
    deck.fillDeck();
    //deck.shuffleDeck();
    shuffletheDeck(); //New method made to reduce complexity of code in the object named deck
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnHit").disabled = false;
    document.getElementById("btnStay").disabled = false;
    
    hit();
    hit();
    drawDealer();
    document.getElementById("Money").innerHTML = player.money;
    endGame();
}

//VERY important function. This essentially determines if the player loses or wins.
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
        document.getElementById("btnStart").disabled = false;
    }

    if(tempDealerScore === 21) {
        document.getElementById('msgBox').innerHTML = "Uh oh, looks like the dealer wins :(";
        makeBet(0);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }

    if(tempPlayerScore > 21) {
        document.getElementById('msgBox').innerHTML = "Sorry, your total card value is over 21. Dealer wins :(";
        makeBet(0);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }

    if(tempDealerScore > 21) {
        document.getElementById('msgBox').innerHTML = "Congratulations, dealer score is greater than 21. You win!";
        makeBet(1);
        document.getElementById("btnHit").disabled = true;
        document.getElementById("btnStay").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }

    if (tempPlayerMoney === 0) {
        document.getElementById('msgBox').innerHTML = "Sorry, you ran out of money! :((";
        //disable the buttons to play
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }
    
    //here we have to find a way to not have the player not manually keep pressing stay... possible check scores above 17 for dealer?
    //In BlackJack, if dealer has 17 then they are going to stand... keep that in mind. 
    if (tempDealerScore >= 17 && (tempPlayerScore < tempDealerScore) && tempPlayerScore < 21) {
        document.getElementById('msgBox').innerHTML = "You lost. Dealer score is higher :(";
        makeBet(0);
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }

    if (tempDealerScore >= 17 && (tempPlayerScore > tempDealerScore) && tempPlayerScore < 21) {
        document.getElementById('msgBox').innerHTML = "You win! You beat Dealer!";
        makeBet(1);
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }

    if (tempDealerScore >= 17 && (tempPlayerScore === tempDealerScore) && tempDealerScore < 21) {
        document.getElementById('msgBox').innerHTML = "You tied with the dealer! ";
        document.getElementById("btnStay").disabled = true;
        document.getElementById("btnHit").disabled = true;
        document.getElementById('Money').innerHTML = "Total Money: " + tempPlayerMoney;
        document.getElementById("btnStart").disabled = false;
    }
    
}
