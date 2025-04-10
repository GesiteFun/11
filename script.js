// script.js

// --- Data Game (Lengkap 20 Game) ---
const gamesData = [
    // --- Game Fungsional (1-5) ---
    { id: 'add-match', title: 'Addition Match', description: 'Cocokkan soal penjumlahan dengan jawaban yang benar.', age: ['TK', 'Kelas 1'], topic: 'Penjumlahan', icon: 'add', launchFunction: startGameAdditionMatch },
    { id: 'find-pattern', title: 'Find the Pattern', description: 'Temukan angka selanjutnya dalam pola bilangan.', age: ['Kelas 1', 'Kelas 2', 'Kelas 3'], topic: 'Pola', icon: 'pattern', launchFunction: startGameFindPattern },
    { id: 'tell-time', title: 'Telling Time Quiz', description: 'Baca jam analog dan pilih waktu digital yang benar.', age: ['Kelas 1', 'Kelas 2'], topic: 'Waktu', icon: 'time', launchFunction: startGameTellingTime },
    { id: 'math-memory', title: 'Math Memory Cards', description: 'Cocokkan kartu soal matematika dengan jawabannya.', age: ['TK', 'Kelas 1', 'Kelas 2'], topic: 'Logika', icon: 'memory', launchFunction: startGameMemoryCards },
    { id: 'frac-match', title: 'Fraction Match', description: 'Cocokkan representasi visual pecahan dengan bentuk angkanya.', age: ['Kelas 3', 'Kelas 4-6'], topic: 'Pecahan', icon: 'frac', launchFunction: startGameFractionMatch },

    // --- Game Placeholder (Skeleton Functions 6-20) ---
    { id: 'sub-bubble', title: 'Subtraction Bubble Pop', description: 'Pecahkan gelembung dengan jawaban pengurangan yang tepat.', age: ['TK', 'Kelas 1'], topic: 'Pengurangan', icon: 'sub', launchFunction: startGameSubtractionBubblePop },
    { id: 'mul-bingo', title: 'Multiplication Bingo', description: 'Tandai kotak bingo dengan hasil perkalian yang benar.', age: ['Kelas 2', 'Kelas 3'], topic: 'Perkalian', icon: 'mul', launchFunction: startGameMultiplicationBingo },
    { id: 'count-coin', title: 'Count the Coins', description: 'Hitung jumlah total uang koin yang ditampilkan.', age: ['Kelas 1', 'Kelas 2'], topic: 'Uang', icon: 'coin', launchFunction: startGameCountCoins },
    { id: 'place-puzzle', title: 'Place Value Puzzle', description: 'Susun angka sesuai dengan nilai tempatnya.', age: ['Kelas 2', 'Kelas 3'], topic: 'Berhitung', icon: 'place', launchFunction: startGamePlaceValuePuzzle },
    { id: 'even-odd', title: 'Even or Odd Race', description: 'Kelompokkan angka genap dan ganjil secepat mungkin.', age: ['Kelas 1', 'Kelas 2'], topic: 'Berhitung', icon: 'odd', launchFunction: startGameEvenOddRace },
    { id: 'num-line', title: 'Number Line Jump', description: 'Lompat di garis bilangan untuk menyelesaikan soal.', age: ['Kelas 1', 'Kelas 2'], topic: 'Penjumlahan', icon: 'line', launchFunction: startGameNumberLineJump },
    { id: 'math-type', title: 'Math Typing Sprint', description: 'Ketik jawaban soal matematika secepat mungkin.', age: ['Kelas 3', 'Kelas 4-6'], topic: 'Perkalian', icon: 'type', launchFunction: startGameMathTypingSprint },
    { id: 'make-24', title: 'Make 24 Game', description: 'Gunakan 4 angka (dan operasi + - * /) untuk mendapatkan hasil 24.', age: ['Kelas 4-6'], topic: 'Logika', icon: 'make24', launchFunction: startGameMake24 },
    { id: 'shape-sort', title: 'Shape Sorter', description: 'Kelompokkan bentuk-bentuk geometri yang berbeda.', age: ['Pre-K', 'TK'], topic: 'Geometri', icon: 'shape', launchFunction: startGameShapeSorter },
    { id: 'area-peri', title: 'Area and Perimeter Challenge', description: 'Hitung luas dan keliling bangun datar.', age: ['Kelas 4-6'], topic: 'Ukuran', icon: 'area', launchFunction: startGameAreaPerimeter },
    { id: 'div-duel', title: 'Division Duel', description: 'Selesaikan soal pembagian lebih cepat dari lawan (simulasi).', age: ['Kelas 3', 'Kelas 4-6'], topic: 'Pembagian', icon: 'div', launchFunction: startGameDivisionDuel },
    { id: 'eq-puzzle', title: 'Equation Puzzle Drag-and-Drop', description: 'Susun angka dan operator untuk membentuk persamaan yang benar.', age: ['Kelas 2', 'Kelas 3'], topic: 'Logika', icon: 'puzzle', launchFunction: startGameEquationPuzzle },
    { id: 'estimate', title: 'Estimate It!', description: 'Perkirakan jumlah objek yang ditampilkan dalam gambar.', age: ['Kelas 1', 'Kelas 2'], topic: 'Berhitung', icon: 'estim', launchFunction: startGameEstimateIt },
    { id: 'kenken', title: 'KenKen Grid Basic', description: 'Isi kotak dengan angka (1-3 atau 1-4) sesuai aturan KenKen.', age: ['Kelas 4-6'], topic: 'Logika', icon: 'kenken', launchFunction: startGameKenKen },
    { id: 'quick-react', title: 'Quick Math Reaction Game', description: 'Jawab benar atau salah untuk soal matematika dalam waktu singkat.', age: ['Kelas 2', 'Kelas 3', 'Kelas 4-6'], topic: 'Penjumlahan', icon: 'react', launchFunction: startGameQuickReaction },
];

