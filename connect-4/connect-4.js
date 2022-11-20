document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const displayResult = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    const players = ['player-two', 'player-one']
    const boardSize = 7
    let currentPlayer = 1


    function winMessage() {
        let winner = 'Player One'
        if (players[currentPlayer - 1] == 'player-two') { winner = 'Player Two' }
        displayResult.innerHTML = 'Winner is ' + winner + ' !!!'
        for (let i = 0; i < boardSize * boardSize; i++) {
            squares[i].onclick = () => {

            }
        }
    }

    //check board for 4 connected squares
    function checkBoard(currentIndex) {
        //check vertical connection, check only down from currentIndex
        if ((currentIndex + boardSize * 3) < boardSize * boardSize) {
            if (
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2 * boardSize].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 3 * boardSize].classList.contains(players[currentPlayer - 1])
            ) { winMessage() }
        }

        //check HORIZONTAL: 3 in right
        if (currentIndex % boardSize < (currentIndex + 3) % boardSize) {
            if (
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 3].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check HORIZONTAL: 1 in left, 2 in right
        if (
            (currentIndex - 1) >= 0 &
            (currentIndex - 1) % boardSize < currentIndex % boardSize &&
            currentIndex % boardSize < (currentIndex + 2) % boardSize) {
            if (
                squares[currentIndex - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check HORIZONTAL: 2 in left, 1 in right
        if (
            (currentIndex - 2) >= 0 &
            (currentIndex - 2) % boardSize < currentIndex % boardSize &&
            currentIndex % boardSize < (currentIndex + 1) % boardSize) {
            if (
                squares[currentIndex - 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 1].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check HORIZONTAL: 3 in left
        if (
            (currentIndex - 3) >= 0 &&
            (currentIndex - 3) % boardSize < currentIndex % boardSize) {
            if (
                squares[currentIndex - 3].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL bottom-left to top-right: 3 in top-right
        if (
            (currentIndex - 3 * boardSize) >= 0 &&
            currentIndex % boardSize < (currentIndex + 3) % boardSize) {
            if (
                squares[currentIndex - 3 * boardSize + 3].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - 2 * boardSize + 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - boardSize + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL bottom-left to top-right: 1 in bottom-left, 2 in top-right
        if (
            (currentIndex - 2 * boardSize) >= 0 &&
            (currentIndex + boardSize) < boardSize * boardSize &&
            currentIndex % boardSize > (currentIndex - 1) % boardSize &&
            currentIndex % boardSize < (currentIndex + 2) % boardSize) {
            if (
                squares[currentIndex - 2 * boardSize + 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - boardSize + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize - 1].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL bottom-left to top-right: 2 in bottom-left, 1 in top-right
        if (
            (currentIndex - boardSize) >= 0 &&
            (currentIndex + 2 * boardSize) < boardSize * boardSize &&
            currentIndex % boardSize > (currentIndex - 2) % boardSize &&
            currentIndex % boardSize < (currentIndex + 1) % boardSize) {
            if (
                squares[currentIndex - boardSize + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2 * boardSize - 2].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL bottom-left to top-right: 3 in bottom-left
        if (
            (currentIndex + 3 * boardSize) < boardSize * boardSize &&
            currentIndex % boardSize > (currentIndex - 3) % boardSize) {
            if (
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2 * boardSize - 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 3 * boardSize - 3].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL top-left to bottom-right: 3 in bottom-right
        if (
            (currentIndex + 3 * boardSize) < boardSize * boardSize &&
            currentIndex % boardSize < (currentIndex + 3) % boardSize) {
            if (
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2 * boardSize + 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 3 * boardSize + 3].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL top-left to bottom-right: 1 in top-left, 2 in bottom-right 
        if (
            (currentIndex + 2 * boardSize) < boardSize * boardSize &&
            (currentIndex - boardSize) >= 0 &&
            currentIndex % boardSize < (currentIndex + 2) % boardSize &&
            currentIndex % boardSize > (currentIndex - 1) % boardSize) {
            if (
                squares[currentIndex - boardSize - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize + 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + 2 * boardSize + 2].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL top-left to bottom-right: 2 in top-left, 1 in bottom-right 
        if (
            (currentIndex + boardSize) < boardSize * boardSize &&
            (currentIndex - 2 * boardSize) >= 0 &&
            currentIndex % boardSize < (currentIndex + 1) % boardSize &&
            currentIndex % boardSize > (currentIndex - 2) % boardSize) {
            if (
                squares[currentIndex - 2 * boardSize - 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - boardSize - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex + boardSize + 1].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

        //check DIAGONAL top-left to bottom-right: 3 in top-left
        if (
            (currentIndex - 3 * boardSize) >= 0 &&
            currentIndex % boardSize > (currentIndex - 3) % boardSize) {
            if (
                squares[currentIndex - 3 * boardSize - 3].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - 2 * boardSize - 2].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex - boardSize - 1].classList.contains(players[currentPlayer - 1]) &&
                squares[currentIndex].classList.contains(players[currentPlayer - 1])
            ) {
                winMessage()
            }
        }

    }
    for (let i = 0; i < boardSize * boardSize; i++) {
        squares[i].onclick = () => {
            if (squares[i + 7].classList.contains('taken') &&
                !squares[i].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
                else if (currentPlayer == 2) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
            }
            else alert('can not go here')
            checkBoard(i)
        }
    }

})