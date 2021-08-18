document.addEventListener('DOMContentLoaded', () => {
    let circles = document.querySelectorAll('.circle');
    circles.forEach((circle) => {
        circle.addEventListener('click', handleClick);
    });
})

let startGame = document.getElementById("startGame")
let playerSelect = document.querySelector(".playerSelect")
let playerChoose = document.getElementById("playerChoose")
let game = document.querySelector(".game")
let resetScoreBtn = document.getElementById("resetScore")
let resetGameBtn = document.getElementById("resetGame")
let changeElements = document.getElementById("changeElements")
let airElement = document.getElementById("air-element")
let earthElement = document.getElementById("earth-element")
let fireElement = document.getElementById("fire-element")
let waterElement = document.getElementById("water-element")

startGame.addEventListener('click', () => {
    let splashScreen = document.querySelector(".splashScreen")
    transitionOut(splashScreen)
    transitionIn(playerSelect)
})
resetScoreBtn.addEventListener('click', resetScore)

resetGameBtn.addEventListener('click', resetGame)

changeElements.addEventListener('click', () => {
    playerChoose.innerHTML = "PLAYER 1"
    transitionOut(game)
    transitionIn(playerSelect)
    popSymbols()
    resetGame(0)
})

airElement.addEventListener('click', () => {
    pushSymbols("air")
})

earthElement.addEventListener('click', () => {
    pushSymbols("earth")
})
fireElement.addEventListener('click', () => {
    pushSymbols("fire")
})
waterElement.addEventListener('click', () => {
    pushSymbols("water")
})

function transitionOut(e) {
    e.style.animation = "transitionOut 1s ease-in-out .1s forwards"
}

function transitionIn(e) {
    e.style.animation = "transitionIn 1s ease-in-out .3s forwards"
}

function handleClick() {
    let position = this.id;
    if (handleMove(position)) {
        setTimeout(() => {
            playerTime = (playerTime == 0) ? 1 : 0
            alert("Game Over! The winner is " + symbols[playerTime]);
        }, 100)
        moves = 0
        setTimeout(()=>{
            playerTime = (playerTime == 0) ? 1 : 0
            resetGame()
        }, 200)
    };
    if (isTie(position)) {
        setTimeout(() => {
            alert("That's a DRAW! Let's try again.");
        }, 100)
        moves = 0
        setTimeout(resetGame, 200)
    };
    updateCircle(position);
}

function updateCircle(position) {
    let circle = document.getElementById(position.toString());
    let symbol = board[position];
    circle.innerHTML = `<div class="${symbol}"></div>`
}

function resetCircles() {
    let circles = document.querySelectorAll('.circle');
    circles.forEach((circle) => {
        circle.innerHTML = ""
    })
}

function scoreUpdate() {
    if (playerTime == 0) {
        score1.innerHTML++
    }
    if (playerTime == 1) {
        score2.innerHTML++
    }
}

function updateCursor(i) {
    let stage = document.getElementsByClassName("stage")
    let symbol = symbols[i]
    for (index = 0; index < stage.length; index++) {
        stage[index].style.cursor = "url(./assets/icons/" + symbol + "-icon.png), crosshair"
    }
}

function updatePlayerIcon(e) {
    if (playerTime == 0) {
        player1.innerHTML = "<img class='scoreElement' src='./assets/elements/" + e + ".png'></img>"
        return
    }
    player2.innerHTML = "<img class='scoreElement' src='./assets/elements/" + e + ".png'></img>"
}