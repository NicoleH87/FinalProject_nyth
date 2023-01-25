const xMark = "<img src = 'x_selection.png'/>";
const oMark = "<img src = 'o_selection.png'/>";
const blank = "<img src = 'blank.png'>";
const bbx = "<img src = 'b_b_x.png'>";
const obb = "<img src = 'o_b_b.png'/>";
const obx = "<img src = 'o_b_x.png'/>";

let playerChoice;
let player;
let computer;
let lastMarkBox = 10;
let turn;
let playerTurnEnd;

let gameStart = false;
let canChoose = true;
let boardfull = false;
let isFirstMove = true;

const playboard = ['', '', '', '', '', '', '', '', ''];
const xLayer1 = ['', '', '', '', '', '', '', '', ''];
const oLayer1 = ['', '', '', '', '', '', '', '', ''];

let block0 = document.getElementById('block_0');
let block1 = document.getElementById('block_1');
let block2 = document.getElementById('block_2');
let block3 = document.getElementById('block_3');
let block4 = document.getElementById('block_4');
let block5 = document.getElementById('block_5');
let block6 = document.getElementById('block_6');
let block7 = document.getElementById('block_7');
let block8 = document.getElementById('block_8');

let inputPlayer = document.getElementById('playerSign');
let testOutput = document.getElementById('test');
let gameEndMessage = document.getElementById('endResult');
let outMessage = document.getElementById('message');
let selectMessage = document.getElementById('doneSelect');

let playAudio1 = () => {
  let audio = document.getElementById('audioMessage1');
  audio.play();
}

let playAudio2 = async () =>
{
  let audioSec = document.getElementById('audioMessage2');
  audioSec.play();
}

let selectbtn = document.getElementById('selected');

let setPlayer = () => {
  if (
    (canChoose === false || gameStart === true) &&
    playerChoice !== inputPlayer.sign.value
  ) {
    testOutput.innerHTML = 'Player: ' + playerChoice;
    selectMessage.innerHTML = 'You have already selected. End game to change selection.';
  } else {
    testOutput.innerHTML = 'Player: ' + playerChoice;
    selectMessage.innerHTML = '';
  }

  while (canChoose) {
    playerChoice = inputPlayer.sign.value;
    if (playerChoice === 'X') {
      player = 'X';
      computer = 'O';
      outMessage.innerHTML = 'Player goes first!';
    } else {
      player = 'O';
      computer = 'X';
      outMessage.innerHTML = 'Computer goes first! Tap the board to start.';
    }
    testdisplay();
    gameStart = true;
    canChoose = false;
  }
}

selectbtn.addEventListener('click', setPlayer, true);
selectbtn.addEventListener('click', playAudio1, true);

let testdisplay = () => testOutput.innerHTML = 'Player: ' + player;

block0.addEventListener('click', () => {
  turnProcess(0);
  playAudio2();
});

block1.addEventListener('click', () => {
  turnProcess(1);
  playAudio2();
});

block2.addEventListener('click', () => {
  turnProcess(2);
  playAudio2();
});

block3.addEventListener('click', () => {
  turnProcess(3);
  playAudio2();
});

block4.addEventListener('click', () => {
  turnProcess(4);
  playAudio2();
});

block5.addEventListener('click', () => {
  turnProcess(5);
  playAudio2();
});

block6.addEventListener('click', () => {
  turnProcess(6);
  playAudio2();
});

block7.addEventListener('click', () => {
  turnProcess(7);
  playAudio2();
});

block8.addEventListener('click', () => {
  turnProcess(8);
  playAudio2();
});

let turnProcess = input => {
  if (isFirstMove === false || player === 'X') {
    turn = player;
    outMessage.innerHTML = 'Player turn!';
    playerTurnEnd = false;
    markBox(input);
    if (playerTurnEnd === true && boardfull === false) {
      computerTurn();
    }
  }
  if (isFirstMove === true && computer === 'X') {
    computerTurn();
  }
  isFirstMove = (isFirstMove === true) ? false : true;
}

let computerTurn = async () => {
  outMessage.innerHTML = 'Computer Turn!';
  await delay(360);
  turn = computer;
  let temp = Math.floor(Math.random() * 9);
  while (!checkDisplay(temp, computer)) {
    temp = Math.floor(Math.random() * 9);
  }
  markBox(temp);
  lastMarkBox = temp;
};

let checkDisplay = (boxNum, mark) => {
  let other = (mark === computer) ? player : computer;

  if (boxNum === lastMarkBox) {
    outMessage.innerHTML = (player === mark) ? 'Player turn! Computer selected this box in their last turn! Select another box.' : '';
    return false;
  }
  if (playboard[boxNum] === mark) {
    outMessage.innerHTML = 'Player turn! You already locked the box. Select another box.';
    return false;
  }
  if (playboard[boxNum] === other) {
    outMessage.innerHTML = 'Player turn! The box was locked by computer. Select another box.';
    return false;
  }
  return true;
}