// --- DOM Elements References ---
const gameGrid = document.getElementById('game-grid');
const filterAge = document.getElementById('filter-age');
const filterTopic = document.getElementById('filter-topic');
const modal = document.getElementById('game-modal');
const modalTitle = document.getElementById('game-modal-title');
const modalDescription = document.getElementById('game-modal-description');
const gameArea = document.getElementById('game-area');
const gameScoreDisplay = document.getElementById('game-score');
const highScoreDisplay = document.getElementById('high-score');
const gameFeedback = document.getElementById('game-feedback');
const closeButton = document.querySelector('.close-button');
const restartButton = document.getElementById('restart-game-button');
const currentYearSpan = document.getElementById('current-year');

// --- Global State Variables ---
let currentGameId = null; // Stores the ID of the game currently open in the modal
let currentGameFunction = null; // Stores the launch function of the current game for restart

// --- Core Functions ---

/**
 * Displays game cards in the grid based on the provided array of games.
 * @param {Array} gamesToDisplay - Array of game objects to display.
 */
function displayGames(gamesToDisplay) {
    gameGrid.innerHTML = ''; // Clear existing grid content
    if (gamesToDisplay.length === 0) {
        gameGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">Tidak ada game yang cocok dengan filter ini.</p>';
        return;
    }
    gamesToDisplay.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.gameId = game.id; // Set data attribute for identifying the game

        const thumbnail = document.createElement('div');
        thumbnail.className = 'game-thumbnail';
        thumbnail.dataset.icon = game.icon || 'default';

        const info = document.createElement('div');
        info.className = 'game-info';

        const title = document.createElement('h3');
        title.textContent = game.title;

        const description = document.createElement('p');
        description.textContent = game.description.length > 60 ? game.description.substring(0, 60) + '...' : game.description;

        const tags = document.createElement('div');
        tags.className = 'game-tags';
        game.age.forEach(ageTag => {
            const span = document.createElement('span');
            span.textContent = ageTag;
            tags.appendChild(span);
        });
        const topicTag = document.createElement('span');
        topicTag.textContent = game.topic;
        topicTag.style.backgroundColor = '#d1eaff';
        tags.appendChild(topicTag);

        info.appendChild(title);
        info.appendChild(description);
        info.appendChild(tags);
        card.appendChild(thumbnail);
        card.appendChild(info);

        gameGrid.appendChild(card);
    });
}

