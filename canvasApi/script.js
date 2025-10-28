const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
let ballRadius = 10

let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

let leftPressed = false
let rightPressed = false

let brickRowCount = 3
let brickColumnCount = 2
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30
let brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount

let bricks = []


let score = 0

let lives = 3


function resetBall() {
    x = canvas.width / 2
    y = canvas.height - 30
    dx = 2
    dy = -2
}

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []

    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: true, lives: 1 }
    }

}

function keyDownHadler(e) {
    if (e.key === 'ArrowLeft') {
        leftPressed = true
    } else if (e.key === 'ArrowRight') {
        rightPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowLeft') {
        leftPressed = false
    } else if (e.key === 'ArrowRight') {
        rightPressed = false
    }
}

document.addEventListener('keydown', keyDownHadler)
document.addEventListener('keyup', keyUpHandler)



function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawPaddle() {
    ctx.beginPath()

    ctx.fillStyle = 'red'
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)

    ctx.closePath()
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY

                ctx.beginPath()

                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = 'blue'
                ctx.fill()
                ctx.closePath()
            }

        }
    }
}

function collisionDetection() {



    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r]
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.status) {
                dy = -dy
                b.status = false
                score++

                if (score == brickRowCount * brickColumnCount) {
                    alert('Молодец')
                    document.location.reload()
                }
            }
        }
    }
}

function mouseMoveHandler(e) {

    let relativeX = e.clientX - canvas.offsetLeft
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - (paddleWidth / 2)
    }
}

document.addEventListener('mousemove', mouseMoveHandler)


function drawScore() {
    ctx.font = '16px Arial'
    ctx.fillStyle = 'green'
    ctx.fillText(`Score: ${score}`, 8, 20)
}

function drawLives() {
    ctx.font = '16px Cambria'
    ctx.fillStyle = 'green'
    ctx.fillText(`Lives: ${lives}`, 300, 20)
}


let interval = setInterval(draw, 10)

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    drawLives()
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }

    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {

            if (lives > 0) {
                lives--
                resetBall()
            } else {
                alert('Гаме Овер')
                document.location.reload()
                clearInterval(interval)
            }

        }

    }

    x += dx
    y += dy

    if (leftPressed && paddleX > 0) {
        paddleX -= 7
    } else if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7
    }


}


