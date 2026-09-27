// ==========================================
// NEXAHUB GAME CENTER - FULL SCRIPT
// ==========================================

const title = document.getElementById("game-title");
const content = document.getElementById("game-content");


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let ticBoard = ["", "", "", "", "", "", "", ""];
let ticPlayer = "X";

let secretNumber = 0;
let guessAttempts = 0;

let memoryCards = [];
let memoryOpen = [];
let memoryMatched = [];

let quizIndex = 0;
let quizScore = 0;

let snake = [];
let snakeDirection = "right";
let snakeFood = {};
let snakeTimer = null;

let speedClicks = 0;
let speedTimer = null;
let speedStarted = false;

let secretWord = "";
let wordAttempts = 0;

let carPosition = 50;
let raceScore = 0;

let pongScore = 0;


// ==========================================
// SHOW GAME
// ==========================================

function showGame(game) {

    if (!title || !content) return;

    content.innerHTML = "";
    title.innerText = "Select a Game 🎮";


    // ======================================
    // TIC TAC TOE
    // ======================================

    if (game === "tic") {

        ticBoard = ["", "", "", "", "", "", "", ""];
        ticPlayer = "X";

        title.innerText = "❌⭕ Tic-Tac-Toe";

        content.innerHTML = `
            <h3>Player X Turn</h3>

            <div class="tic-board">
                ${ticBoard.map((_, i) =>
                    `<button onclick="ticMove(${i})" id="tic${i}"></button>`
                ).join("")}
            </div>

            <button class="game-btn" onclick="resetTic()">
                🔄 Restart
            </button>
        `;

        return;
    }


    // ======================================
    // ROCK PAPER SCISSORS
    // ======================================

    if (game === "rps") {

        title.innerText = "✊✋✌️ Rock Paper Scissors";

        content.innerHTML = `
            <h3>Choose Your Move</h3>

            <button class="game-btn" onclick="playRPS('rock')">
                ✊ Rock
            </button>

            <button class="game-btn" onclick="playRPS('paper')">
                ✋ Paper
            </button>

            <button class="game-btn" onclick="playRPS('scissors')">
                ✌️ Scissors
            </button>

            <div id="rps-result">
                Choose a move!
            </div>
        `;

        return;
    }


    // ======================================
    // NUMBER GUESSING
    // ======================================

    if (game === "guess") {

        secretNumber = Math.floor(Math.random() * 100) + 1;
        guessAttempts = 0;

        title.innerText = "🔢 Number Guessing";

        content.innerHTML = `
            <div class="number-game">

                <div class="number-icon">🔢</div>

                <h3>Guess the Number</h3>

                <p class="game-description">
                    Guess a number between 1 and 100
                </p>

                <input
                    type="number"
                    id="guessInput"
                    class="game-input"
                    placeholder="Enter number"
                    min="1"
                    max="100"
                >

                <br>

                <button class="game-btn" onclick="checkGuess()">
                    🎯 Check
                </button>

                <div id="guessResult" class="guess-result">
                    Start guessing!
                </div>

                <div class="guess-info">
                    <span>🎯 Range: 1 - 100</span>
                    <span>🔄 Attempts: <b id="guessAttempts">0</b></span>
                </div>

                <button class="game-btn restart-btn"
                    onclick="showGame('guess')">
                    🔄 Restart
                </button>

            </div>
        `;

        return;
    }


    // ======================================
    // MEMORY GAME
    // ======================================

    if (game === "memory") {

        memoryCards = [
            "🍎", "🍎",
            "🍌", "🍌",
            "🍇", "🍇",
            "🍉", "🍉"
        ];

        memoryCards.sort(() => Math.random() - 0.5);

        memoryOpen = [];
        memoryMatched = [];

        title.innerText = "🧠 Memory Game";

        content.innerHTML = `
            <h3>Find Matching Pairs</h3>

            <div class="memory-board">

                ${memoryCards.map((_, i) =>
                    `<button onclick="memoryClick(${i})"
                    id="memory${i}">❓</button>`
                ).join("")}

            </div>

            <button class="game-btn"
                onclick="showGame('memory')">
                🔄 Restart
            </button>
        `;

        return;
    }


    // ======================================
    // QUIZ GAME
    // ======================================

    if (game === "quiz") {

        quizIndex = 0;
        quizScore = 0;

        title.innerText = "🧩 Quiz Game";

        showQuizQuestion();

        return;
    }


    // ======================================
    // SNAKE GAME
    // ======================================

    if (game === "snake") {

        title.innerText = "🐍 Snake Game";

        content.innerHTML = `
            <h3>🐍 Snake</h3>

            <canvas id="snakeCanvas"
                width="400"
                height="400">
            </canvas>

            <br>

            <button class="game-btn"
                onclick="startSnake()">
                ▶️ Start Snake
            </button>

            <p class="pong-hint">
                Use Arrow Keys ⬆️⬇️⬅️➡️
            </p>
        `;

        return;
    }


    // ======================================
    // CLICK SPEED
    // ======================================

    if (game === "speed") {

        speedClicks = 0;
        speedStarted = false;

        title.innerText = "⚡ Click Speed";

        content.innerHTML = `
            <div class="speed-game">

                <div class="speed-icon">⚡</div>

                <h3>Click Speed Test</h3>

                <div class="click-counter">

                    <span id="clickCount">0</span>

                    <small>CLICKS</small>

                </div>

                <button
                    class="click-me-button"
                    onclick="speedClick()">

                    CLICK ME!

                </button>

                <p class="speed-hint">
                    You have 10 seconds!
                </p>

                <p id="speedResult"></p>

                <button class="game-btn"
                    onclick="showGame('speed')">

                    🔄 Restart

                </button>

            </div>
        `;

        return;
    }


    // ======================================
    // WORD GUESSING
    // ======================================

    if (game === "word") {

        const words = [
            "computer",
            "javascript",
            "website",
            "programming",
            "technology"
        ];

        secretWord =
            words[Math.floor(Math.random() * words.length)];

        wordAttempts = 0;

        title.innerText = "🔤 Word Guessing";

        content.innerHTML = `
            <h3>🔤 Guess the Word</h3>

            <p>
                Hint: It is related to technology 💻
            </p>

            <input
                type="text"
                id="wordInput"
                class="game-input"
                placeholder="Enter word"
            >

            <br>

            <button class="game-btn"
                onclick="checkWord()">

                🎯 Guess

            </button>

            <div id="wordResult"
                class="guess-result">

                Start guessing!

            </div>

            <button class="game-btn"
                onclick="showGame('word')">

                🔄 Restart

            </button>
        `;

        return;
    }


    // ======================================
    // BRICK BREAKER
    // ======================================

    if (game === "brick") {

        title.innerText = "🧱 Brick Breaker";

        content.innerHTML = `
            <h3>🧱 Brick Breaker</h3>

            <canvas
                id="brickCanvas"
                width="500"
                height="400">
            </canvas>

            <br>

            <button class="game-btn"
                onclick="startBrickBreaker()">

                ▶️ Start Game

            </button>
        `;

        return;
    }


    // ======================================
    // CAR RACING
    // ======================================

    if (game === "racing") {

        carPosition = 50;
        raceScore = 0;

        title.innerText = "🏎️ Car Racing";

        content.innerHTML = `
            <div class="racing-game">

                <h3>🏁 Highway Racing</h3>

                <div class="race-score">
                    🏆 Score:
                    <span id="raceScore">0</span>
                </div>

                <div class="race-track">

                    <div id="car">🏎️</div>

                    <div id="obstacle">🚧</div>

                </div>

                <div class="race-controls">

                    <button class="game-btn"
                        onclick="moveCar('left')">

                        ⬅️ LEFT

                    </button>

                    <button class="game-btn"
                        onclick="moveCar('right')">

                        RIGHT ➡️

                    </button>

                </div>

                <p class="race-hint">
                    🏎️ Move your car and avoid the obstacle!
                </p>

                <button class="game-btn restart-btn"
                    onclick="showGame('racing')">

                    🔄 RESTART RACE

                </button>

            </div>
        `;

        return;
    }


    // ======================================
    // PING PONG
    // ======================================

    if (game === "pong") {

        pongScore = 0;

        title.innerText = "🏓 Ping Pong";

        content.innerHTML = `
            <div class="pong-game">

                <h3>🏓 Ping Pong Challenge</h3>

                <div class="pong-score">
                    🏆 Score:
                    <span id="pongScore">0</span>
                </div>

                <div class="pong-area">

                    <div class="pong-paddle"></div>

                    <div id="pongBall">
                        ⚪
                    </div>

                </div>

                <button class="game-btn"
                    onclick="pongHit()">

                    🏓 HIT BALL

                </button>

                <p class="pong-hint">
                    🎯 Hit the ball and increase your score!
                </p>

                <button class="game-btn restart-btn"
                    onclick="showGame('pong')">

                    🔄 RESTART

                </button>

            </div>
        `;

        return;
    }


    // ======================================
    // DICE GAME
    // ======================================

    if (game === "dice") {

        title.innerText = "🎲 Dice Game";

        content.innerHTML = `
            <h3>🎲 Roll the Dice</h3>

            <div id="dice">
                🎲
            </div>

            <button class="game-btn"
                onclick="rollDice()">

                🎲 ROLL DICE

            </button>

            <p id="diceResult">
                Roll the dice!
            </p>
        `;

        return;
    }
}


