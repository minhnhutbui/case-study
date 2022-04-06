

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
        gameOverTitle.innerHTML = "ĐI RỒI CỤ !"
        let replayButton = document.getElementById("replay");
        replayButton.innerHTML = "Luyện thêm đê"
        replayButton.style.padding = 10 + "px"
        gameOver.style.display = "inline-block";
        gameOver.style.border = 5 + "px solid #7b572d";
        gameOverScore.innerHTML = `Điểm nè: ${score}`
        gameOver.style.width = canvas.width / 3 + "px";
        gameOver.style.height = canvas.height / 3 + "px";
    }

    document.addEventListener("keydown", function () {
        bird.moveUp()
        fly.play();
    });
    run();
}
let instructionButton = document.getElementById("instruction");
let startButton = document.getElementById("start");
let instructionQuote = document.getElementById("instructionQuote");
let backButton = document.getElementById("back");

function options() {
    instructionButton.style.display = "block";
    startButton.style.display = "block";
    instructionQuote.style.display = "none";
    backButton.style.display = "none";

}
function instruction() {
    instructionButton.style.display = "none";
    startButton.style.display = "none";
    instructionQuote.style.display = "block";
    backButton.style.display = "block";
}
function back() {
    return options();
}