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
    let betAmount = document.getElementById("playerBet").value;

    //Here, we are going to see if the user passed in a 1 (win) or 0 (loss).
    if (result === 0) {
        player.money = player.money - betAmount;
        
    }

    else {
        player.money = player.money + betAmount;
        
    }

    displayMoney();
    
}

function drawDealer() {
    //This function is somewhat similar to the hit function, except its made for the dealer. 
    //We first grab a random card, and then we need to push it to the array used for the dealer.
    let tempIndex = numberOfCards;
    let tempCards = deck.deckArr[tempIndex];
    dealer.cards.push(tempCards);
    /* let testCard = {
        suit: "clubs",
        rank: 2
    };
    dealer.cards.push(testCard); */
    let tempScore = valueOfCards(dealer.cards);
    dealer.currentScore = tempScore; //Here, we temporarily need the current score of the dealer. Then we grab their cards as
    //String (using json.stringify)
    let dealerCardsString = JSON.stringify(dealer.cards);
    document.getElementById("Dealer Cards").innerHTML = "Dealer's Cards: " + dealerCardsString;
    document.getElementById("Score: Dealer").innerHTML = "Score Dealer: " + tempScore;
    let dealerCheck = true;
    for(let i = 0; i < dealer.cards.length; i++) {
        drawCardImage(dealer.cards[i],i,dealerCheck);
    } 
    endGame();
    numberOfCards++;
}