// ==========================================
// TIC TAC TOE FUNCTIONS
// ==========================================

function ticMove(index) {

    if (ticBoard[index] !== "") return;

    ticBoard[index] = ticPlayer;

    const cell = document.getElementById("tic" + index);

    if (cell) {
        cell.innerText = ticPlayer;
    }

    if (checkTicWinner()) {

        alert("🎉 Player " + ticPlayer + " Wins!");

        return;
    }

    if (!ticBoard.includes("")) {

        alert("🤝 Draw!");

        return;
    }

    ticPlayer = ticPlayer === "X" ? "O" : "X";

    const turn = document.querySelector(".game-area h3");

    if (turn) {
        turn.innerText =
            "Player " + ticPlayer + " Turn";
    }
}


function checkTicWinner() {

    const wins = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]

    ];

    return wins.some(combo => {

        const [a,b,c] = combo;

        return (
            ticBoard[a] &&
            ticBoard[a] === ticBoard[b] &&
            ticBoard[a] === ticBoard[c]
        );
    });
}


function resetTic() {
    showGame("tic");
}


// ==========================================
// ROCK PAPER SCISSORS
// ==========================================

function playRPS(player) {

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];

    const computer =
        choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (player === computer) {

        result = "🤝 Draw!";

    } else if (

        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")

    ) {

        result = "🎉 You Win!";

    } else {

        result = "😅 Computer Wins!";

    }

    const resultBox =
        document.getElementById("rps-result");

    if (resultBox) {

        resultBox.innerText =
            `You: ${player} | Computer: ${computer} | ${result}`;
    }
}


