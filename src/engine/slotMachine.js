git add .
git commit -m "describe change"
git push(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.SlotMachine = factory();
    }
})(typeof self !== "undefined" ? self : this, function () {
    const ROWS = 3;
    const COLS = 3;

    const SYMBOLS_COUNT = {
        A: 2,
        B: 4,
        C: 6,
        D: 8
    };

    const SYMBOLS_VALUES = {
        A: 5,
        B: 4,
        C: 3,
        D: 2
    };

    const buildSymbolPool = () => {
        const symbols = [];
        for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
            for (let i = 0; i < count; i++) {
                symbols.push(symbol);
            }
        }
        return symbols;
    };

    const spin = () => {
        const symbols = buildSymbolPool();
        const reels = [];

        for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }

        return reels;
    };

    const transpose = (reels) => {
        const rows = [];
        for (let i = 0; i < ROWS; i++) {
            rows.push([]);
            for (let j = 0; j < COLS; j++) {
                rows[i].push(reels[j][i]);
            }
        }
        return rows;
    };

    const getWinnings = (rows, bet, lines) => {
        let winnings = 0;
        for (let row = 0; row < lines; row++) {
            const symbols = rows[row];
            const allSame = symbols.every((symbol) => symbol === symbols[0]);
            if (allSame) {
                winnings += bet * SYMBOLS_VALUES[symbols[0]];
            }
        }
        return winnings;
    };

    const formatRow = (row, separator = " | ") => row.join(separator);

    const formatRows = (rows, separator = " | ") => rows.map((row) => formatRow(row, separator));

    return {
        ROWS,
        COLS,
        SYMBOLS_COUNT,
        SYMBOLS_VALUES,
        spin,
        transpose,
        getWinnings,
        formatRow,
        formatRows
    };
});