//This function checks what kind of card is passed to it, and it will then displa it on the corresponding canvas element.
//We also pass the i from a for loop so that we can display coordinates dynamically, and then we check if we are feeding the function
//with the cards from the dealer's hand (or players hand)
function drawCardImage(card, i, dealerCheck) {
    if(dealerCheck === true) { 
        var dealerCanvas = document.getElementById('dealerCanvas');
        var context = dealerCanvas.getContext('2d');
    }
    else {
        var dealerCanvas = document.getElementById('playerCanvas');
        var context = dealerCanvas.getContext('2d');
    }

    let currentCard = new Image();
        //Here we want the card images to display.
        if (context) {
            //for(let i = 0; i < tempCards.length; i++) {
                currentCard.onload = function() {
                    context.drawImage(currentCard, (i*110), 0,100,100);
                }

                if(card.suit === "clubs" && card.rank === 10) {
                    currentCard.src = 'https://i.postimg.cc/zDPtgj9L/10C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 10) {
                    currentCard.src = 'https://i.postimg.cc/cHFDTMCb/10D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 10) {
                    currentCard.src = 'https://i.postimg.cc/tJ7BcZVC/10H.jpg';
                }

                if(card.suit === "spades" && card.rank === 10) {
                    currentCard.src = 'https://i.postimg.cc/6QLb4NXw/10S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 2) {
                    currentCard.src = 'https://i.postimg.cc/j2KsQTWX/2C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 2) {
                    currentCard.src = 'https://i.postimg.cc/zXxJW9qC/2D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 2) {
                    currentCard.src = 'https://i.postimg.cc/nhMn10L6/2H.jpg';
                }

                if(card.suit === "spades" && card.rank === 2) {
                    currentCard.src = 'https://i.postimg.cc/Kcrcc1Vs/2S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 3) {
                    currentCard.src = 'https://i.postimg.cc/63VKQPHG/3C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 3) {
                    currentCard.src = 'https://i.postimg.cc/jj7Kp2Pc/3D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 3) {
                    currentCard.src = 'https://i.postimg.cc/C1pYS04g/3H.jpg';
                }

                if(card.suit === "spades" && card.rank === 3) {
                    currentCard.src = 'https://i.postimg.cc/jdxxDsYq/3S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 4) {
                    currentCard.src = 'https://i.postimg.cc/7hmy32rH/4C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 4) {
                    currentCard.src = 'https://i.postimg.cc/9XpV5vR6/4D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 4) {
                    currentCard.src = 'https://i.postimg.cc/02XsrDCZ/4H.jpg';
                }

                
                if(card.suit === "spades" && card.rank === 4) {
                    currentCard.src = 'https://i.postimg.cc/fTRswBYJ/4S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 5) {
                    currentCard.src = 'https://i.postimg.cc/sgtC4zqh/5C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 5) {
                    currentCard.src = 'https://i.postimg.cc/tTb085XR/5D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 5) {
                    currentCard.src = 'https://i.postimg.cc/9fZ5xSHN/5H.jpg';
                }

                if(card.suit === "spades" && card.rank === 5) {
                    currentCard.src = 'https://i.postimg.cc/zGL1hvtN/5S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 6) {
                    currentCard.src = 'https://i.postimg.cc/GtMZ8nv9/6C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 6) {
                    currentCard.src = 'https://i.postimg.cc/bJRXPtJx/6D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 6) {
                    currentCard.src = 'https://i.postimg.cc/nV08wBNZ/6H.jpg';
                }

                if(card.suit === "spades" && card.rank === 6) {
                    currentCard.src = 'https://i.postimg.cc/vT8JZZgp/6S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 7) {
                    currentCard.src = 'https://i.postimg.cc/xT4w9Y04/7C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 7) {
                    currentCard.src = 'https://i.postimg.cc/t4nLTfJC/7D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 7) {
                    currentCard.src = 'https://i.postimg.cc/MGkgjDf0/7H.jpg';
                }

                if(card.suit === "spades" && card.rank === 7) {
                    currentCard.src = 'https://i.postimg.cc/QxCLLVr7/7S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 8) {
                    currentCard.src = 'https://i.postimg.cc/2y5tf9gY/8C.jpg';
                }

                
                if(card.suit === "diamonds" && card.rank === 8) {
                    currentCard.src = 'https://i.postimg.cc/85N3ZzHj/8D.jpg';
                }

                
                if(card.suit === "hearts" && card.rank === 8) {
                    currentCard.src = 'https://i.postimg.cc/C172XpPJ/8H.jpg';
                }

                
                if(card.suit === "spades" && card.rank === 8) {
                    currentCard.src = 'https://i.postimg.cc/8Ch9d6L2/8S.jpg';
                }

                if(card.suit === "clubs" && card.rank === 9) {
                    currentCard.src = 'https://i.postimg.cc/P5DRhwVC/9C.jpg';
                }

                if(card.suit === "diamonds" && card.rank === 9) {
                    currentCard.src = 'https://i.postimg.cc/dtLfHX8m/9D.jpg';
                }

                if(card.suit === "hearts" && card.rank === 9) {
                    currentCard.src = 'https://i.postimg.cc/VLpV3Rgy/9H.jpg';
                }

                if(card.suit === "spades" && card.rank === 9) {
                    currentCard.src = 'https://i.postimg.cc/j2kFqQr7/9S.jpg';
                }

                if(card.suit === "diamonds" && card.rank === "A") {
                    currentCard.src = 'https://i.postimg.cc/FsdPgS4T/AD.jpg';
                }

                if(card.suit === "hearts" && card.rank === "A") {
                    currentCard.src = 'https://i.postimg.cc/VLxK7Nsm/AH.jpg';
                }

                if(card.suit === "spades" && card.rank === "A") {
                    currentCard.src = 'https://i.postimg.cc/wjD0nd3J/AS.jpg';
                }

                if(card.suit === "clubs" && card.rank === "A") {
                    currentCard.src = 'https://i.postimg.cc/pr7sMWDQ/AC.jpg';
                }

                if(card.suit === "clubs" && card.rank === "J") {
                    currentCard.src = 'https://i.postimg.cc/TYD9WXVS/JC.jpg';
                }

                if(card.suit === "diamonds" && card.rank === "J") {
                    currentCard.src = 'https://i.postimg.cc/jSYhHkvj/JD.jpg';
                }

                if(card.suit === "hearts" && card.rank === "J") {
                    currentCard.src = 'https://i.postimg.cc/zGwF0SPF/JH.jpg';
                }

                if(card.suit === "spades" && card.rank === "J") {
                    currentCard.src = 'https://i.postimg.cc/wvrX7W7g/JS.jpg';
                }

                if(card.suit === "clubs" && card.rank === "K") {
                    currentCard.src = 'https://i.postimg.cc/mhf7StYn/KC.jpg';
                }

                if(card.suit === "diamonds" && card.rank === "K") {
                    currentCard.src = 'https://i.postimg.cc/0563ZFGG/KD.jpg';
                }

                if(card.suit === "hearts" && card.rank === "K") {
                    currentCard.src = 'https://i.postimg.cc/HsXN1MhV/KH.jpg';
                }

                if(card.suit === "spades" && card.rank === "K") {
                    currentCard.src = 'https://i.postimg.cc/76jKpP13/KS.jpg';
                }

                if(card.suit === "clubs" && card.rank === "Q") {
                    currentCard.src = 'https://i.postimg.cc/hvx2gFMH/QC.jpg';
                }

                if(card.suit === "diamonds" && card.rank === "Q") {
                    currentCard.src = 'https://i.postimg.cc/y6SQ09Bv/QD.jpg';
                }

                if(card.suit === "hearts" && card.rank === "Q") {
                    currentCard.src = 'https://i.postimg.cc/rFXhjmwc/QH.jpg';
                }

                if(card.suit === "spades" && card.rank === "Q") {
                    currentCard.src = 'https://i.postimg.cc/pXfs6Hmj/QS.jpg';
                }
                //}
        }
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
    //Loop through the players cards array and draw the image on playercanvas. 
    let dealerCheck = false;
    for(let i = 0; i < player.cards.length; i++) {
        drawCardImage(player.cards[i],i,dealerCheck);
    } 
    
    numberOfCards++;

    endGame();
   
    //document.getElementById('btnStart').disabled = false;
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
    
    //document.getElementById('btnStart').disabled = false;
}