// ==========================================
// NUMBER GUESSING
// ==========================================

function checkGuess() {

    const input =
        document.getElementById("guessInput");

    const result =
        document.getElementById("guessResult");

    const attempts =
        document.getElementById("guessAttempts");

    if (!input || !result) return;

    const guess = Number(input.value);

    if (
        guess < 1 ||
        guess > 100 ||
        !guess
    ) {

        result.innerText =
            "⚠️ Enter a number between 1 and 100.";

        return;
    }

    guessAttempts++;

    if (attempts) {
        attempts.innerText = guessAttempts;
    }

    if (guess === secretNumber) {

        result.innerText =
            `🎉 Correct! You guessed it in ${guessAttempts} attempts!`;

    } else if (guess < secretNumber) {

        result.innerText =
            "⬆️ Too Low! Try again.";

    } else {

        result.innerText =
            "⬇️ Too High! Try again.";
    }

    input.value = "";
}


// ==========================================
// MEMORY GAME
// ==========================================

function memoryClick(index) {

    if (
        memoryOpen.length >= 2 ||
        memoryMatched.includes(index) ||
        memoryOpen.includes(index)
    ) return;

    memoryOpen.push(index);

    const button =
        document.getElementById("memory" + index);

    if (button) {
        button.innerText = memoryCards[index];
    }

    if (memoryOpen.length === 2) {

        const [a,b] = memoryOpen;

        if (memoryCards[a] === memoryCards[b]) {

            memoryMatched.push(a,b);
            memoryOpen = [];

            if (memoryMatched.length === memoryCards.length) {

                setTimeout(() => {
                    alert("🎉 You matched all cards!");
                }, 200);
            }

        } else {

            setTimeout(() => {

                const first =
                    document.getElementById("memory" + a);

                const second =
                    document.getElementById("memory" + b);

                if (first) first.innerText = "❓";
                if (second) second.innerText = "❓";

                memoryOpen = [];

            }, 700);
        }
    }
}


// ==========================================
// QUIZ
// ==========================================

