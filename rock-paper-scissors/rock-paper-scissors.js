const computerChoiceDisplay = document.getElementById('computer-choice')
const yourChoiceDisplay = document.getElementById('your-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let yourChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) =>{
    yourChoice = e.target.id
    yourChoiceDisplay.innerHTML = yourChoice
    generateComputerChoice() 
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    
    if(randomNumber === 1) {
        computerChoice = 'rock'
    }
    if(randomNumber === 2) {
        computerChoice = 'paper'
    }
    if(randomNumber === 3) {
        computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if(computerChoice === yourChoice) {
        result = 'Alex, your were so close to win the game!'
    }

    if(computerChoice === 'paper' && yourChoice==='rock') {
        result = 'Sorry Alex, machine beat you!'
    }
    if(computerChoice === 'rock' && yourChoice==='scissors') {
        result = 'Sorry Alex, machine beat you!'
    }
    if(computerChoice === 'scissors' && yourChoice==='paper') {
        result = 'Sorry Alex, machine beat you!'
    }
    if(computerChoice === 'rock' && yourChoice==='paper') {
        result = 'Alex, you are much, much better than this PC'
    }
    if(computerChoice === 'scissors' && yourChoice==='rock') {
        result = 'Alex, you are much, much better than this PC'
    }
    if(computerChoice === 'paper' && yourChoice==='scissors') {
        result = 'Alex, you are much, much better than this PC'
    }

    resultDisplay.innerHTML = result

}