/**
 * Filters the gamesData array based on selected age and topic filters,
 * then calls displayGames to update the grid.
 */
function filterGames() {
    const selectedAge = filterAge.value;
    const selectedTopic = filterTopic.value;

    const filteredGames = gamesData.filter(game => {
        const ageMatch = selectedAge === 'all' || (game.age && game.age.includes(selectedAge));
        const topicMatch = selectedTopic === 'all' || game.topic === selectedTopic;
        return ageMatch && topicMatch;
    });

    displayGames(filteredGames);
}

/**
 * Opens the game modal, populates it with the selected game's details,
 * retrieves the high score, and calls the game's specific launch function.
 * @param {string} gameId - The ID of the game to open.
 */
function openGameModal(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) {
        console.error("Game data not found for ID:", gameId);
        return;
    }

    currentGameId = game.id;
    currentGameFunction = game.launchFunction;

    modalTitle.textContent = game.title;
    modalDescription.textContent = game.description;

    gameArea.innerHTML = '';
    gameFeedback.textContent = '';
    gameFeedback.className = 'game-feedback';

    updateScoreDisplay(0, game.id);

    if (typeof game.launchFunction === 'function') {
        // Directly call the skeleton function if it is assigned
        game.launchFunction(game, gameArea);
        // Decide whether to show restart based on if the function is the placeholder
        restartButton.style.display = (game.launchFunction !== placeholderGameSkeleton) ? 'inline-block' : 'none';
    } else {
        console.error("Launch function is not defined for game:", gameId);
        gameArea.innerHTML = '<p>Error: Fungsi permainan tidak ditemukan.</p>';
        restartButton.style.display = 'none';
    }

    modal.style.display = 'block';
}

/**
 * Closes the game modal and clears its state.
 */
function closeModal() {
    modal.style.display = 'none';
    gameArea.innerHTML = '';
    currentGameId = null;
    currentGameFunction = null;
    restartButton.style.display = 'none';
}

/**
 * Updates the score display in the modal.
 * @param {number} currentScore - The player's current score in the game.
 * @param {string} gameIdForHighScore - The ID used to fetch the correct high score.
 */
function updateScoreDisplay(currentScore, gameIdForHighScore) {
     const highScore = localStorage.getItem(`highScore_${gameIdForHighScore}`) || 0;
     gameScoreDisplay.textContent = `Skor: ${currentScore}`;
     highScoreDisplay.textContent = highScore;
}

/**
 * Saves the score to localStorage if it's higher than the current high score.
 * @param {string} gameId - The ID of the game to save the score for.
 * @param {number} score - The score achieved by the player.
 */
function saveHighScore(gameId, score) {
     const currentHighScore = parseInt(localStorage.getItem(`highScore_${gameId}`) || 0);
     if (score > currentHighScore) {
         localStorage.setItem(`highScore_${gameId}`, score);
         highScoreDisplay.textContent = score;
         console.log(`New high score for ${gameId}: ${score}`);
     }
}

/**
 * Displays feedback messages (e.g., "Benar!", "Coba lagi!") to the user.
 * @param {string} message - The feedback message text.
 * @param {boolean|null} isCorrect - True for correct, false for incorrect, null for neutral/info.
 */
function showFeedback(message, isCorrect) {
    gameFeedback.textContent = message;
    gameFeedback.className = 'game-feedback';
    if (isCorrect === true) {
        gameFeedback.classList.add('feedback-correct');
    } else if (isCorrect === false) {
        gameFeedback.classList.add('feedback-incorrect');
    }
    // Optional: Auto-clear feedback after a delay
    setTimeout(() => {
        // Only clear if the message hasn't changed in the meantime
        if (gameFeedback.textContent === message) {
           gameFeedback.textContent = '';
           gameFeedback.className = 'game-feedback';
        }
    }, 2500);
}

