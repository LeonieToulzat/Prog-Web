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
*/

const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const resetButton = document.getElementById('reset-button');
const confirmButton = document.getElementById('confirm-button');
const confirmPlacementButton = document.getElementById('confirm-placement');
const message = document.getElementById('message');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

const gridSize = 10; // Taille de la grille
const maxShips = 5; // Nombre total de bateaux
const shipLengths = [5, 4, 3, 3, 2]; // Longueurs des bateaux

let playerShips = [];
let computerShips = [];
let currentSelections = [];
let selectedAttacks = [];
let placedShipsCount = 0;
let currentTurn = "player";
let end = false;
let endgame = false;
/*
// === Bouton des règles du jeu ===
const rulesButton = document.getElementById('rules-button');
rulesButton.addEventListener('click', () => {
    alert(`Règles du jeu :\n\n- Chaque flotte est composée de 1 bateau long de 5 cases, 1 bateau long de 4 cases, 2 bateaux longs de 3 cases, et 1 bateau long de 2 cases. \n- Placez vos bateaux sur votre grille en cliquant sur le bon nombre de cases adjacentes, puis en validant le placement.\n- Les cases doivent être alignées horizontalement ou verticalement.\n- Une fois tous vos bateaux placés, commencez à attaquer la grille de l'ordinateur en sélectionnant une case sur la grille puis en validant l'attaque avec le bouton.\n -Un coup manqué (dans l'eau) fait une case bleue, un coup réussi (bateau touché) fait une case rouge.\n- Le but est de couler tous les bateaux de l'adversaire avant qu'il ne coule les vôtres.\n\nAstuces :\n- Essayez de répartir vos bateaux pour les rendre difficiles à trouver.\n- Notez les positions des coups réussis pour optimiser vos attaques.\n- Préférez attaquer méthodiquement, ligne par ligne, ou selon un motif logique.`);
});*/




function openrules() {
    const over =document.getElementById("overlay");
    const popDialog =document.getElementById("popupDialog");
    over.classList.toggle("hidden");
    popDialog.classList.toggle("hidden");
    popDialog.style.opacity =
        popDialog.style.opacity ===
            "1"
            ? "0"
            : "1";
}

// === Création des grilles ===
function createGrid(board, isPlayerBoard) {
    board.innerHTML = '';
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

// === Affichage des messages ===
function showMessage(text) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.parentElement.classList.add('show');
    
    // Supprimer l'animation après 2s pour pouvoir la rejouer
    setTimeout(() => {
        message.parentElement.classList.remove('show');
    }, 2000);
}

// === Fonction pour jouer un son ===
function playSound(sound) {
    sound.play();
}

// === Calculer les positions d'un bateau ===
function calculateShipPositions(startIndex, length, direction) {
    const positions = [];
    for (let i = 0; i < length; i++) {
        if (direction === 'horizontal') {
            const pos = startIndex + i;
            if (Math.floor(pos / gridSize) !== Math.floor(startIndex / gridSize)) {break;} // Dépassement horizontal
            positions.push(pos);
        } else {
            const pos = startIndex + i * gridSize;
            if (pos >= gridSize * gridSize) {break;} // Dépassement vertical
            positions.push(pos);
        }
    }
    return positions;
}

// === Vérifier si une sélection ou un placement est valide ===
function isValidSelection(positions) {
    positions.sort((a, b) => a - b);
    const isHorizontal = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + 1);
    const isVertical = positions.every((pos, i, arr) => i === 0 || pos === arr[i - 1] + gridSize);
    return isHorizontal || isVertical;
}

function isValidPlacement(positions, length, allShips) {
    return positions.length===length && positions.every(pos =>
        pos >= 0 &&
        pos < gridSize * gridSize &&
        !allShips.includes(pos)
    );
}

// Placement des bateaux de l'utilisateur //

// === Sélection des cases pour les bateaux ===
function selectCell(cell, index) {
    if (placedShipsCount >= maxShips || end || currentTurn !== "player") return;

    if (!currentSelections.includes(index) && !playerShips.includes(index)) {
        currentSelections.push(index);
        cell.classList.add('selected'); // Colorer immédiatement la case
    } else if (currentSelections.includes(index)) {
        currentSelections = currentSelections.filter(pos => pos !== index);
        cell.classList.remove('selected');
    }
}

// === Valider le placement des bateaux ===
function confirmPlacement() {
    /*if (currentSelections.length < 2) {
        message.textContent = "Veuillez sélectionner au moins 2 cases adjacentes.";
        return;
    }
    if (currentSelections.length > 5) {
        message.textContent = "Bateau trop long !";
        return;
    }*/

    if (currentSelections.length !== shipLengths[placedShipsCount]) {
         showMessage("Sélectionnez un bateau de longueur " + shipLengths[placedShipsCount] + " cases.") ;
        return;
    }

    if (isValidSelection(currentSelections)) {
        currentSelections.forEach(pos => {
            playerShips.push(pos);
            document.querySelector(`#player-board div[data-index="${pos}"]`).classList.add('player-ship');
        });

        placedShipsCount++;
        currentSelections = [];
        showMessage(`Bateau placé (${placedShipsCount}/${maxShips})`);

        if (placedShipsCount === maxShips) {
            showMessage("Tous vos bateaux sont placés. L'ordinateur place ses bateaux...");
            placeComputerShips();
            showMessage("Les deux grilles sont prêtes. À vous de jouer !");
        }
    } else {
        showMessage("Les cases doivent être adjacentes.");
        clearSelections();
    }

}