function newGame() {
    deck.fillDeck();
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

function resetCardString() {
    document.getElementById("Dealer Cards").innerHTML = "";
    document.getElementById("Player Cards").innerHTML = "";
}

function displayMoney() {
    let currentMoney = player.money;
    var moneyCanvas = document.getElementById('moneyCanvas');
    var context = moneyCanvas.getContext('2d');
    let currentChip = new Image();

    currentChip.onload = function() {
        context.drawImage(currentChip, (i*90), 0,80,80);
    }
    
    if(context) {
        let i = 0;
    
        while (currentMoney >= 0) { 

            if (currentMoney % 500 === 0) {
                currentChip.src = "https://i.postimg.cc/g2gdqxmm/500Chip.jpg";
                currentMoney -= 500;
                i++;
               
            }
            else if (currentMoney % 100 === 0) {
                currentChip.src = "https://i.postimg.cc/WzqtxMpG/100Chip.jpg";
                currentMoney -= 100;
                i++;
                
            }
            else if (currentMoney % 50 === 0) {
                currentChip.src = "https://i.postimg.cc/sfMc3qvc/50Chip.jpg";
                currentMoney -= 50;
                i++;
            }

            else if (currentMoney % 25 === 0) {
                currentChip.src = "https://i.postimg.cc/zBcVddND/25Chip.jpg";
                currentMoney -= 25;
                i++;
            }

            else if (currentMoney % 10 === 0) {
                currentChip.src = "https://i.postimg.cc/fLLVjG6g/10chip.jpg";
                currentMoney -= 10;
                i++;
            }

            else if (currentMoney % 5 === 0) {
                currentChip.src = "https://i.postimg.cc/5tpHz4kC/5chip.jpg";
                currentMoney -= 5;
                i++;
            }

            else {
                currentChip.src = "https://i.postimg.cc/1zyn4nMS/1chip.jpg";
                currentMoney -= 1;
                i++;

            }
        
            
    }
   }     
}