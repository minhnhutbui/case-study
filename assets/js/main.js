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

    let bird = {
        x: background.width / 4,
        y: background.height / 2,
    }

    let block = [];

    block[0] = {
        x: canvas.width,
        y: 0,
    }

    function run() {
        canvasContext.drawImage(background, 0, 0);
        canvasContext.drawImage(birdImg, bird.x, bird.y);

        for (let i = 0; i < block.length; i++) {
            constant = upblock.height + gap;
            canvasContext.drawImage(upblock, block[i].x, block[i].y); //ve ong tren
            canvasContext.drawImage(downblock, block[i].x, block[i].y + constant); // ve ong duoi
            block[i].x -= 3 // di chuyen ong sang trai

            if (block[i].x == canvas.width / 2) {
                block.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * upblock.height) - upblock.height
                })
            }
            if (block[i].x === 0) {
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

    document.addEventListener("keydown", moveUp);

    function moveUp() {
        bird.y -= 50;
        fly.play();
    }
    run();
}
// start();