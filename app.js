let initBoard = [];
let score = 0;
let rows = 4;
let columns = 4;

let tilesBoard = document.getElementById('board');

window.onload = function() {
    setGame();
}
// Init the board and fill the game board with tiles
function setGame() {
    initBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            let tile = document.createElement('div');
            tile.id = r.toString() + ':' + c.toString();
            let num = initBoard[r][c];
            updateTile(tile, num);
            tilesBoard.append(tile);
        }
    }
    //set numbers in two tiles
    // setTwo();
    // setTwo();
}