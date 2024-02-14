var music = new Audio("https://duressa-feyissa.github.io/addis-game/bg.m4a");

document.addEventListener("keydown", HandleKeyPressed);
document.addEventListener("click", HandleOnClicked);

function HandleKeyPressed(event) {
  music.play();
}

function HandleOnClicked(event) {
  music.play();
}

window.onload = function () {
  music.play();
};
