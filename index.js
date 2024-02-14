let canvas;
let ctx;

let nextGridHeght = 30;
let nextGridWidth = 25;
let gridArrayH = 30;
let gridArrayW = 16;

function Createblock() {
  //ba;
  block.push([
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  //g;
  block.push([
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ]); //g;
  block.push([
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ]);
  // be
  block.push([
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [3, 0],
    [3, 1],
    [3, 2],
  ]);
  // sa
  block.push([
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 2],
  ]);
  // re
  block.push([
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
  ]);
  // l
  block.push([
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
    [2, 1],
    [2, 2],
  ]);
  // ri
  block.push([
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [2, 1],
  ]);
  // s
  block.push([
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [2, 1],
    [2, 2],
  ]);
  // ha
  block.push([
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [2, 2],
    [4, 2],
  ]);
  // // ta
  // block.push([
  //   [0, 0],
  //   [1, 0],
  //   [2, 0],
  //   [3, 0],
  //   [4, 0],
  //   [0, 1],
  //   [2, 1],
  //   [4, 1],
  // ]);
  // //cha
  // block.push([
  //   [0, 0],
  //   [1, 0],
  //   [2, 0],
  //   [1, 1],
  //   [1, 2],
  //   [0, 2],
  //   [2, 2],
  //   [0, 3],
  //   [2, 3],
  // ]);
}

let curBlock = [
  [0, 0],
  [0, 1],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
];

let nextBlock = [
  [0, 0],
  [1, 0],
  [1, 1],
  [1, 2],
];

let block = [];
let blockColors = [
  "purple",
  "cyan",
  "blue",
  "yellow",
  "orange",
  "red",
  "green",
  "pink",
  "turquoise",
  "coral",
];

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getQueryParams() {
  var params = {};
  var queryString = window.location.search.substring(1);
  var queryParams = queryString.split("&");

  for (var i = 0; i < queryParams.length; i++) {
    var pair = queryParams[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1] || "");
    params[key] = value;
  }

  return params;
}

let curBlockColor = blockColors[0];
let nextBlockColor = blockColors[1];

let coordinateArray = [...Array(gridArrayH)].map((e) =>
  Array(gridArrayW).fill(0)
);

let nextCoordinateArray = [...Array(nextGridHeght)].map((e) =>
  Array(nextGridWidth).fill(0)
);

let gameBoardArray = [...Array(gridArrayH)].map((e) =>
  Array(gridArrayW).fill(0)
);

let stoppedShapeArray = [...Array(gridArrayH)].map((e) =>
  Array(gridArrayW).fill(0)
);

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
let direction;

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

document.addEventListener("DOMContentLoaded", SetupCanvas);

let startX = 7;
let startY = 0;
let score = 0;
let level = 1;
let winOrLose = "Playing";

function SetupCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 700;
  canvas.height = 700;

  ctx.scale(1.2, 1.2);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#485563";
  ctx.fillRect(370, 0, 5, 600);

  ctx.fillStyle = "#485563";
  ctx.font = "80px Arial";
  ctx.fillText(score.toString(), 455, 350);
  ctx.font = "48px Arial";
  let curlevel = getQueryParams()["level"] || "easy";
  if (curlevel === "Medium") {
    curlevel = "መካከለኛ";
  } else if (curlevel === "Hard") {
    curlevel = "ትልቅ";
  } else {
    curlevel = "ቀላል";
  }
  ctx.fillText(curlevel, 425, 450);

  ctx.fillStyle = "#485563";
  ctx.font = "21px Arial";
  ctx.fillText("ነጥብ", 455, 380);
  ctx.fillText("የሚቀጥለው ፊደል", 405, 265);
  ctx.fillText("ደረጃ", 450, 480);

  document.addEventListener("keydown", HandleKeyPress);
  document.addEventListener("click", HandleOnClick);
  Createblock();
  CreateShape();

  CreateCoordArray();
  DrawNext();
  DrawBlock();
}

