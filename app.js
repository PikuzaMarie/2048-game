let board = [];
let score = 0;
let rows = 4;
let columns = 4;
let count = 0;

window.onload = function() {
    setGame();
}
// Init the board and fill the game board with tiles
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    document.getElementById('board').innerHTML = '';
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        }
    }
    //set numbers in two tiles
    setTwo();
    setTwo();
    score = 0;
    document.getElementById('score').innerText = '0';
    document.addEventListener('keyup', control);
}
function updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');

    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 8192) {
            tile.classList.add('x' + num.toString());
        }
    }
}
//Implement event corresponding to clicked arrow
function control(e) {

    if (e.code === 'ArrowLeft') {
        slideLeft();
        setTwo();
    }
    else if (e.code === 'ArrowRight') {
        slideRight();
        setTwo();
    }
    else if (e.code === 'ArrowUp') {
        slideUp();
        setTwo();
    }
    else if (e.code === 'ArrowDown') {
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;
}
//Add event listener
document.addEventListener('keyup', function(e) {
    control(e);
    let gameState = checkGameState();
    if (gameState === 'win' || gameState === 'lose') {
        document.removeEventListener('keyup', control);
    }
});

function filterZeros(row) {
    return row.filter(num => num !== 0);
}
//Sum up qual numbers in an array (row) and return a modified array (row)
function slide(row) {
    row = filterZeros(row);

    for (let i = 0; i < row.length - 1; i += 1) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZeros(row);

    while(row.length < columns) {
        row.push(0);
    }

    return row;
}
//Move tiles and change numbers after click on left arrow
function slideLeft() {
    for (let r = 0; r < rows; r += 1) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c += 1) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//Move tiles and change numbers after click on right arrow
function slideRight() {
    for (let r = 0; r < rows; r += 1) {
        let row = board[r]; //[2, 0, 2, 2]
        row.reverse(); //[2, 2, 0, 2]
        row = slide(row); // [4, 2, 0, 0]
        board[r] = row.reverse(); // [0, 0, 2, 4]

        for (let c = 0; c < columns; c += 1) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//Move tiles and change numbers after click on up arrow
function slideUp() {
    for (let c = 0; c < columns; c += 1) {
        let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
        column = slide(column);

        for (let r = 0; r < rows; r += 1) {
            board[r][c] = column[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//Move tiles and change numbers after click on down arrow
function slideDown() {
    for (let c = 0; c < columns; c += 1) {
        let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
        column.reverse();
        column = slide(column);
        column.reverse();

        for (let r = 0; r < rows; r += 1) {
            board[r][c] = column[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//Set a value of 2 to an empty tile
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;

    while(!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;
        }
    }
}
//Search for an epmty tile
function hasEmptyTile() {
    
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            if (board[r][c] === 0) {
                return true;
            }
        }
    }

    return false;
}
// Check for game state
function checkGameState() {
    //Check for win
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c +=1) {
            if (board[r][c] === 2048) {
                alert('You WON! Great job!');
                storeResult();
                return 'win';
            }
        }
    }
    //Check for lose
    if (!hasEmptyTile() && !canMove()) {
        alert('You failed this time. Try once again');
        storeResult();
        return 'lose';
    }
    //If it is neither win nor lose, continue
    return 'continue';
}
//Check if it is possible to move objects
function canMove() {
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c +=1) {
            //Check for possibility of merging values horizontally
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return true;
            }
            //Check for possibility of merging values vertically
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return true;
            }
        }
    }
    return false;
}
//Write results to local storage
function storeResult(result) {
    let date = new Date();

    const data = {
        id: count + 1,
        time: formatTime(date),
        score: document.getElementById('score').innerText
    };

    let allData = JSON.parse(localStorage.getItem('gameDataArray')) || [];

    allData.push(data);

    localStorage.setItem('gameDataArray', JSON.stringify(allData));

    alert('Results saved to local storage. Click on button to see results');
}
//Display results in a table
const resultTable = document.getElementById('result-table');
function displayResults(resultTable) {
    const storedData = localStorage.getItem('gameDataArray');

    if (storedData) {
        const allData = JSON.parse(storedData);

        let resultRows = '';
        
        allData.forEach((resultData) => {
            resultRows += `
                <tr>
                    <td>${resultData.id}</td>
                    <td>${resultData.time}</td>
                    <td>${resultData.score}</td>
                </tr>
            `;
        });

        resultTable.innerHTML = resultRows;
        
    } else {
        resultTable.innerHTML = `
            <tr>
                <td colspan="3">No stored data</td>
            </tr>
        `;
    }
}
//Format time
function formatTime(date) {
    let hours = date.getHours();

    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    return `${hours}:${minutes}:${seconds} ${ampm}`;
}
//Display popup
const popup = document.getElementById('popup-results');
document.getElementById('btn-results').addEventListener('click', () => {
    popup.style.display = 'flex';
    displayResults(resultTable);
    document.body.style.overflow = 'hidden';
});
//Close popup
document.getElementById('btn-close').addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = '';
});
//Refresh table
document.getElementById('btn-restart').addEventListener('click', () => {
    setGame();
});