/**
 * Restarts the game currently loaded in the modal.
 */
function restartCurrentGame() {
    if (currentGameId && typeof currentGameFunction === 'function') {
        const game = gamesData.find(g => g.id === currentGameId);
        if(game) {
            gameArea.innerHTML = '';
            gameFeedback.textContent = '';
            gameFeedback.className = 'game-feedback';
            updateScoreDisplay(0, currentGameId);
            currentGameFunction(game, gameArea);
        } else {
             console.error("Could not find game data to restart:", currentGameId);
        }
    } else {
         console.warn("No current game or launch function available to restart.");
    }
}


// --- Game Implementation Functions ---

// --- GAME 1: Addition Match (Functional) ---
function startGameAdditionMatch(game, container) {
    let score = 0;
    let selectedProblem = null;
    let selectedAnswer = null;
    let matchesMade = 0;
    const numPairs = 5;

    function generateProblems() {
        const items = [];
        const usedSums = new Set();
        while(items.length < numPairs * 2) {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const sum = num1 + num2;
            const problemText = `${num1} + ${num2}`;
            if (!usedSums.has(sum)) {
                 const matchId = items.length / 2;
                 items.push({ type: 'problem', value: problemText, matchId: matchId });
                 items.push({ type: 'answer', value: sum.toString(), matchId: matchId });
                 usedSums.add(sum);
            }
        }
        return items.sort(() => Math.random() - 0.5);
    }

    function renderGame() {
        container.innerHTML = '<p>Cocokkan soal penjumlahan dengan jawabannya!</p><div class="match-container"></div>';
        const matchContainer = container.querySelector('.match-container');
        const items = generateProblems();
        matchContainer.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'match-item';
            div.textContent = item.value;
            div.dataset.type = item.type;
            div.dataset.matchId = item.matchId;
            div.addEventListener('click', handleItemClick);
            matchContainer.appendChild(div);
        });
        updateScoreDisplay(score, game.id);
        matchesMade = 0;
        selectedProblem = null;
        selectedAnswer = null;
    }

    function handleItemClick(event) {
        const clickedItem = event.target;
        if (clickedItem.classList.contains('matched') || clickedItem.classList.contains('selected')) return;
        const type = clickedItem.dataset.type;
        if (type === 'problem') {
            if (selectedProblem) selectedProblem.classList.remove('selected');
            selectedProblem = clickedItem;
            selectedProblem.classList.add('selected');
        } else {
            if (selectedAnswer) selectedAnswer.classList.remove('selected');
            selectedAnswer = clickedItem;
            selectedAnswer.classList.add('selected');
        }
        checkForMatch();
    }

    function checkForMatch() {
        if (selectedProblem && selectedAnswer) {
            const problemId = selectedProblem.dataset.matchId;
            const answerId = selectedAnswer.dataset.matchId;
            if (problemId === answerId) {
                score += 10;
                matchesMade++;
                showFeedback('Benar! +10 Poin', true);
                selectedProblem.classList.add('matched');
                selectedAnswer.classList.add('matched');
                selectedProblem.classList.remove('selected');
                selectedAnswer.classList.remove('selected');
                selectedProblem = null;
                selectedAnswer = null;
                updateScoreDisplay(score, game.id);
                if (matchesMade === numPairs) {
                    showFeedback(`Hebat! Semua pasangan ditemukan! Skor Akhir: ${score}`, null);
                    saveHighScore(game.id, score);
                    container.querySelectorAll('.match-item:not(.matched)').forEach(item => item.style.pointerEvents = 'none');
                }
            } else {
                showFeedback('Oops, coba lagi!', false);
                selectedProblem.style.borderColor = '#d9534f';
                selectedAnswer.style.borderColor = '#d9534f';
                setTimeout(() => {
                     if (selectedProblem) {
                         selectedProblem.classList.remove('selected');
                         selectedProblem.style.borderColor = '';
                     }
                     if (selectedAnswer) {
                          selectedAnswer.classList.remove('selected');
                          selectedAnswer.style.borderColor = '';
                     }
                     selectedProblem = null;
                     selectedAnswer = null;
                 }, 500);
                 updateScoreDisplay(score, game.id);
            }
        }
    }
    renderGame();
}

