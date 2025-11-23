const { spin, transpose, getWinnings, formatRows } = window.SlotMachine;

const balanceElement = document.querySelector("[data-balance]");
const depositForm = document.getElementById("deposit-form");
const depositInput = document.getElementById("deposit-amount");
const linesSelect = document.getElementById("line-count");
const betInput = document.getElementById("bet-per-line");
const spinButton = document.getElementById("spin-button");
const reelsContainer = document.getElementById("reels");
const messagesContainer = document.getElementById("messages");

let balance = 0;

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const updateBalance = (nextBalance) => {
    balance = Number(nextBalance);
    balanceElement.textContent = formatCurrency(balance);
    spinButton.disabled = balance <= 0;
};

const pushMessage = (text) => {
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;
    messagesContainer.prepend(message);

    while (messagesContainer.childElementCount > 4) {
        messagesContainer.removeChild(messagesContainer.lastElementChild);
    }
};

const renderRows = (rows) => {
    reelsContainer.innerHTML = "";
    const rowStrings = formatRows(rows);
    rowStrings.forEach((rowString) => {
        const rowElement = document.createElement("div");
        rowElement.className = "reel-row";
        rowElement.textContent = rowString;
        reelsContainer.appendChild(rowElement);
    });
};

const setSpinning = (isSpinning) => {
    if (isSpinning) {
        reelsContainer.classList.add("spinning");
        spinButton.disabled = true;
    } else {
        reelsContainer.classList.remove("spinning");
        spinButton.disabled = balance <= 0;
    }
};

depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseFloat(depositInput.value);

    if (isNaN(amount) || amount <= 0) {
        pushMessage("Enter a positive deposit amount to begin playing.");
        return;
    }

    updateBalance(balance + amount);
    depositInput.value = "";
    pushMessage(`Deposited ${formatCurrency(amount)}. Good luck!`);
});

spinButton.addEventListener("click", () => {
    const lines = parseInt(linesSelect.value, 10);
    const betPerLine = parseFloat(betInput.value);

    if (isNaN(betPerLine) || betPerLine <= 0) {
        pushMessage("Please enter a valid bet per line.");
        return;
    }

    const totalBet = betPerLine * lines;
    if (totalBet > balance) {
        pushMessage(`Need ${formatCurrency(totalBet)} but only have ${formatCurrency(balance)}.`);
        return;
    }

    updateBalance(balance - totalBet);
    setSpinning(true);
    const reels = spin();
    const rows = transpose(reels);
    setTimeout(() => {
        renderRows(rows);

        const winnings = getWinnings(rows, betPerLine, lines);
        updateBalance(balance + winnings);
        setSpinning(false);

        if (winnings > 0) {
            pushMessage(`Winner! You earned ${formatCurrency(winnings)} on ${lines} line(s).`);
        } else {
            pushMessage("No matches this time—try again!");
        }
    }, 500);
});

updateBalance(0);