const quizQuestions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which language is used for styling websites?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },

    {
        question: "Which language is used for web interaction?",
        options: [
            "JavaScript",
            "HTML",
            "CSS",
            "SQL"
        ],
        answer: 0
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: 0
    }
];


function showQuizQuestion() {

    if (quizIndex >= quizQuestions.length) {

        content.innerHTML = `
            <h3>🎉 Quiz Completed!</h3>

            <h2>
                Score:
                ${quizScore}/${quizQuestions.length}
            </h2>

            <button class="game-btn"
                onclick="showGame('quiz')">

                🔄 Play Again

            </button>
        `;

        return;
    }

    const q = quizQuestions[quizIndex];

    content.innerHTML = `

        <h3>
            Question ${quizIndex + 1}
            / ${quizQuestions.length}
        </h3>

        <h2>${q.question}</h2>

        <div class="quiz-options">

            ${q.options.map((option, index) => `

                <button
                    class="game-btn"
                    onclick="answerQuiz(${index})">

                    ${option}

                </button>

            `).join("")}

        </div>

        <p>
            Score: ${quizScore}
        </p>
    `;
}


function answerQuiz(index) {

    if (
        index ===
        quizQuestions[quizIndex].answer
    ) {

        quizScore++;

        alert("✅ Correct!");

    } else {

        alert("❌ Wrong!");

    }

    quizIndex++;

    showQuizQuestion();
}


// ==========================================
// CLICK SPEED
// ==========================================

function speedClick() {

    const counter =
        document.getElementById("clickCount");

    const result =
        document.getElementById("speedResult");

    if (!speedStarted) {

        speedStarted = true;
        speedClicks = 0;

        speedTimer = setTimeout(() => {

            speedStarted = false;

            if (result) {

                result.innerText =
                    `⚡ Time Over! You clicked ${speedClicks} times!`;
            }

        }, 10000);
    }

    if (speedStarted) {

        speedClicks++;

        if (counter) {
            counter.innerText = speedClicks;
        }
    }
}
// ==========================================
// WORD GUESSING
// ==========================================

function checkWord() {

    const input =
        document.getElementById("wordInput");

    const result =
        document.getElementById("wordResult");

    if (!input || !result) return;

    const guess =
        input.value.trim().toLowerCase();

    if (!guess) {

        result.innerText =
            "⚠️ Enter a word.";

        return;
    }

    wordAttempts++;

    if (guess === secretWord) {

        result.innerText =
            `🎉 Correct! You guessed it in ${wordAttempts} attempts!`;

    } else {

        result.innerText =
            "❌ Wrong word. Try again!";
    }

    input.value = "";
}


// ==========================================
// SNAKE
// ==========================================

function startSnake() {

    const canvas =
        document.getElementById("snakeCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    snake = [
        {x:200,y:200},
        {x:180,y:200},
        {x:160,y:200}
    ];

    snakeDirection = "right";

    createSnakeFood();

    if (snakeTimer) {
        clearInterval(snakeTimer);
    }

    snakeTimer =
        setInterval(() => {

            drawSnake(ctx);

        }, 120);
}


function createSnakeFood() {

    snakeFood = {

        x:
            Math.floor(Math.random() * 20) * 20,

        y:
            Math.floor(Math.random() * 20) * 20
    };
}


function drawSnake(ctx) {

    const head = {
        x: snake[0].x,
        y: snake[0].y
    };

    if (snakeDirection === "right")
        head.x += 20;

    if (snakeDirection === "left")
        head.x -= 20;

    if (snakeDirection === "up")
        head.y -= 20;

    if (snakeDirection === "down")
        head.y += 20;

    if (
        head.x < 0 ||
        head.x >= 400 ||
        head.y < 0 ||
        head.y >= 400
    ) {

        clearInterval(snakeTimer);

        alert("💀 Game Over!");

        return;
    }

    snake.unshift(head);

    if (
        head.x === snakeFood.x &&
        head.y === snakeFood.y
    ) {

        createSnakeFood();

    } else {

        snake.pop();
    }

    ctx.clearRect(0,0,400,400);

    ctx.fillStyle = "#22d3ee";

    snake.forEach(part => {

        ctx.fillRect(
            part.x,
            part.y,
            18,
            18
        );
    });

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        snakeFood.x,
        snakeFood.y,
        18,
        18
    );
}


