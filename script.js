let mySound = new Audio("sound/indy.mp3");
const counter = document.getElementById("counter");

var gameOver = false;

var gameOverScreen = document.createElement("div");
gameOverScreen.style.display = "none";
gameOverScreen.style.position = "fixed";
gameOverScreen.style.top = "0";
gameOverScreen.style.left = "0";
gameOverScreen.style.width = "100%";
gameOverScreen.style.height = "100%";
gameOverScreen.style.backgroundColor = "rgba(0,0,0,0.5)";
gameOverScreen.style.zIndex = "1000";
gameOverScreen.style.textAlign = "center";
gameOverScreen.style.fontSize = "40px";
gameOverScreen.style.color = "white";
gameOverScreen.innerHTML = "Game Over<br>Score: " + counter.innerText;
document.body.appendChild(gameOverScreen);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    moveLeft();
  }
  if (event.key === "ArrowRight") {
    moveRight();
  }
});
var character = document.getElementById("character");
function moveLeft() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left -= 100;
  if (left >= 0) {
    character.style.left = left + "px";
  }
}
function moveRight() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left += 100;
  if (left < 300) {
    character.style.left = left + "px";
  }
}
var block = document.getElementById("block");

block.addEventListener("animationiteration", () => {
  var random = Math.floor(Math.random() * 3);
  left = random * 100;
  mySound.play();
  block.style.left = left + "px";
  counter++;
});
setInterval(function () {
  if (!gameOver) {
    counter.innerText++;
  }
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  var blockTop = parseInt(
    window.getComputedStyle(block).getPropertyValue("top")
  );
  if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
    gameOverScreen.innerHTML = "Game Over<br>Score: " + counter.innerText;
    gameOverScreen.style.display = "block";
    block.style.animation = "none";
    mySound.pause();
    gameOver = true;
  }
  if (counter.innerText >= 500 && level == 1) {
    level = 2;
    gameOver = false;
    block.style.animation = "move 1s linear infinite";
    counter.innerText = 0;
    gameOverScreen.style.display = "none";
  }
}, 1);

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    location.reload();
  }
});

document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);
