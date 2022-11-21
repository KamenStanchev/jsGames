const grid = document.querySelector('.grid')
const gridWidth = 15
const displayResult = document.querySelector('.result')
const displayScore = document.querySelector('.score')
let shooterIndex = 218
let direction = 1
let intervalMoveInvadersID
let invadersRemoved = []


for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const spaceInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

//DRAW all invaders in the grid
function draw() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        squares[spaceInvaders[i]].classList.add('invader')
    }
}

draw()

//REMOVE all invaders in the grid
function removeInvaders() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        squares[spaceInvaders[i]].classList.remove('invader')
    }
}

//add shooter in the grid
squares[shooterIndex].classList.add('shooter')

//move the shooter
function moveShooter(e) {
    squares[shooterIndex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (shooterIndex % gridWidth !== 0)
                shooterIndex--
            break

        case 'ArrowRight':
            if (shooterIndex % gridWidth < gridWidth - 1)
                shooterIndex++
            break

    }
    squares[shooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

//MOVE all invaders in the grid
function moveInvaders() {
    let leftEdge = spaceInvaders[0] % gridWidth === 0
    let rightEdge = spaceInvaders[spaceInvaders.length - 1] % gridWidth === (gridWidth - 1)
    removeInvaders()

    if (rightEdge && direction === 1) {
        for (let i = 0; i < spaceInvaders.length; i++) {
            spaceInvaders[i] += gridWidth + 1
            direction = -1
        }
    }

    if (leftEdge && direction === -1) {
        for (let i = 0; i < spaceInvaders.length; i++) {
            spaceInvaders[i] += gridWidth - 1
            direction = 1
        }
    }

    for (let i = 0; i < spaceInvaders.length; i++) {
        spaceInvaders[i] += direction
    }

    draw()

    //check is some invader hit shooter
    if (squares[shooterIndex].classList.contains('invader', 'shooter')) {
        clearInterval(intervalMoveInvadersID)
        displayResult.innerHTML = 'GAME OVER. YOU HAVE BEEN KILLED'
        document.removeEventListener('keydown', moveShooter)
    }

    //check is some invader rich the bottom
    for (let i = 0; i < spaceInvaders.length; i++) {
        if (spaceInvaders[i] > (squares.length - gridWidth)
        ) {
            clearInterval(intervalMoveInvadersID)
            displayResult.innerHTML = 'GAME OVER. YOU HAVE BEEN KILLED'
            document.removeEventListener('keydown', moveShooter)
        }
    }

}

intervalMoveInvadersID = setInterval(moveInvaders, 500)



//function do shooting by press ArrowUp key
function shooting(e) {
    let bulletId
    let bulletIndex = shooterIndex

    //move bullet 
    function moveBullet() {
        squares[bulletIndex].classList.remove('bullet')
        bulletIndex -= gridWidth
        squares[bulletIndex].classList.add('bullet')

        if (squares[bulletIndex].classList.contains('invader')) {
            squares[bulletIndex].classList.remove('bullet')
            squares[bulletIndex].classList.remove('invader')
            squares[bulletIndex].classList.add('boom')

            setTimeout(() => squares[bulletIndex].classList.remove('boom'), 300)
            clearInterval(bulletId)

            const invaderRemoved = spaceInvaders.indexOf(bulletIndex)
            invadersRemoved.push(invaderRemoved)
            displayScore.innerHTML = invadersRemoved.length


        }
    }

    switch (e.key) {
        case 'ArrowUp':
            bulletId = setInterval(moveBullet, 100)
    }
}

document.addEventListener('keydown', shooting)

