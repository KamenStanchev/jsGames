//grid variables
const grid = document.querySelector('.grid')
const gridWidth = 560
const gridHeight = 300

//blocks variables
const blockWidth = 100
const blockHeight = 20

//user variables
const userXAxis = 230
const userYAxis = 10
const userWidth = 100
const userHeight = 15
let userCurrentPosition = userXAxis

//ball variables
const ballDiameter = 20
const ballStartPosition = [275, 30]
let xBallAxis = ballStartPosition[0]
let yBallAxis = ballStartPosition[1]
let xStepDirection = 1
let yStepDirection = 1
let ballMoveTimerId

//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.TopLeft = [xAxis, yAxis + blockHeight]
        this.TopRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}


//all blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]



//draw all blocks
function addBlocks() {
    for (i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()


//create user 
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser() {
    user.style.left = userCurrentPosition + 'px'
    user.style.bottom = userYAxis + 'px'
}


//move user position
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userCurrentPosition > 0) {
                userCurrentPosition -= 10
                drawUser()
            }
            break

        case 'ArrowRight':
            if (userCurrentPosition < (gridWidth - 100)) {
                userCurrentPosition += 10
                drawUser()
            }
            break
    }
}

document.addEventListener('keydown', moveUser)


//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//draw ball
function drawBall() {
    ball.style.left = xBallAxis + 'px'
    ball.style.bottom = yBallAxis + 'px'
}

//move ball
function moveBall() {
    xBallAxis += xStepDirection
    yBallAxis += yStepDirection
    drawBall()
    checkForCollisions()
}

ballMoveTimerId = setInterval(moveBall, 20)


function checkForCollisions() {

    //check for collisions with wall
    if (yBallAxis >= gridHeight - ballDiameter) {
        changeDirection('upHitBarrier')
    }
    if (xBallAxis >= gridWidth - ballDiameter) {
        changeDirection('rightHitBarrier')
    }
    if (xBallAxis <= 0) {
        changeDirection('leftHitBarrier')
    }

    //check for collision with user left side
    if (yBallAxis == userYAxis + userHeight &&
        xBallAxis + ballDiameter >= userCurrentPosition &&
        xBallAxis <= userCurrentPosition + userWidth / 2) {
        xStepDirection = -1
        yStepDirection = 1
    }
    //check for collision with user right side
    if (yBallAxis == userYAxis + userHeight &&
        xBallAxis + ballDiameter > userCurrentPosition + userWidth / 2 &&
        xBallAxis <= userCurrentPosition + userWidth) {
        xStepDirection = 1
        yStepDirection = 1
    }

    //check for GAME OVER, cause collision with floor
    if (yBallAxis < 1) {
        clearInterval(ballMoveTimerId)
        document.removeEventListener('keydown', moveUser)
        alert('GAME OVER! You LOSE!')
    }



    //check for collision with block
    let ballLeftBottom = [xBallAxis, yBallAxis]
    let ballRightBottom = [xBallAxis + ballDiameter, yBallAxis]
    let ballLeftTop = [xBallAxis, yBallAxis + ballDiameter]
    let ballRightTop = [xBallAxis + ballDiameter, yBallAxis + ballDiameter]

    for (let i = 0; i < blocks.length; i++) {
        let currentBlock = blocks[i]
        //check for collision with downside of the block
        if (ballLeftTop[1] == currentBlock.bottomLeft[1] &&
            ((ballLeftTop[0] >= currentBlock.bottomLeft[0] &&
                ballLeftTop[0] <= currentBlock.bottomRight[0]) ||
                (ballRightTop[0] <= currentBlock.bottomRight[0] &&
                    ballRightTop[0] >= currentBlock.bottomLeft[0]))) {
            changeDirection('upHitBarrier')
            removeBlock(i)
        }
        //check for collision with upside of the block
        if (ballLeftBottom[1] == currentBlock.TopLeft[1] &&
            ((ballLeftBottom[0] >= currentBlock.TopLeft[0] &&
                ballLeftBottom[0] <= currentBlock.TopRight[0]) ||
                (ballRightBottom[0] <= currentBlock.TopRight[0] &&
                    ballRightBottom[0] >= currentBlock.TopLeft[0]))) {
            changeDirection('downHitBarrier')
            removeBlock(i)
        }
        //check for collision with left-side of the block
        if (ballRightBottom[0] == currentBlock.bottomLeft[0] &&
            ((ballRightBottom[1] >= currentBlock.bottomLeft[1] &&
                ballRightBottom[1] <= currentBlock.TopLeft[1]) ||
                (ballRightTop[1] >= currentBlock.bottomLeft[1] &&
                    ballRightTop[1] <= currentBlock.TopLeft[1]))) {
            changeDirection('rightHitBarrier')
            removeBlock(i)
        }
        //check for collision with right-side of the block
        if (ballLeftBottom[0] == currentBlock.bottomRight[0] &&
            ((ballLeftBottom[1] >= currentBlock.bottomRight[1] &&
                ballLeftTop[1] <= currentBlock.TopRight[1]) ||
                (ballLeftTop[1] >= currentBlock.bottomRight[1] &&
                    ballLeftTop[1] <= currentBlock.TopRight[1]))) {
            changeDirection('leftHitBarrier')
            removeBlock(i)
        }



    }

}

//remove broken block
function removeBlock(i) {
    const allBlocks = Array.from(document.querySelectorAll('.block'))
    allBlocks[i].classList.remove('block')
    blocks.splice(i, 1)
    checkIsAnyBlock(blocks)
}


//check for GAME OVER, cause no any block
function checkIsAnyBlock(blocks) {
    if (blocks.length <= 0) {
        clearInterval(ballMoveTimerId)
        document.removeEventListener('keydown', moveUser)
        alert('GAME OVER! You WIN!')
    }
}



//change direction
function changeDirection(hitBarrierFrom) {
    switch (hitBarrierFrom) {
        case 'upHitBarrier':
            yStepDirection = -1
            break
        case 'downHitBarrier':
            yStepDirection = 1
            break
        case 'rightHitBarrier':
            xStepDirection = -1
            break
        case 'leftHitBarrier':
            xStepDirection = 1
            break
    }
}



