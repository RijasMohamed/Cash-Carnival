// 1. deposit some money
// 2. determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again
//----------------------------------------------------------------------------

const prompt = require("prompt-sync")(); // to get user input
const { spin, transpose, getWinnings, formatRows } = require("../engine/slotMachine");

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter the amount you want to deposit: ");
        const numericDepositAmount = parseFloat(depositAmount);

        if (isNaN(numericDepositAmount) || numericDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numericDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const linesInput = prompt("Enter the lines you want to bet (1 - 3): ");
        const numberOfLines = parseInt(linesInput, 10);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid lines selected, try again.");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const betInput = prompt("Enter the total you want to bet per line: ");
        const numericBet = parseFloat(betInput);

        if (isNaN(numericBet) || numericBet <= 0 || numericBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numericBet;
        }
    }
};

const printRows = (rows) => {
    for (const rowString of formatRows(rows)) {
        console.log(rowString);
    }
};

const game = () => {
    console.log("Welcome to the Slot Machine!");
    let balance = deposit();

    while (true) {
        console.log("Your current balance is $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        const totalBet = bet * numberOfLines;
        balance -= totalBet;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You bet $" + totalBet.toString() + " and won: $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain.trim().toLowerCase() !== "y") break;
    }
};

if (require.main === module) {
    game();
}

module.exports = { game };