document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp" &&
        snakeDirection !== "down") {

        snakeDirection = "up";

    } else if (
        event.key === "ArrowDown" &&
        snakeDirection !== "up"
    ) {

        snakeDirection = "down";

    } else if (
        event.key === "ArrowLeft" &&
        snakeDirection !== "right"
    ) {

        snakeDirection = "left";

    } else if (
        event.key === "ArrowRight" &&
        snakeDirection !== "left"
    ) {

        snakeDirection = "right";
    }
});
// ==========================================
// CAR RACING FUNCTION
// ==========================================

function moveCar(direction) {

    const car =
        document.getElementById("car");

    if (!car) return;

    if (direction === "left") {

        carPosition -= 10;

    } else if (direction === "right") {

        carPosition += 10;
    }

    if (carPosition < 10)
        carPosition = 10;

    if (carPosition > 90)
        carPosition = 90;

    car.style.left =
        carPosition + "%";

    raceScore++;

    const score =
        document.getElementById("raceScore");

    if (score) {
        score.innerText = raceScore;
    }
}


// ==========================================
// PING PONG FUNCTION
// ==========================================

function pongHit() {

    const ball =
        document.getElementById("pongBall");

    const score =
        document.getElementById("pongScore");

    if (!ball) return;

    pongScore++;

    if (score) {
        score.innerText = pongScore;
    }

    const randomX =
        Math.floor(Math.random() * 220) - 110;

    const randomY =
        Math.floor(Math.random() * 180) - 90;

    ball.style.transform =
        `translate(${randomX}px, ${randomY}px)`;
}


// ==========================================
// BRICK BREAKER
// ==========================================

function startBrickBreaker() {

    const canvas =
        document.getElementById("brickCanvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let x = canvas.width / 2;
    let y = canvas.height - 40;

    let dx = 3;
    let dy = -3;

    let paddleX =
        canvas.width / 2 - 50;

    const paddleWidth = 100;
    const paddleHeight = 10;

    const rows = 4;
    const cols = 7;

    const bricks = [];

    for (let r = 0; r < rows; r++) {

        bricks[r] = [];

        for (let c = 0; c < cols; c++) {

            bricks[r][c] = {
                x: c * 68 + 10,
                y: r * 30 + 20,
                active: true
            };
        }
    }

    document.onmousemove = function(event) {

        const rect =
            canvas.getBoundingClientRect();

        paddleX =
            event.clientX -
            rect.left -
            paddleWidth / 2;
    };


    function draw() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Ball

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#22d3ee";

        ctx.fill();

        ctx.closePath();


        // Paddle

        ctx.fillStyle = "#8b5cf6";

        ctx.fillRect(
            paddleX,
            canvas.height - 20,
            paddleWidth,
            paddleHeight
        );


        // Bricks

        bricks.forEach(row => {

            row.forEach(brick => {

                if (!brick.active) return;

                ctx.fillStyle = "#22d3ee";

                ctx.fillRect(
                    brick.x,
                    brick.y,
                    60,
                    20
                );
            });
        });


        // Brick collision

        bricks.forEach(row => {

            row.forEach(brick => {

                if (
                    brick.active &&
                    x > brick.x &&
                    x < brick.x + 60 &&
                    y > brick.y &&
                    y < brick.y + 20
                ) {

                    brick.active = false;

                    dy = -dy;
                }
            });
        });


        x += dx;
        y += dy;


        if (
            x < 8 ||
            x > canvas.width - 8
        ) {

            dx = -dx;
        }


        if (y < 8) {

            dy = -dy;
        }


        if (
            y > canvas.height - 30 &&
            x > paddleX &&
            x < paddleX + paddleWidth
        ) {

            dy = -dy;
        }


        if (y > canvas.height) {

            alert("💥 Game Over!");

            return;
        }


        requestAnimationFrame(draw);
    }

    draw();
}
// ==========================================
// DICE GAME
// ==========================================

function rollDice() {

    const dice =
        document.getElementById("dice");

    const result =
        document.getElementById("diceResult");

    const number =
        Math.floor(Math.random() * 6) + 1;

    const diceFaces = [
        "⚀",
        "⚁",
        "⚂",
        "⚃",
        "⚄",
        "⚅"
    ];

    if (dice) {

        dice.innerText =
            diceFaces[number - 1];
    }

    if (result) {

        result.innerText =
            `🎉 You rolled ${number}!`;
    }
}