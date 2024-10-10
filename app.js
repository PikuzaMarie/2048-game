let board = [];
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function() {
    setGame();
}
// Init the board and fill the game board with tiles
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 4, 0, 0]
    ]

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
    // setTwo();
    // setTwo();
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

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        slideLeft();
        // setTwo();
    }
});

function filterZeros(row) {
    return row.filter(num => num !== 0);
}
//Sum up qual numbers in an array (row) and return a modified array (row)
function slide(row) {
    row = filterZeros(row);

    for (let i = 0; i < rows; i += 1) {
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