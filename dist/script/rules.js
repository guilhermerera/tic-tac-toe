let board = ["", "", "", "", "", "", "", "", ""];
let moves = 0;
let playerTime = 0;
let gameOver = false;
let symbols = ["", ""]
let winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let player1 = document.getElementById("p1e")
let score1 = document.getElementById("p1s")
let player2 = document.getElementById("p2e")
let score2 = document.getElementById("p2s")

function pushSymbols(e) {
    symbols[playerTime] = e
    if (playerTime == 0) {
        updatePlayerIcon(e)
        playerChoose.innerHTML = "PLAYER 2"
    }
    if (playerTime == 1) {
        transitionOut(playerSelect)
        updatePlayerIcon(e)
        playerTime = 0
        updateCursor(playerTime)
        transitionIn(game)
        return
    }
    playerTime = 1
}

function popSymbols() {
    for (let i = 0; i < symbols.length; i++) {
        while (i < symbols.length) {
            symbols.pop(symbols[i])
        }
    }
    playerTime = 0
}

function handleMove(position) {
    if (gameOver) {
        return
    }
    if (board[position] == "") {
        board[position] = symbols[playerTime]
        gameOver = isWin()
        if (gameOver == false) {
            playerTime = (playerTime == 0) ? 1 : 0
        }
    }
    updateCursor(playerTime)
    return gameOver
}

function isWin() {
    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[i];
        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];
        if (board[pos1] == board[pos2] &&
            board[pos1] == board[pos3] &&
            board[pos1] != "") {
            scoreUpdate()
            moves = 0
            playerTime = (playerTime == 0) ? 1 : 0
            return true;
        }
    }
    return false;
}

function isTie() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] != "") {
            moves++
            console.log(moves)
        }
    }
    if (moves == 45) {
        return true
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""]
    gameOver = false
    resetCircles()
    isWin()
    moves = 0
}

function resetScore() {
    score1.innerHTML = 0
    score2.innerHTML = 0
}