function DrawBlock() {
  for (let i = 0; i < curBlock.length; i++) {
    let x = curBlock[i][0] + startX;
    let y = curBlock[i][1] + startY;
    gameBoardArray[x][y] = 1;
    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    ctx.fillStyle = curBlockColor;
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function DrawNext() {
  for (let i = 0; i < nextBlock.length; i++) {
    let x = nextBlock[i][0] + 19;
    let y = nextBlock[i][1] + 6;
    let coorX = nextCoordinateArray[x][y].x;
    let coorY = nextCoordinateArray[x][y].y;
    ctx.fillStyle = nextBlockColor;
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function DeleteNextBlock() {
  for (let i = 0; i < nextBlock.length; i++) {
    let x = nextBlock[i][0] + 19;
    let y = nextBlock[i][1] + 6;

    let coorX = nextCoordinateArray[x][y].x;
    let coorY = nextCoordinateArray[x][y].y;
    ctx.fillStyle = "white";
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function CreateCoordArray() {
  let i = 0,
    j = 0;

  for (let y = 9; y <= 700; y += 23) {
    for (let x = 1; x <= 370; x += 23) {
      coordinateArray[i][j] = new Coordinates(x, y);
      i++;
    }
    j++;
    i = 0;
  }

  i = 0;
  j = 0;
  for (let y = 9; y <= 700; y += 23) {
    for (let x = 1; x < 690; x += 23) {
      nextCoordinateArray[i][j] = new Coordinates(x, y);
      i++;
    }
    j++;
    i = 0;
  }
}

function HandleKeyPress(key) {
  if (winOrLose != "Game Over") {
    if (key === " " || key.keyCode === 32) {
      HandleOnClick();
    } else if (key.keyCode === 37) {
      direction = DIRECTION.LEFT;
      if (!HittingTheWall() && !CheckForHorizontalCollision()) {
        DeleteBlock();
        startX--;
        DrawBlock();
      }
    } else if (key.keyCode === 39) {
      direction = DIRECTION.RIGHT;
      if (!HittingTheWall() && !CheckForHorizontalCollision()) {
        DeleteBlock();
        startX++;
        DrawBlock();
      }
    } else if (key.keyCode === 40) {
      MoveBlockDown();
    } else if (key.keyCode === 38) {
      RotateBlock();
    }
  }
}

function MoveBlockDown() {
  direction = DIRECTION.DOWN;
  if (!CheckForVerticalCollison()) {
    DeleteBlock();
    startY++;
    DrawBlock();
  }
}

function getSpeed() {
  let speed = 900;
  let queryParam = getQueryParams();
  if (queryParam["level"] == "medium") {
    speed = 500;
  } else if (queryParam["level"] == "hard") {
    speed = 200;
  }
  return speed;
}

setInterval(function () {
  if (winOrLose != "Game Over") {
    MoveBlockDown();
  }
}, getSpeed());

function DeleteBlock() {
  for (let i = 0; i < curBlock.length; i++) {
    let x = curBlock[i][0] + startX;
    let y = curBlock[i][1] + startY;

    gameBoardArray[x][y] = 0;
    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    ctx.fillStyle = "white";
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function gameOver() {
  var gameOverMessage = document.createElement("div");
  gameOverMessage.innerHTML = `
    <div style="background-color: rgba(0, 0, 0, 0.8); color: white; border-radius: 10px; position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 999; padding: 30px; margin: 40px; overflow: hidden; animation: slideIn 0.5s ease forwards;">
      <h2 style="margin: 20px 0 10px; text-align: center;">ጨዋታ አለቀ</h2>
      <p style="margin-bottom: 30px; text-align: center;">ነጥብህ ${score} ነው። እንደገና መጫወት ትፈልጋለህ?</p>
      <div style="text-align: center;">
        <button style="padding: 10px 20px; background-color: #4caf50; border: none; color: white; cursor: pointer; border-radius: 5px; margin-right: 20px; transition: background-color 0.3s;" onclick="reloadPage()">አዎ</button>
        <button style="padding: 10px 20px; background-color: #f44336; border: none; color: white; cursor: pointer; border-radius: 5px; transition: background-color 0.3s;" onclick="goToStartPage()">አይ</button>
      </div>
    </div>
  `;
  document.body.appendChild(gameOverMessage);
}

function reloadPage() {
  window.location.reload();
}

function goToStartPage() {
  window.location.href = "index.html";
}

function CreateShape() {
  let randomTetromino = Math.floor(Math.random() * block.length);
  curBlock = nextBlock;
  curBlockColor = nextBlockColor;
  DeleteNextBlock();
  nextBlock = block[randomTetromino];
  nextBlockColor = blockColors[randomTetromino];
  DrawNext();
}

function HandleOnClick() {
  DeleteNextBlock();
  DeleteBlock();
  let randomTetromino = Math.floor(Math.random() * block.length);
  curBlock = nextBlock;
  curBlockColor = nextBlockColor;
  nextBlock = block[randomTetromino];
  nextBlockColor = blockColors[randomTetromino];
  DrawNext();
  DrawBlock();
}

function HittingTheWall() {
  for (let i = 0; i < curBlock.length; i++) {
    let newX = curBlock[i][0] + startX;
    if (newX <= 0 && direction === DIRECTION.LEFT) {
      return true;
    } else if (newX >= gridArrayW - 1 && direction === DIRECTION.RIGHT) {
      return true;
    }
  }
  return false;
}

function CheckForVerticalCollison() {
  let blockCopy = curBlock;

  let collision = false;

  for (let i = 0; i < blockCopy.length; i++) {
    let square = blockCopy[i];
    let x = square[0] + startX;
    let y = square[1] + startY;

    if (direction === DIRECTION.DOWN) {
      y++;
    }

    if (typeof stoppedShapeArray[x][y + 1] === "string") {
      DeleteBlock();
      startY++;
      DrawBlock();
      collision = true;
      break;
    }
    if (y >= 25) {
      collision = true;
      break;
    }
  }
  if (collision) {
    if (startY <= 2) {
      winOrLose = "Game Over";
      ctx.fillStyle = "black";
      gameOver();
    } else {
      for (let i = 0; i < blockCopy.length; i++) {
        let square = blockCopy[i];
        let x = square[0] + startX;
        let y = square[1] + startY;
        stoppedShapeArray[x][y] = curBlockColor;
      }
      CheckForCompletedRows();

      CreateShape();
      direction = DIRECTION.IDLE;
      startX = 4;
      startY = 0;
      DrawBlock();
    }
  }
}

function CheckForHorizontalCollision() {
  var blockCopy = curBlock;
  var collision = false;

  for (var i = 0; i < blockCopy.length; i++) {
    var square = blockCopy[i];
    var x = square[0] + startX;
    var y = square[1] + startY;

    if (direction == DIRECTION.LEFT) {
      x--;
    } else if (direction == DIRECTION.RIGHT) {
      x++;
    }
    var stoppedShapeVal = stoppedShapeArray[x][y];

    if (typeof stoppedShapeVal === "string") {
      collision = true;
      break;
    }
  }

  return collision;
}

function CheckForCompletedRows() {
  let rowsToDelete = 0;
  let startOfDeletion = 0;

  for (let y = 0; y < gridArrayH; y++) {
    let completed = true;

    for (let x = 0; x < gridArrayW; x++) {
      let square = stoppedShapeArray[x][y];

      if (square === 0 || typeof square === "undefined") {
        completed = false;
        break;
      }
    }

    if (completed) {
      if (startOfDeletion === 0) startOfDeletion = y;
      rowsToDelete++;

      for (let i = 0; i < gridArrayW; i++) {
        stoppedShapeArray[i][y] = 0;
        gameBoardArray[i][y] = 0;
        let coorX = coordinateArray[i][y].x;
        let coorY = coordinateArray[i][y].y;
        ctx.fillStyle = "white";
        ctx.fillRect(coorX, coorY, 21, 21);
      }
    }
  }
  if (rowsToDelete > 0) {
    score += 10;
    ctx.fillStyle = "white";
    ctx.fillRect(430, 290, 250, 65);
    ctx.fillStyle = "#485563";
    ctx.font = "80px Arial";
    ctx.fillText(score.toString(), 440, 350);

    MoveAllRowsDown(rowsToDelete, startOfDeletion);
  }
}

function MoveAllRowsDown(rowsToDelete, startOfDeletion) {
  for (var i = startOfDeletion - 1; i >= 0; i--) {
    for (var x = 0; x < gridArrayW; x++) {
      var y2 = i + rowsToDelete;
      var square = stoppedShapeArray[x][i];
      var nextSquare = stoppedShapeArray[x][y2];

      if (typeof square === "string") {
        nextSquare = square;
        gameBoardArray[x][y2] = 1;
        stoppedShapeArray[x][y2] = square;

        let coorX = coordinateArray[x][y2].x;
        let coorY = coordinateArray[x][y2].y;
        ctx.fillStyle = nextSquare;
        ctx.fillRect(coorX, coorY, 21, 21);

        square = 0;
        gameBoardArray[x][i] = 0;
        stoppedShapeArray[x][i] = 0;
        coorX = coordinateArray[x][i].x;
        coorY = coordinateArray[x][i].y;
        ctx.fillStyle = "white";
        ctx.fillRect(coorX, coorY, 21, 21);
      }
    }
  }
}
function RotateBlock() {
  let newRotation = new Array();
  let blockCopy = curBlock;
  let curBlockBU;

  for (let i = 0; i < blockCopy.length; i++) {
    curBlockBU = [...curBlock];
    let x = blockCopy[i][0];
    let y = blockCopy[i][1];
    let newX = GetLastSquareX() - y;
    let newY = x;
    newRotation.push([newX, newY]);
  }
  DeleteBlock();

  try {
    curBlock = newRotation;
    DrawBlock();
  } catch (e) {
    if (e instanceof TypeError) {
      curBlock = curBlockBU;
      DeleteBlock();
      DrawBlock();
    }
  }
}
function GetLastSquareX() {
  let lastX = 0;
  for (let i = 0; i < curBlock.length; i++) {
    let square = curBlock[i];
    if (square[0] > lastX) lastX = square[0];
  }
  return lastX;
}

window.addEventListener("load", function () {
  var audio = document.getElementById("bgMusic");

  audio.addEventListener("ended", function () {
    audio.play();
  });
});

function startMusic() {
  var audio = document.getElementById("bgMusic");
  if (audio.paused) {
    audio.play();
  }
}
