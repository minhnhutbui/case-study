

function start() {

    let canvas = document.getElementById('canvas');
    let canvasContext = canvas.getContext('2d');
    let showScore = document.getElementById('score');

    // Set up background
    let background = new Image();
    let floor = new Image();
    let birdImg = new Image();
    let upblock = new Image();
    let downblock = new Image();

    background.src = "./assets/img/background.png";
    floor.src = "./assets/img/floor.png";
    birdImg.src = "./assets/img/bird.png";
    upblock.src = "./assets/img/upblock.png";
    downblock.src = "./assets/img/downblock.png";

    //Set up audio

    let fly = new Audio();
    let scoreSound = new Audio();

    fly.src = "./assets/sound/fly.mp3";
    scoreSound.src = "./assets/sound/score.mp3";

    let score = 0;
    let gap = 100; // khoảng trống giữa 2 ống
    let constant; // khoảng cách từ trên cùng của ống trên đến đầu ống dưới

    class Bird {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        moveUp() {
            this.y -= 50;
        }
    }

    class Block {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        moveLeft() {
            this.x -= 3;
        }
    }

    let bird = new Bird(background.width / 4, background.height / 2);

    let block = [];

    block[0] = new Block(canvas.width, 0);

    function run() {
        canvasContext.drawImage(background, 0, 0);
        canvasContext.drawImage(birdImg, bird.x, bird.y);


        for (let i = 0; i < block.length; i++) {
            constant = upblock.height + gap;
            canvasContext.drawImage(upblock, block[i].x, block[i].y);
            canvasContext.drawImage(downblock, block[i].x, block[i].y + constant);
            block[i].moveLeft();

            if (block[i].x == canvas.width / 2) {
                block.push(new Block(
                    canvas.width,
                    Math.floor(Math.random() * upblock.height) - upblock.height
                ));
            }
            if (block[i].x == 0) {
                block.splice(0, 1);
            }

            if (bird.x === block[i].x) {
                score++;
                scoreSound.play();
            }
            if (bird.y + birdImg.height >= canvas.height || bird.y <= 0 ||
                (bird.x <= block[i].x + upblock.width && bird.x + birdImg.width >= block[i].x && bird.y <= block[i].y + upblock.height) ||
                (bird.x <= block[i].x + upblock.width && bird.x + birdImg.width >= block[i].x && bird.y + birdImg.height >= block[i].y + constant)) {
                return gameover();
            }
        }
        localStorage.setItem("mostRecentScore", score);

        showScore.innerHTML = `score: ${score}`;
        bird.y += 1.5;
        requestAnimationFrame(run)

    }
    // LÀM NÚT START ẨN ĐI ĐỂ VÀO GAME 
    let options = document.getElementById("options");
    options.style.display = "none";

    // KHAI BÁO CÁC BIẾN TRƯỚC KHI GAME OVER
    let gameOver = document.getElementById("game-over");
    let gameOverScore = document.getElementById("score2");
    gameOver.style.display = "none";


    function gameover() {
        let gameOverTitle = document.getElementById("game-over-title");
        gameOverTitle.innerHTML = "FAIL !"
        gameOver.style.display = "flex";
        gameOver.style.border = 5 + "px solid #7b572d";
        gameOverScore.innerHTML = `Your Score: ${score}`
        gameOver.style.width = canvas.width / 3 + "px";
        gameOver.style.height = canvas.height / 2 + "px";
    }

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 38) {
            bird.moveUp()
            fly.play();
        }
    });

    run();
}
// SAVE SCORE
let username = document.getElementById("username");
let saveScore = document.getElementById("savescore");
let mostRecentScore = localStorage.getItem("mostRecentScore");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
})

function saveHighScore(e) {
    mostRecentScore = localStorage.getItem("mostRecentScore");
    e.preventDefault();
    let score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);

    // SORT SCORE FROM HIGHEST TO LOWEST
    highScores.sort(function (a, b) {
        return b.score - a.score
    })
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores))

    window.location.assign("/")
}






let instructionButton = document.getElementById("instruction");
let startButton = document.getElementById("start");
let instructionQuote = document.getElementById("instructionQuote");
let backButton = document.getElementById("back");
let highScoreBtn = document.getElementById("highScoreBtn");
let highScoreList = document.getElementById("highScoreList");

function displayHighScores() {
    startButton.style.display = "none";
    instructionButton.style.display = "none";
    highScoreBtn.style.display = "none";
    backButton.style.display = "block";
    highScoreList.style.display = "block";
    highScoreList.innerHTML = highScores
        .map(function (score) {
            return `<li>${score.name} - ${score.score}</li>`
        })
        .join("")
}


function options() {
    instructionButton.style.display = "block";
    startButton.style.display = "block";
    instructionQuote.style.display = "none";
    backButton.style.display = "none";
    highScoreBtn.style.display = "inline-block"
    highScoreList.style.display = "none"

}
function instruction() {
    instructionButton.style.display = "none";
    startButton.style.display = "none";
    instructionQuote.style.display = "block";
    backButton.style.display = "block";
    highScoreBtn.style.display = "none"
}
function back() {
    return options();
}