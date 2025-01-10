/*
const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const resetButton = document.getElementById('reset-button');
const confirmButton = document.getElementById('confirm-button');
const message = document.getElementById('message');

const gridSize = 10; // Taille de la grille
const maxShips = 5; // Nombre total de bateaux
const shipLengths = [5, 4, 3, 3, 2]; // Longueurs des bateaux
let end = false; // Fin de la partie

let playerShips = []; // Positions des bateaux du joueur
let computerShips = []; // Positions des bateaux de l'adversaire
let currentSelections = []; // Cases temporairement sélectionnées par le joueur
let placedShipsCount = 0; // Nombre de bateaux placés par le joueur

/*
// === Bouton des règles du jeu ===
const rulesButton = document.getElementById('rules-button');
rulesButton.addEventListener('click', () => {
    alert(`Règles du jeu :\n\n- Chaque flotte est composée de 1 bateau long de 5 cases, 1 bateau long de 4 cases, 2 bateaux longs de 3 cases, et 1 bateau long de 2 cases. \n- Placez vos bateaux sur votre grille en cliquant sur le bon nombre de cases adjacentes, puis en validant le placement.\n- Les cases doivent être alignées horizontalement ou verticalement.\n- Une fois tous vos bateaux placés, commencez à attaquer la grille de l'ordinateur en sélectionnant une case sur la grille puis en validant l'attaque avec le bouton.\n -Un coup manqué (dans l'eau) fait une case bleue, un coup réussi (bateau touché) fait une case rouge.\n- Le but est de couler tous les bateaux de l'adversaire avant qu'il ne coule les vôtres.\n\nAstuces :\n- Essayez de répartir vos bateaux pour les rendre difficiles à trouver.\n- Notez les positions des coups réussis pour optimiser vos attaques.\n- Préférez attaquer méthodiquement, ligne par ligne, ou selon un motif logique.`);
});

// === Création des grilles ===
function createGrid(board, isPlayerBoard) {
    board.innerHTML = ''; // Vide la grille
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;

        if (isPlayerBoard) {
            cell.addEventListener('click', () => selectCell(cell, i));
        } else {
            cell.addEventListener('click', () => handlePlayerAttack(cell, i));
        }

        board.appendChild(cell);
    }
}

// === Sélection des cases pour le joueur ===
function selectCell(cell, index) {
    if (placedShipsCount >= maxShips) {
        message.textContent = "Tous vos bateaux sont placés !";
        return;
    }

    if (!currentSelections.includes(index) && !playerShips.includes(index)) {
        currentSelections.push(index);
        cell.classList.add('selected');
    } else if (currentSelections.includes(index)) {
        currentSelections = currentSelections.filter(pos => pos !== index);
        cell.classList.remove('selected');
    }
}

// === Valider le placement des bateaux ===
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
        currentSelections.forEach(pos => {
            playerShips.push(pos);
            document.querySelector(`#player-board div[data-index="${pos}"]`).classList.add('player-ship');
        });

        placedShipsCount++;
        message.textContent = `Bateau placé (${placedShipsCount}/${maxShips})`;
        currentSelections = [];

        if (placedShipsCount === maxShips) {
            message.textContent = "Tous vos bateaux sont placés ! L'adversaire place ses bateaux...";
            placeComputerShips();
            message.textContent = "Les deux grilles sont prêtes. À vous de jouer !";
        }
    } else {
        message.textContent = "Les cases doivent être adjacentes et valides.";
        clearSelections();
    }
}

// === Vérifier si les positions sélectionnées sont valides ===
function isValidSelection(positions) {
    positions.sort((a, b) => a - b);
    const isHorizontal = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + 1);
    const isVertical = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + gridSize);
    return isHorizontal || isVertical;
}

function clearSelections() {
    currentSelections.forEach(pos => {
        document.querySelector(`#player-board div[data-index="${pos}"]`).classList.remove('selected');
    });
    currentSelections = [];
}

// === Placement des bateaux de l'adversaire ===
function placeComputerShips() {
    computerShips = [];
    shipLengths.forEach(length => {
        let validPlacement = false;

        while (!validPlacement) {
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const startIndex = Math.floor(Math.random() * gridSize * gridSize);
            //const length = Math.floor(Math.random() * 4) + 2; // Length between 2 and 5
            length = length > 5 ? 5 : length;   // Pour éviter les bateaux trop longs
            length = length < 2 ? 2 : length;   // Pour éviter les bateaux trop courts
            const positions = calculateShipPositions(startIndex, length, direction);

            if (isValidPlacement(positions, computerShips)) {
                computerShips.push(...positions);
                validPlacement = true;

            // Pour TEST : Rendre visibles les bateaux de l'adversaire (supprime en production)
                positions.forEach(pos => {
                    const cell = document.querySelector(`#computer-board div[data-index="${pos}"]`);
                    cell.classList.add('computer-ship');
                });
            }
        }
    });
}

// === Calculer les positions d'un bateau selon la direction ===
function calculateShipPositions(startIndex, length, direction) {
    let positions = [];
    for (let i = 0; i < length; i++) {
        if (direction === 'horizontal') {
            const pos = startIndex + i;
            if (Math.floor(pos / gridSize) !== Math.floor(startIndex / gridSize)) break; // Dépassement horizontal
            positions.push(pos);
        } else {
            const pos = startIndex + i * gridSize;
            if (pos >= gridSize * gridSize) break; // Dépassement vertical
            positions.push(pos);
        }
    }
    return positions;
}

// === Vérifier si les positions sont valides ===
function isValidPlacement(positions, allShips) {
    return positions.length > 0 && positions.every(pos =>
        pos >= 0 &&
        pos < gridSize * gridSize &&
        !allShips.includes(pos)
    );
}

// === Attaque du joueur ===
function handlePlayerAttack(cell, index) {
    while (end===false) {

        if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

        if (computerShips.includes(index)) {
            cell.classList.add('hit');
            message.textContent = "Touché !";
            if (computerShips.every(pos => cell.parentElement.children[pos].classList.contains('hit'))) {
                finishGame();
            }
        } else {
            cell.classList.add('miss');
            message.textContent = "Manqué !";
        }
    }
}

// === Réinitialiser le jeu ===
function resetGame() {
    playerShips = [];
    computerShips = [];
    currentSelections = [];
    placedShipsCount = 0;

    createGrid(playerBoard, true);
    createGrid(computerBoard, false);

    message.textContent = "Placez vos bateaux en sélectionnant les cases et en validant.";
}

function finishGame() {
    message.textContent = "Vous avez gagné !";
    end = true;
}


// === Initialisation du jeu ===
resetButton.addEventListener('click', resetGame);
confirmButton.addEventListener('click', confirmPlacement);
resetGame();

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
