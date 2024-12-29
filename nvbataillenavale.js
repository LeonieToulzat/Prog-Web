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