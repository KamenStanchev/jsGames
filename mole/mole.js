const squares = document.querySelectorAll('.square')
const timeLeftDisplay = document.querySelector('#time-left')
const scoreDisplay = document.querySelector('#score')

let isPaused = false
let timeLeft = 11
let score = 0
let molePositionId

function moleRandomPosition() {

    if (!isPaused) {
        squares.forEach(square => {
            if (square.classList.contains('mole')) {
                square.classList.remove('mole')
            }

            if (square.classList.contains('hit-mole')) {
                square.classList.remove('hit-mole')
            }
        }
        )

        let randomSquare = squares[Math.floor(Math.random() * 9)]
        randomSquare.classList.add('mole')
        molePositionId = randomSquare.id
    }
}

function returnMoleImg() {
    play()

}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == molePositionId &&
            timeLeft > 0) {
            score += 1
            scoreDisplay.innerHTML = score
            square.classList.add('hit-mole')
            pause()
            setTimeout(returnMoleImg, 2000)
        }
    })
})

let timeId = null
function moveTheMole() {
    timeId = setInterval(moleRandomPosition, 1000)
}

moveTheMole()

function countDown() {
    if (!isPaused) {
        timeLeftDisplay.textContent = timeLeft
        timeLeft--

        if (timeLeft < 0) {
            clearInterval(countDownTimerId)
            clearInterval(timeId)
            alert('GAME OVER! Your final result is: ' + score)
            squares.forEach(square => {
                if (square.classList.contains('mole')) {
                    square.classList.remove('mole')
                }
                if (square.classList.contains('hit-mole')) {
                    square.classList.remove('hit-mole')
                }
            }
            )
        }
    }
}

let countDownTimerId = setInterval(countDown, 1000)

function play() {
    isPaused = false
}
function pause() {
    isPaused = true
}