// --- GAME 2: Find the Pattern (Functional) ---
function startGameFindPattern(game, container) {
     let score = 0;
     let currentPattern = [];
     let nextNumber = 0;
     let attempts = 0;

     function generatePattern() {
         attempts = 0;
         const patternType = Math.random() < 0.6 ? 'arithmetic' : 'geometric';
         const start = Math.floor(Math.random() * 10) + 1;
         const length = 4;
         currentPattern = [];
         if (patternType === 'arithmetic') {
             const diff = Math.floor(Math.random() * 5) + 1;
             for (let i = 0; i < length; i++) {
                 currentPattern.push(start + i * diff);
             }
             nextNumber = start + length * diff;
         } else {
             const factor = Math.floor(Math.random() * 3) + 2;
              let currentNum = start;
              for (let i = 0; i < length; i++) {
                  currentPattern.push(currentNum);
                  currentNum *= factor;
              }
              nextNumber = currentNum;
         }
     }

     function renderGame() {
         generatePattern();
         container.innerHTML = `
            <p>Temukan angka selanjutnya dalam pola berikut:</p>
            <div class="pattern-display">${currentPattern.join(',&nbsp; ')},&nbsp; ___</div>
            <div class="pattern-input-area">
                <input type="number" id="pattern-input" class="pattern-input" placeholder="?">
                <button id="pattern-submit" class="game-button">Cek</button>
            </div>
         `;
         updateScoreDisplay(score, game.id);
         const inputElement = container.querySelector('#pattern-input');
         container.querySelector('#pattern-submit').addEventListener('click', checkAnswer);
         inputElement.addEventListener('keypress', function(e) {
             if (e.key === 'Enter') checkAnswer();
         });
         inputElement.focus();
     }

     function checkAnswer() {
         const inputElement = container.querySelector('#pattern-input');
         const userAnswer = parseInt(inputElement.value);
         if (isNaN(userAnswer)) {
             showFeedback('Harap masukkan jawaban berupa angka.', null);
             return;
         }
         if (userAnswer === nextNumber) {
             score += (attempts === 0) ? 15 : 10;
             showFeedback('Benar sekali! +'+((attempts === 0) ? 15 : 10)+' Poin', true);
             updateScoreDisplay(score, game.id);
             saveHighScore(game.id, score);
             setTimeout(renderGame, 1500);
         } else {
             attempts++;
             if (attempts < 2) {
                 showFeedback(`Belum tepat. Coba lagi!`, false);
                 inputElement.value = '';
                 inputElement.focus();
             } else {
                 showFeedback(`Salah. Jawaban yang benar adalah ${nextNumber}. Pola berikutnya...`, false);
                 updateScoreDisplay(score, game.id);
                 setTimeout(renderGame, 2000);
             }
         }
     }
     renderGame();
}

