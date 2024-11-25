document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const statusText = document.getElementById("status-text");
    const resetButton = document.getElementById("reset-btn");

    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""]; // Keeps track of board state

    // Winning combinations
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],           // Diagonals
    ];

    // Function to initialize or reset the board
    function createBoard() {
        board.innerHTML = ""; // Clear the board
        boardState.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        });
    }

    // Handle cell clicks
    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        // Ignore click if cell is already taken or game is over
        if (!gameActive || boardState[index] !== "") return;

        // Update board state and UI
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        // Check for a winner or a draw
        if (checkWinner()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (boardState.every(cell => cell !== "")) {
            statusText.textContent = "It's a draw!";
            gameActive = false;
        } else {
            // Switch players
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Check for a winner
    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return (
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            );
        });
    }

    // Reset the game
    function resetGame() {
        currentPlayer = "X";
        gameActive = true;
        boardState = ["", "", "", "", "", "", "", "", ""]; // Reset the board state
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        createBoard(); // Re-render the board
    }

    // Attach reset button event listener
    resetButton.addEventListener("click", resetGame);

    // Initialize the game on page load
    createBoard();
});
