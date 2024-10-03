document.addEventListener("DOMContentLoaded", function() {
    let player = {
        name: "Per",
        chips: 200
    }
   
    let cards = []
    let sum = 0
    let hasBlackJack = false
    let isAlive = false
    let message = ""
    let messageEl = document.getElementById("message-el")
    let sumEl = document.getElementById("sum-el")
    let cardsEl = document.getElementById("cards-el")
    let playerEl = document.getElementById("player-el")
    let aceInputEl = null; // Placeholder for Ace input element

    playerEl.textContent = player.name + ": $" + player.chips

    function getRandomCard() {
        let randomNumber = Math.floor(Math.random() * 13) + 1;
        if (randomNumber > 10) {
            return 10;
        } else if (randomNumber === 1) {
            return "Ace"; // Return "Ace" to handle separately
        } else {
            return randomNumber;
        }
    }

    function startGame() {
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = 0;
        updateSum(); // Calculate sum, handle Ace
        renderGame();
    }

    function renderGame() {
        cardsEl.textContent = "Cards: ";
        for (let i = 0; i < cards.length; i++) {
            cardsEl.textContent += cards[i] + " ";
        }

        sumEl.textContent = "Sum: " + sum;
        if (sum <= 20) {
            message = "Do you want to draw a new card?";
        } else if (sum === 21) {
            message = "You've got Blackjack!";
            hasBlackJack = true;
        } else {
            message = "You're out of the game!";
            isAlive = false;
        }
        messageEl.textContent = message;
    }

    function newCard() {
        if (isAlive === true && hasBlackJack === false) {
            let card = getRandomCard();
            cards.push(card);
            updateSum(); // Recalculate sum with the new card
            renderGame();
        }
    }

    function updateSum() {
        sum = 0;
        let hasAce = false;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === "Ace") {
                hasAce = true;
            } else {
                sum += cards[i];
            }
        }
        if (hasAce) {
            // Show input to choose Ace value only if there is an Ace
            showAceChoice();
        } else {
            // If no Ace, just update the sum
            sumEl.textContent = "Sum: " + sum;
            // Ensure the input is hidden if there is no Ace
            if (aceInputEl) {
                aceInputEl.style.display = 'none';
            }
        }
    }

    function showAceChoice() {
        if (!aceInputEl) {
            // Create input for Ace choice only if it doesn't exist
            aceInputEl = document.createElement('input');
            aceInputEl.type = 'number';
            aceInputEl.placeholder = 'Choose 1 or 11';
            aceInputEl.min = '1';
            aceInputEl.max = '11';
            aceInputEl.style.marginTop = '10px';
            document.body.appendChild(aceInputEl);

            // Add event listener to handle Ace value submission
            aceInputEl.addEventListener('change', function() {
                let aceValue = parseInt(aceInputEl.value);
                if (aceValue === 1 || aceValue === 11) {
                    sum += aceValue;
                    aceInputEl.style.display = 'none'; // Hide input after choosing
                    renderGame(); // Re-render the game after Ace selection
                } else {
                    alert("Please choose either 1 or 11 for the Ace.");
                }
            });
        }
        aceInputEl.style.display = 'block'; // Show input if it's hidden
    }

    // Attach functions to the global scope so that HTML buttons can access them
    window.startGame = startGame;
    window.newCard = newCard;
});
