const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeftDisplay = document.querySelector('#time-left')
const scoreDisplay = document.querySelector('#score')

let timeLeft = 10
let score = 0
let molePositionId

function moleRandomPosition() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    molePositionId = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == molePositionId) {
            document.querySelector('.mole').style.backgroundImage = "url('images/mole-hit.jpg')"
            score+=1
            scoreDisplay.innerHTML = score
        }
    })
})

let timeId = null
function moveTheMole() {
    timeId = setInterval(moleRandomPosition, 1000)
}

moveTheMole()

function countDown() {
    timeLeft --
    timeLeftDisplay.textContent = timeLeft

    if (timeLeft == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timeId)
        alert('GAME OVER! Your final result is: ' + score)
    }
}

let countDownTimerId = setInterval(countDown, 1000)