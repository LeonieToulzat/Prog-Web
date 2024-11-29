// Initialisation des grilles
const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

// Dimensions de la grille
const gridSize = 10;
const shipCount = 5; // Nombre de navires
let playerShips = [];
let computerShips = [];
let playerMoves = new Set();
let isPlacingShips = true;
let shipLength = 0; //Longueur du bateau

// Création d'une grille
function createGrid(board, isPlayerBoard) {
    board.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;

        if (isPlayerBoard && isPlacingShips) {
            // Permet au joueur de placer ses navires
            cell.addEventListener('click', () => placePlayerShip(cell, i));
        } else if (!isPlayerBoard) {
            // Permet au joueur d'attaquer l'ordinateur
            cell.addEventListener('click', () => handlePlayerAttack(cell, i));
        }

        board.appendChild(cell);
    }
}

// Placer des navires pour l'ordinateur
function placeRandomShips() {
    computerShips = [];
    while (computerShips.length < shipCount) {
        let position = Math.floor(Math.random() * gridSize * gridSize);
        if (!computerShips.includes(position)) {
            computerShips.push(position);
        }
    }
}

// Placer un navire pour le joueur
/*function placePlayerShip(cell, index) {
    if (playerShips.length >= shipCount) {
        message.textContent = "Tous vos navires sont placés !";
        return;
    }

    if (!playerShips.includes(index)) {
        playerShips.push(index);
        cell.classList.add('player-ship');
        message.textContent = `Navire placé ! (${playerShips.length}/${shipCount})`;

        if (playerShips.length === shipCount) {
            message.textContent = "Tous vos navires sont placés ! À vous de jouer !";
            isPlacingShips = false;
            createGrid(computerBoard, false); // Permet les attaques sur la grille de l'ordinateur
        }
    } else {
        message.textContent = "Un navire est déjà placé ici !";
    }
}*/


function placePlayerShip(cell,index) {
    if (playerShips.length >= shipCount) {
        message.textContent = "Tous vos navires sont placés !";
        return;
    }
    if (!playerShips.push(index)) {
        message.textContent = 'Placez un navire long de 5 cases.';
        while (shiplength<5) {
            //playerShips.push(index) ;
            shipLength=shipLength+1;
            cell.classList.add('player-ship');
        } 
        playerShips.push(index) ;
        message.textContent = 'Navire placé ! (${playerShips.length}/${shipCount})';

    }
}

// Gérer une attaque du joueur sur l'ordinateur
function handlePlayerAttack(cell, index) {
    if (playerMoves.has(index)) {
        message.textContent = "Vous avez déjà attaqué ici !";
        return;
    }

    playerMoves.add(index); // Enregistre le coup joué

    if (computerShips.includes(index)) {
        cell.classList.add('hit');
        message.textContent = "Touché !";
        computerShips = computerShips.filter(ship => ship !== index); // Retire le navire touché
        if (computerShips.length === 0) {
            message.textContent = "Vous avez gagné !";
        }
    } else {
        cell.classList.add('miss');
        message.textContent = "Coup dans l'eau.";
    }
}

// Réinitialiser le jeu
function resetGame() {
    playerShips = [];
    computerShips = [];
    playerMoves.clear();
    isPlacingShips = true;

    createGrid(playerBoard, true); // Plateau du joueur (permet le placement des navires)
    createGrid(computerBoard, false); // Plateau de l'ordinateur
    placeRandomShips();

    message.textContent = "Placez vos navires sur le plateau de gauche !";
}

// Initialiser le jeu au démarrage
resetGame();

// Réinitialiser le jeu lorsque l'on clique sur le bouton
resetButton.addEventListener('click', resetGame);