// --- GAME 3: Telling Time Quiz (Functional) ---
function startGameTellingTime(game, container) {
    let score = 0;
    let correctHour, correctMinute;

    function generateTime() {
        correctHour = Math.floor(Math.random() * 12);
        correctMinute = Math.floor(Math.random() * 12) * 5;
        const displayHour = correctHour === 0 ? 12 : correctHour;
        return { hour: displayHour, minute: correctMinute };
    }

    function formatTime12Hour(hour, minute) {
        return `${hour}:${minute < 10 ? '0' : ''}${minute}`;
    }

    function renderGame() {
        const time = generateTime();
        const correctTimeString = formatTime12Hour(time.hour, time.minute);
        const options = new Set([correctTimeString]);
        while (options.size < 4) {
            const wrongTime = generateTime();
            options.add(formatTime12Hour(wrongTime.hour, wrongTime.minute));
        }
        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
        const internalHourForCalc = time.hour % 12;
        const hourDegrees = (internalHourForCalc * 30) + (time.minute * 0.5);
        const minuteDegrees = time.minute * 6;

        container.innerHTML = `
            <p>Jam berapa yang ditunjukkan oleh jam analog ini?</p>
            <div class="clock-display">
                <div class="hour-hand" style="transform: translateX(-50%) rotate(${hourDegrees}deg);"></div>
                <div class="minute-hand" style="transform: translateX(-50%) rotate(${minuteDegrees}deg);"></div>
                <div class="clock-center"></div>
            </div>
            <div class="time-options">
                ${shuffledOptions.map(opt => `<button class="time-option game-button" data-time="${opt}">${opt}</button>`).join('')}
            </div>
        `;
        updateScoreDisplay(score, game.id);
        container.querySelectorAll('.time-option').forEach(button => {
            button.addEventListener('click', checkAnswer);
        });
    }

    function checkAnswer(event) {
        const selectedTime = event.target.dataset.time;
        const correctTime = formatTime12Hour(correctHour === 0 ? 12 : correctHour, correctMinute);
        container.querySelectorAll('.time-option').forEach(button => {
            button.disabled = true;
            if(selectedTime !== correctTime && button.dataset.time === correctTime) {
                 button.classList.add('correct');
            }
        });
        if (selectedTime === correctTime) {
            score += 10;
            showFeedback('Tepat sekali! +10 Poin', true);
            updateScoreDisplay(score, game.id);
            saveHighScore(game.id, score);
            setTimeout(renderGame, 1500);
        } else {
            showFeedback(`Kurang tepat. Jawaban: ${correctTime}. Jam berikutnya...`, false);
            updateScoreDisplay(score, game.id);
            setTimeout(renderGame, 2000);
        }
    }
    renderGame();
}

// --- GAME 4: Math Memory Cards (Functional) ---
function startGameMemoryCards(game, container) {
    let score = 0;
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;
    const numPairs = 6;

    function generateCardPairs() {
        const pairs = [];
        const values = new Set();
        const operations = ['+', '-'];
        while (pairs.length < numPairs) {
             const op = operations[Math.floor(Math.random() * operations.length)];
             let num1, num2, problem, answer;
             if (op === '+') {
                 num1 = Math.floor(Math.random() * 10) + 1;
                 num2 = Math.floor(Math.random() * 10) + 1;
                 problem = `${num1} + ${num2}`;
                 answer = (num1 + num2).toString();
             } else {
                 num1 = Math.floor(Math.random() * 10) + 5;
                 num2 = Math.floor(Math.random() * (num1 -1)) + 1;
                 problem = `${num1} - ${num2}`;
                 answer = (num1 - num2).toString();
             }
            if (!values.has(problem) && !values.has(answer)) {
                 const pairId = pairs.length;
                 pairs.push({ id: pairId, content: problem, type: 'problem' });
                 pairs.push({ id: pairId, content: answer, type: 'answer' });
                 values.add(problem);
                 values.add(answer);
            }
        }
        cards = [...pairs].sort(() => Math.random() - 0.5);
    }

    function renderGame() {
        generateCardPairs();
        matchedPairs = 0;
        flippedCards = [];
        lockBoard = false;
        container.innerHTML = `
            <p>Cocokkan soal matematika dengan jawabannya! Temukan ${numPairs} pasang.</p>
            <div class="memory-grid">
                ${cards.map((card, index) => `
                    <div class="memory-card" data-index="${index}" data-id="${card.id}" data-type="${card.type}">
                        <div class="card-inner">
                             <div class="card-face card-front">?</div>
                             <div class="card-face card-back">${card.content}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        updateScoreDisplay(score, game.id);
        container.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', handleCardFlip));
    }

    function handleCardFlip(event) {
        if (lockBoard) return;
        const clickedCard = event.currentTarget;
        if (clickedCard.classList.contains('is-matched') || clickedCard.classList.contains('is-flipped')) return;
        clickedCard.classList.add('is-flipped');
        flippedCards.push(clickedCard);
        if (flippedCards.length === 2) {
            lockBoard = true;
            checkForMemoryMatch();
        }
    }

    function checkForMemoryMatch() {
        const [card1, card2] = flippedCards;
        const id1 = card1.dataset.id;
        const id2 = card2.dataset.id;
        if (id1 === id2) {
            score += 15;
            matchedPairs++;
            showFeedback('Pasangan ditemukan! +15 Poin', true);
            card1.classList.add('is-matched');
            card2.classList.add('is-matched');
            updateScoreDisplay(score, game.id);
            resetBoardState(true);
            if (matchedPairs === numPairs) {
                showFeedback(`Luar biasa! Semua pasangan ditemukan! Skor Akhir: ${score}`, null);
                saveHighScore(game.id, score);
            }
        } else {
            showFeedback('Bukan pasangan. Coba ingat!', false);
            setTimeout(() => {
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                resetBoardState(false);
            }, 1000);
             updateScoreDisplay(score, game.id);
        }
    }

    function resetBoardState(isMatch) {
         flippedCards = [];
         lockBoard = false;
    }
    renderGame();
}

