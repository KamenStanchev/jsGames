const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const gridWidth = 9

const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')

const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let frogCurrentIndex = 76
let timerId
let loseTimerId



// move the frog and check is next step inside the grid
function moveFrog(e) {
    squares[frogCurrentIndex].classList.remove('frog')

    switch (e.key) {
        case 'ArrowLeft':
            if (frogCurrentIndex % gridWidth !== 0)
                frogCurrentIndex -= 1
            break
        case 'ArrowRight':
            if ((frogCurrentIndex + 1) % gridWidth !== 0)
                frogCurrentIndex += 1
            break
        case 'ArrowUp':
            if (frogCurrentIndex - gridWidth >= 0)
                frogCurrentIndex -= gridWidth
            break
        case 'ArrowDown':
            if (frogCurrentIndex + gridWidth < gridWidth * gridWidth)
                frogCurrentIndex += gridWidth
            break
    }
    squares[frogCurrentIndex].classList.add('frog')
    lose()

}

document.addEventListener('keyup', moveFrog)


//move the elements
function autoMoveElements() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    lose()
}

//move the logs
function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

//move the cars
function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c4')
            break
        case carLeft.classList.contains('c4'):
            carLeft.classList.remove('c4')
            carLeft.classList.add('c5')
            break
        case carLeft.classList.contains('c5'):
            carLeft.classList.remove('c5')
            carLeft.classList.add('c6')
            break
        case carLeft.classList.contains('c6'):
            carLeft.classList.remove('c6')
            carLeft.classList.add('c7')
            break
        case carLeft.classList.contains('c7'):
            carLeft.classList.remove('c7')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c7')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
        case carRight.classList.contains('c4'):
            carRight.classList.remove('c4')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c5'):
            carRight.classList.remove('c5')
            carRight.classList.add('c4')
            break
        case carRight.classList.contains('c6'):
            carRight.classList.remove('c6')
            carRight.classList.add('c5')
            break
        case carRight.classList.contains('c7'):
            carRight.classList.remove('c7')
            carRight.classList.add('c6')
            break
    }
}


//check for game over with LOSE
function lose() {
    if (squares[frogCurrentIndex].classList.contains('c7')) {
        resultDisplay.innerHTML = 'You LOSE!'
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
        squares[frogCurrentIndex].classList.remove('frog')
        squares[frogCurrentIndex].classList.add('end')
    }
}

timerId = setInterval(autoMoveElements, 1000)