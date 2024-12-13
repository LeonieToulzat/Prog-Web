/*
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
            cell.addEventListener('click', () => placePlayerShip(cell,i));
            
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
(let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
    if (!playerShips.includes(index)) {
        playerShips.push(index);
        cell.classList.add('player-ship');
        message.textContent = `Navire placé ! (${playerShips.length}/${shipCount})`;

        if (playerShips.length === shipCount) {
            message.textContent = "Tous vos navires sont placés ! À vous de jouer (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;!";
            isPlacingShips = false;lacePlayerSh
            createGrid(computerBoard, false); // Permet les attaques sur la grille de l'ordinateur
        }
    } else {
        message.textContent = "Un navire est déjà placé ici !";
    }
}*/

/*
function placePlayerShip(cell,index) {
    if (playerShips.length >= shipCount) {
        message.textContent = "Tous vos navires sont placés !";
        return;
    }
    if (!playerShips.includes(index)) {
        message.textContent = 'Placez un navire long de 5 cases.';
        while (shiplength<5) {
            playerShips.push(index) ;
            shipLength=shipLength+1;
            cell.classList.add('player-ship');
        } 
        playerShips.push(index) ;
        cell.classList.add('player-ship');
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

    createGrid(playerBoard, true); // Plateau u joueur (permet le placement des navires)
    createGrid(computerBoard, false); // Plateau de l'ordinateur
    placeRandomShips();

    /*message.textContent = "Placez vos navires sur le plateau de gauche !";*/
//}

// Initialiser le jeu au démarrage
/*
resetGame();

// Réinitialiser le jeu lorsque l'on clique sur le bouton
resetButton.addEventListener('click', resetGame);
*/
const playerBoard = document.getElementById('player-board');
const resetButton = document.getElementById('reset-button');
const confirmButton = document.getElementById('confirm-button');
const message = document.getElementById('message');

const gridSize = 10;
const maxShips = 5; // Nombre total de bateaux à placer
let playerShips = []; // Contient les positions des navires placés
let currentSelections = []; // Cases temporairement sélectionnées
let placedShipsCount = 0; // Compteur de bateaux placés

// Crée la grille pour le joueur
function createGrid() {
    playerBoard.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', () => selectCell(cell, i));
        playerBoard.appendChild(cell);
    }
}

// Fonction pour sélectionner une case
function selectCell(cell, index) {
    if (placedShipsCount >= maxShips) {
        message.textContent = "Tous vos bateaux sont placés !";
        return;
    }

    // Sélection ou désélection des cases
    if (!currentSelections.includes(index) && !playerShips.includes(index)) {
        currentSelections.push(index);
        cell.classList.add('selected');
    } else if (currentSelections.includes(index)) {
        currentSelections = currentSelections.filter(pos => pos !== index);
        cell.classList.remove('selected');
    }
}

// Confirmer le placement d'un bateau
function confirmPlacement() {
    if (currentSelections.length < 2) {
        message.textContent = "Veuillez sélectionner au moins 2 cases adjacentes.";
        return;
    }

    if (currentSelections.length > 5) {
        message.textContent = "Bateau trop long !";
        return;
    }

    if (isValidSelection(currentSelections)) {
        // Valider le bateau
        currentSelections.forEach(pos => {
            playerShips.push(pos);
            const shipCell = document.querySelector(`#player-board div[data-index="${pos}"]`);
            shipCell.classList.add('player-ship');
            shipCell.classList.remove('selected');
        });

        placedShipsCount++;
        message.textContent = `Bateau placé (${placedShipsCount}/${maxShips})`;

        if (placedShipsCount === maxShips) {
            message.textContent = "Tous vos bateaux sont placés !";
        }

        currentSelections = []; // Réinitialiser les sélections
    } else {
        message.textContent = "Positions invalides. Les cases doivent être adjacentes.";
        clearSelections();
    }
}

// Vérifier si les positions sont valides (adjacentes horizontalement ou verticalement)
function isValidSelection(positions) {
    positions.sort((a, b) => a - b);
    const isHorizontal = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + 1);
    const isVertical = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + gridSize);
    return isHorizontal || isVertical;
}

// Effacer les sélections en cas d'erreur
function clearSelections() {
    currentSelections.forEach(pos => {
        const cell = document.querySelector(`#player-board div[data-index="${pos}"]`);
        cell.classList.remove('selected');
    });
    currentSelections = [];
}

// Réinitialiser le jeu
function resetGame() {
    playerShips = [];
    currentSelections = [];
    placedShipsCount = 0;
    createGrid();
    message.textContent = "Placez vos bateaux en sélectionnant les cases et en validant.";
}

// Initialisation du jeu
resetButton.addEventListener('click', resetGame);
confirmButton.addEventListener('click', confirmPlacement);
resetGame();