// --- GAME 5: Fraction Match (Functional) ---
function startGameFractionMatch(game, container) {
    let score = 0;
    let selectedVisual = null;
    let selectedText = null;
    let matchesMade = 0;
    const numPairs = 4;

    function generateFractions() {
        const items = [];
        const usedValues = new Set();
        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
        while (items.length < numPairs * 2) {
            let num = Math.floor(Math.random() * 5) + 1;
            let den = Math.floor(Math.random() * 5) + num + 1;
            den = Math.min(den, 10);
            if (num >= den) continue;
            const common = gcd(num, den);
            const value = (num / common) / (den / common);
            if (!usedValues.has(value)) {
                usedValues.add(value);
                const matchId = usedValues.size - 1;
                items.push({ type: 'visual', numerator: num, denominator: den, value: value, matchId: matchId });
                items.push({ type: 'text', text: `${num}/${den}`, value: value, matchId: matchId });
            }
        }
         return items.sort(() => Math.random() - 0.5);
    }

    function renderGame() {
        container.innerHTML = '<p>Cocokkan gambar pecahan dengan bentuk angkanya!</p><div class="fraction-container"></div>';
        const fracContainer = container.querySelector('.fraction-container');
        const items = generateFractions();
        fracContainer.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'fraction-item';
            div.dataset.type = item.type;
            div.dataset.matchId = item.matchId;
            div.dataset.value = item.value;
            if (item.type === 'visual') {
                const visual = document.createElement('div');
                visual.className = 'fraction-visual';
                const fill = document.createElement('div');
                fill.className = 'fraction-fill';
                fill.style.height = `${(item.numerator / item.denominator) * 100}%`;
                visual.appendChild(fill);
                div.appendChild(visual);
            } else {
                const text = document.createElement('div');
                text.className = 'fraction-text';
                text.textContent = item.text;
                div.appendChild(text);
            }
            div.addEventListener('click', handleFractionClick);
            fracContainer.appendChild(div);
        });
        updateScoreDisplay(score, game.id);
        matchesMade = 0;
        selectedVisual = null;
        selectedText = null;
    }

     function handleFractionClick(event) {
        const clickedItem = event.currentTarget;
        if (clickedItem.classList.contains('matched') || clickedItem.classList.contains('selected')) return;
        const type = clickedItem.dataset.type;
        if (type === 'visual') {
            if (selectedVisual) selectedVisual.classList.remove('selected');
            selectedVisual = clickedItem;
            selectedVisual.classList.add('selected');
        } else {
            if (selectedText) selectedText.classList.remove('selected');
            selectedText = clickedItem;
            selectedText.classList.add('selected');
        }
        checkForFractionMatch();
    }

     function checkForFractionMatch() {
        if (selectedVisual && selectedText) {
            if (selectedVisual.dataset.matchId === selectedText.dataset.matchId) {
                score += 10;
                matchesMade++;
                showFeedback('Cocok! +10 Poin', true);
                selectedVisual.classList.add('matched');
                selectedText.classList.add('matched');
                selectedVisual.classList.remove('selected');
                selectedText.classList.remove('selected');
                selectedVisual = null;
                selectedText = null;
                updateScoreDisplay(score, game.id);
                if (matchesMade === numPairs) {
                    showFeedback(`Mantap! Semua pecahan cocok! Skor Akhir: ${score}`, null);
                    saveHighScore(game.id, score);
                    container.querySelectorAll('.fraction-item:not(.matched)').forEach(item => item.style.pointerEvents = 'none');
                }
            } else {
                showFeedback('Tidak cocok, coba lagi!', false);
                 selectedVisual.style.borderColor = '#d9534f';
                 selectedText.style.borderColor = '#d9534f';
                 setTimeout(() => {
                     if(selectedVisual) {
                         selectedVisual.classList.remove('selected');
                         selectedVisual.style.borderColor = '';
                     }
                     if(selectedText) {
                         selectedText.classList.remove('selected');
                         selectedText.style.borderColor = '';
                     }
                     selectedVisual = null;
                     selectedText = null;
                  }, 500);
                 updateScoreDisplay(score, game.id);
            }
        }
    }
    renderGame();
}