function clearSelections() {
    currentSelections.forEach(pos => {
        document.querySelector(`#player-board div[data-index="${pos}"]`).classList.remove('selected');
    });
    currentSelections = [];
}

// Placement des bateaux de l'adversaire //

function placeComputerShips() {
    computerShips = [];
    for (let length of shipLengths) {
        let validPlacement = false;
        while (!validPlacement) {
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const startIndex = Math.floor(Math.random() * gridSize * gridSize);
            const positions = calculateShipPositions(startIndex, length, direction);

            if (isValidPlacement(positions, length, computerShips)) {
                computerShips.push(...positions);
                validPlacement = true;
            }
        }
    }
}

// Gestion des attaques //

// === Attaque du joueur ===
function handlePlayerAttack(cell, index) {
   /* if (endgame===true) return; */
    if (end || currentTurn !== "player") return;

    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
        selectedAttacks.push(index);
        cell.classList.add('selected-attack'); // Colorer immédiatement
    } else {
        selectedAttacks = selectedAttacks.filter(pos => pos !== index);
        cell.classList.remove('selected-attack');
    }
}

function confirmAttacks() {
    if (endgame===true) return;

    if (end || currentTurn !== "player") return;
    
    if (selectedAttacks.length > 1) {
        showMessage("Vous ne pouvez attaquer qu'une case à la fois.");
        selectedAttacks = [];
        document.querySelectorAll('.selected-attack').forEach(cell => cell.classList.remove('selected-attack'));
        return;
    }

    selectedAttacks.forEach(index => {
        const cell = document.querySelector(`#computer-board div[data-index="${index}"]`);
        cell.classList.add('selected-attack'); // Colorer les cases sélectionnées
        if (computerShips.includes(index)) {
            let audio1 = new Audio("Boum.mp3");
            playSound(audio1);
            cell.classList.add('hit');
            showMessage("Touché !");
        } else {
            let audio2 = new Audio("Plouf.mp3");
            playSound(audio2);
            cell.classList.add('miss');
            showMessage("Manqué.");
        }
    });

    updateScore(computerShips, "computer");
    selectedAttacks = [];
    document.querySelectorAll('.selected-attack').forEach(cell => cell.classList.remove('selected-attack'));

    if (!end) {
        currentTurn = "computer";
        setTimeout(computerAttack, 1500); // L'ordinateur joue après 1.5 secondes
    }
}

// === Attaque de l'ordinateur ===
function computerAttack() {
    if (endgame===true) return;
    if (end || currentTurn !== "computer") return;

    let index;
    do {
        index = Math.floor(Math.random() * gridSize * gridSize);
    } while (document.querySelector(`#player-board div[data-index="${index}"]`).classList.contains('hit') ||
             document.querySelector(`#player-board div[data-index="${index}"]`).classList.contains('miss'));

    const cell = document.querySelector(`#player-board div[data-index="${index}"]`);
    if (playerShips.includes(index)) {
        //cell.classList.add('hit');
        cell.classList.remove('player-ship');
        cell.classList.remove('selected');
        let audio1 = new Audio("Boum.mp3");
        playSound(audio1);
        cell.classList.add('hit');
        
        showMessage("L'ordinateur a touché un de vos bateaux !");
        updateScore(playerShips, "player");
    } else {
        let audio2 = new Audio("Plouf.mp3");
        playSound(audio2);
        cell.classList.add('miss');
        showMessage("L'ordinateur a manqué.");
    }

    if (!end) {
        currentTurn = "player";
        showMessage("À votre tour !");
    }
}

// === Mise à jour des scores ===
function updateScore(ships, playerType) {
    const hits = ships.filter(pos => document.querySelector(`#${playerType === 'player' ? 'player-board' : 'computer-board'} div[data-index="${pos}"]`).classList.contains('hit')).length;
    const remaining = ships.length - hits;

    if (playerType === "player") {
        playerScore.textContent = `Vos cases restantes : ${remaining}`;
        if (remaining === 0){
            let loseSound = new Audio('lose-sound.mp3'); 
            playSound(loseSound);
        } 
    } else {
        computerScore.textContent = `Cases adversaires restantes : ${remaining}`;
        if (remaining === 0){
            let winSound = new Audio('winning.mp3'); 
            playSound(winSound);
        } 
    }

    if (remaining === 0) {
        finishGame(playerType === "player" ? "L'ordinateur a gagné !" : "Vous avez gagné !");
    }
}

// === Réinitialisation ===
function resetGame() {
    playerShips = [];
    computerShips = [];
    currentSelections = [];
    selectedAttacks = [];
    placedShipsCount = 0;
    currentTurn = "player";
    end = false;

    createGrid(playerBoard, true);
    createGrid(computerBoard, false);

    playerScore.textContent = "Vos cases restantes : 17";
    computerScore.textContent = "Cases adversaires restantes : 17";

    showMessage("Placez vos bateaux en sélectionnant les cases sur votre grille et en validant.");
}

// === Fin du jeu ===
function finishGame(msg) {
    showMessage(msg);
    endgame = true;
}

resetButton.addEventListener('click', resetGame);
confirmButton.addEventListener('click', confirmAttacks);
confirmPlacementButton.addEventListener('click', confirmPlacement);

// === Initialisation ===
resetGame()
