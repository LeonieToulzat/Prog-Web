// Initialisation des grilles
const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

// Dimensions de la grille
const gridSize = 10;
let playerShips = [];
let computerShips = [];

// Création de la grille
function createGrid(board, isPlayerBoard) {
    board.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleCellClick(cell, isPlayerBoard));
        board.appendChild(cell);
    }
}

// Placer un navire aléatoire (pour l'ordinateur)
function placeRandomShips() {
    computerShips = [];
    while (computerShips.length < 5) {
        let position = Math.floor(Math.random() * gridSize * gridSize);
        if (!computerShips.includes(position)) {
            computerShips.push(position);
        }
    }
}

// Gérer un clic sur une cellule
function handleCellClick(cell, isPlayerBoard) {
    if (isPlayerBoard) {
        // Si c'est la grille de l'utilisateur, il attaque l'ordinateur
        let index = Array.from(computerBoard.children).indexOf(cell);
        if (computerShips.includes(index)) {
            cell.classList.add('hit');
            message.textContent = "Touché!";
            computerShips = computerShips.filter(ship => ship !== index);
            if (computerShips.length === 0) {
                message.textContent = "Vous avez gagné!";
            }
        } else {
            cell.classList.add('miss');
            message.textContent = "Coup dans l'eau.";
        }
    }
}

// Réinitialiser le jeu
function resetGame() {
    createGrid(playerBoard, true);
    createGrid(computerBoard, false);
    placeRandomShips();
    message.textContent = '';
}

// Initialiser le jeu au démarrage
resetGame();

// Réinitialiser le jeu lorsque l'on clique sur le bouton
resetButton.addEventListener('click', resetGame);
