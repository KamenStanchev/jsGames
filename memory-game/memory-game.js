const cardsArray = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
]

cardsArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const buttonNewGame = document.querySelector('#new-game')
const cardsChosen = []
const cardsChosenId = []
let result = 0


function createBoard() {
    for (let i=0; i<12; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
    buttonNewGame.addEventListener('click', refreshPage)
}

createBoard()

function refreshPage(){
    window.location.reload();
} 

function checkMatch(){
    const cards = document.querySelectorAll('#grid img')

    if(cardsChosen[0] == cardsChosen[1]) {
        alert('Super! You match same cards')

        cards[cardsChosenId[0]].setAttribute('src', 'images/white.png')
        cards[cardsChosenId[0]].removeEventListener('click', flipCard)
        
        cards[cardsChosenId[1]].setAttribute('src', 'images/white.png')
        cards[cardsChosenId[1]].removeEventListener('click', flipCard)
        result += 1
    }

    if(cardsChosen[0] != cardsChosen[1]){
        alert('So sorry, there is not match')
        cards[cardsChosenId[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenId[1]].setAttribute('src', 'images/blank.png')
        }
    while (cardsChosen.length > 0) {
        cardsChosen.pop();
    }
    while (cardsChosenId.length > 0) {
        cardsChosenId.pop();
    }
    if(result === cardsArray.length/2) {
        result = 'Congratulation! You win!'
    }

    resultDisplay.textContent = result
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardsArray[cardId].name)
    cardsChosenId.push(cardId)

    this.setAttribute('src', cardsArray[cardId].img)

    if(cardsChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}