let markBox = num => {
  let mark = (turn === player) ? player : computer;
  if ((isFirstMove) || (gameStart === true && (checkDisplay(num, mark)))) {
    if (num === 0) {
      block0.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 1) {
      block1.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 2) {
      block2.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 3) {
      block3.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 4) {
      block4.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 5) {
      block5.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 6) {
      block6.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else if (num === 7) {
      block7.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    } else {
      block8.innerHTML = selectDisplay(num, mark);
      markGrid(num, mark);
    }

    playerTurnEnd = (mark === player) ? true : false;
    if (gameStart === true) {
      checkforwinner();
    }
  }
}

let markGrid = (boxNum, mark) => {
  if (playboard[boxNum] === '') {
    if (mark === 'X') {
      if (xLayer1[boxNum] === '') {
        xLayer1[boxNum] = mark;
      } else {
        playboard[boxNum] = mark;
        oLayer1[boxNum] = '';
      }
    }
    if (mark === 'O') {
      if (oLayer1[boxNum] === '') {
        oLayer1[boxNum] = mark;
      } else {
        playboard[boxNum] = mark;
        xLayer1[boxNum] = '';
      }
    }
    lastMarkBox = boxNum;
  }
}

let selectDisplay = (boxNum, mark) => {
  if (playboard[boxNum] === '') {
    if (mark === 'X') {
      if (xLayer1[boxNum] === 'X') {
        return xMark;
      } else if (oLayer1[boxNum] === 'O') {
        return obx;
      } else {
        return bbx;
      }
    } else {
      if (oLayer1[boxNum] === 'O') {
        return oMark;
      } else if (xLayer1[boxNum] === 'X') {
          return obx;
      } else {
        return obb;
      }
    }
  } else if (playboard[boxNum] === 'X') {
    return xMark;
  } else {
    return oMark;
  }
}

let checkmatch = () => {
  for (let i = 0; i < 9; i += 3) {
    if (xcheckline(i, i + 1, i + 2)) {
      return xLayer1[i];
    }
    if (ocheckline(i, i + 1, i + 2)) {
      return oLayer1[i];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (xcheckline(i, i + 3, i + 6)) {
      return xLayer1[i];
    }
    if (ocheckline(i, i + 3, i + 6)) {
      return oLayer1[i];
    }
  }
  if (xcheckline(0, 4, 8)) {
    return xLayer1[0];
  }
  if (ocheckline(0, 4, 8)) {
    return oLayer1[0];
  }
  if (xcheckline(2, 4, 6)) {
    return xLayer1[2];
  }
  if (ocheckline(2, 4, 6)) {
    return oLayer1[2];
  }
  return '';
};

let xcheckline = (a, b, c) => {
  return (
    xLayer1[a] === xLayer1[b] &&
    xLayer1[b] === xLayer1[c] &&
    (xLayer1[a] === player || xLayer1[a] === computer)
  );
};

let ocheckline = (a, b, c) => {
  return (
    oLayer1[a] === oLayer1[b] &&
    oLayer1[b] === oLayer1[c] &&
    (oLayer1[a] === player || oLayer1[a] === computer)
  );
};

let isBoardFull = () => {
  for (let i = 0; i < playboard.length; i++)
    if (playboard[i] !== player && playboard[i] !== computer) {
      return false;
    }
  return true;
}

let checkforwinner = () => {
  let res = checkmatch();
  boardfull = isBoardFull();
  if (res === player) {
    gameEndMessage.innerHTML = 'Congratulations ' + player + ', you WIN!';
    gameStart = false;
  } else if (res === computer) {
    gameEndMessage.innerHTML = 'Computer ' + computer + ' wins! Better luck next time, ' + playerChoice + '!';
    gameStart = false;
  } else {
    outMessage.innerHTML = 'Player Turn!';
    if (boardfull) {
      gameEndMessage.innerHTML = 'DRAW!';
      gameStart = false;
    }
  }
};

let delay = (ms) => new Promise((res) => setTimeout(res, ms));

let resetGame = () => {
  for (let i = 0; i < playboard.length; i++) {
    playboard[i] = '';
    xLayer1[i] = '';
    oLayer1[i] = '';
  }

  playerChoice = '';
  player = '';
  computer = '';
  lastMarkBox = 10;
  turn = '';
  playerTurnEnd = false;

  gameStart = false;
  canChoose = true;
  boardfull = false;
  isFirstMove = true;

  block0.innerHTML = blank;
  block1.innerHTML = blank;
  block2.innerHTML = blank;
  block3.innerHTML = blank;
  block4.innerHTML = blank;
  block5.innerHTML = blank;
  block6.innerHTML = blank;
  block7.innerHTML = blank;
  block8.innerHTML = blank;

  testOutput.innerHTML = '';
  document.getElementById('playerSign').value = '';
  outMessage.innerHTML = '';
  gameEndMessage.innerHTML = '';
  selectMessage.innerHTML = '';

  Array.from(document.querySelectorAll('sign'), input => (input.checked = false));
}

document.getElementById('resetAll').addEventListener('click', resetGame, true);