// --- Skeleton Function for Games 6-20 ---
function placeholderGameSkeleton(game, container) {
    container.innerHTML = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <p style="font-size: 1.5em; text-align: center; margin-top: 40px; color: #888;">
            🚧 Permainan ini Segera Hadir! 🚧
        </p>
        <p style="text-align: center; color: #aaa;">(Logika untuk game ini belum diimplementasikan)</p>
    `;
}

// Assign the skeleton function to the remaining game launch functions
const startGameSubtractionBubblePop = placeholderGameSkeleton;
const startGameMultiplicationBingo = placeholderGameSkeleton;
const startGameCountCoins = placeholderGameSkeleton;
const startGamePlaceValuePuzzle = placeholderGameSkeleton;
const startGameEvenOddRace = placeholderGameSkeleton;
const startGameNumberLineJump = placeholderGameSkeleton;
const startGameMathTypingSprint = placeholderGameSkeleton;
const startGameMake24 = placeholderGameSkeleton;
const startGameShapeSorter = placeholderGameSkeleton;
const startGameAreaPerimeter = placeholderGameSkeleton;
const startGameDivisionDuel = placeholderGameSkeleton;
const startGameEquationPuzzle = placeholderGameSkeleton;
const startGameEstimateIt = placeholderGameSkeleton;
const startGameKenKen = placeholderGameSkeleton;
const startGameQuickReaction = placeholderGameSkeleton;

// --- Event Listeners Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if required elements exist before adding listeners or manipulating them
    if (gameGrid) {
        displayGames(gamesData); // Display games only if grid exists
    } else {
        console.error("#game-grid element not found!");
    }
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (filterAge) filterAge.addEventListener('change', filterGames);
    if (filterTopic) filterTopic.addEventListener('change', filterGames);
    if (gameGrid) {
        gameGrid.addEventListener('click', (event) => {
            const card = event.target.closest('.game-card');
            if (card && card.dataset.gameId) {
                openGameModal(card.dataset.gameId);
            }
        });
    }
    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }
    if (restartButton) restartButton.addEventListener('click', restartCurrentGame);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
    console.log("SmartMath Fun Script Loaded Successfully!");
});

