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

    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)

    ctx.closePath()
}


let interval = setInterval(draw, 10)

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }

    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            alert('Гаме Овер')
            document.location.reload()
            clearInterval(interval)
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


