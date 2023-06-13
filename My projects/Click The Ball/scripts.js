let container = document.querySelector(".container");
let ball;
container.style.height = window.innerHeight + - 40 + "px";
let cHeight = container.offsetHeight;
ball.width = container.offsetWidth;

addBall();
function addBall() {
    ball = document.createElement("div")
    ball.classList = "ball bg-dark";
    // For proper sizing:
    if (window.innerWidth < 350) {
        ball.style.width = (window.innerWidth / 6) + "px";
        ball.style.height = (window.innerWidth / 6) + "px";
    }

    container.append(ball);
}


var Ball = {
    width: ball.offsetWidth,
    height: ball.offsetHeight,
    moveTo: function (x, y) {
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
    },
    changeDirectionIfNecessary: function (x, y) {
        if (x < 0 || x > canvas.width - this.width) {
            this.dx = -this.dx;
        }
        if (y < 0 || y > canvas.height - this.height) {
            this.dy = -this.dy;
        }
    },
    draw: function (x, y) {
        this.moveTo(x, y);
        var ball = this;
        setTimeout(function () {
            ball.changeDirectionIfNecessary(x, y);
            ball.draw(x + ball.dx, y + ball.dy);
        }, 1000 / 60);
    }
};

Ball.moveTo(Math.round(Math.random() * Ball.width), Math.round(Math.random() * cHeight));