document.addEventListener('DOMContentLoaded', () => {
      const X_CLASS = 'x';
      const O_CLASS = 'o';
      const WINNING_COMBINATIONS = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];

      const board = document.getElementById('board');
      const cells = document.querySelectorAll('[data-cell]');
      const message = document.getElementById('message');
      const messageText = document.getElementById('messageText');
      const restartButton = document.getElementById('restartButton');
      const playerModeBtn = document.getElementById('playerMode');
      const cpuModeBtn = document.getElementById('cpuMode');

      let oTurn = false;
      let vsCPU = false;

      playerModeBtn.onclick = () => {
        vsCPU = false;
        startGame();
      };

      cpuModeBtn.onclick = () => {
        vsCPU = true;
        startGame();
      };

      restartButton.onclick = startGame;

      function startGame() {
        oTurn = false;
        message.classList.remove('show');
        cells.forEach(cell => {
          cell.classList.remove(X_CLASS, O_CLASS);
          cell.textContent = ''; // Clear previous marks
          cell.removeEventListener('click', handleClick);
          cell.addEventListener('click', handleClick, { once: true });
        });
      }

      function handleClick(e) {
        const cell = e.target;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
          endGame(false);
        } else if (isDraw()) {
          endGame(true);
        } else {
          oTurn = !oTurn;
          if (vsCPU && oTurn) {
            setTimeout(computerMove, 500);
          }
        }
      }

      function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
        cell.textContent = currentClass.toUpperCase(); // Show "X" or "O"
      }

      function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination =>
          combination.every(index =>
            cells[index].classList.contains(currentClass)
          )
        );
      }

      function isDraw() {
        return [...cells].every(cell =>
          cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        );
      }

      function endGame(draw) {
        messageText.innerText = draw ? "It's a Draw!" : `${oTurn ? "O" : "X"} Wins!`;
        message.classList.add('show');
      }

      function computerMove() {
        const available = [...cells].filter(cell =>
          !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
        );
        if (available.length === 0) return;
        const randomCell = available[Math.floor(Math.random() * available.length)];
        randomCell.click();
      }

      // Start with default mode
      startGame();
    });