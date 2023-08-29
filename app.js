let selectedChip = null;
let boards = [document.querySelector('.container-first'), document.querySelector('.container-second'), document.querySelector('.container-third')];
let currentBoardIndex = 0;
let chips = document.querySelectorAll('.chip');
let undoButton = document.getElementById('undo');
let clearButton = document.getElementById('clear');
let doubleButton = document.getElementById('double');

chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    if (selectedChip !== null) {
      selectedChip.classList.remove('active');
    }
    selectedChip = this;
    selectedChip.classList.add('active');
  });
});

function handleCellClick(event) {
  let clickedCell = event.target.closest('div');
  if (clickedCell && !clickedCell.classList.contains('marked') && !clickedCell.querySelector('.placed-chip')) {
    if (selectedChip === null) {
      return;
    }

    let chipValue = selectedChip.querySelector('.chip-value').innerText;
    let chipColor = selectedChip.dataset.color;
    let chip = document.createElement('div');
    chip.className = 'placed-chip';
    chip.innerText = chipValue;
    chip.classList.add(chipColor);
    clickedCell.appendChild(chip);
    clickedCell.classList.add('marked');
    selectedChip.classList.remove('active');
    selectedChip = null;
    currentBoardIndex = (currentBoardIndex + 1) % boards.length;

    let chipBackgrounds = [
      '/assets/chip-background-small-2.png',
      '/assets/chip-background-small-3.png',
      '/assets/chip-background-small-1.png'
    ];
    chip.style.backgroundImage = `url(${chipBackgrounds[currentBoardIndex]})`;
  }
}

boards.forEach(function (board) {
  board.addEventListener('click', handleCellClick);
});

undoButton.addEventListener('click', function () {
  let placedChips = document.querySelectorAll('.placed-chip');
  let lastChip = placedChips[placedChips.length - 1];
  if (lastChip) {
    lastChip.remove();
  }
  currentBoardIndex = (currentBoardIndex + boards.length) % boards.length;
});

clearButton.addEventListener('click', function () {
  let placedChips = document.querySelectorAll('.placed-chip');
  placedChips.forEach(function (chip) {
    chip.remove();
  });
});

doubleButton.addEventListener('click', function () {
  let placedChips = document.querySelectorAll('.placed-chip');
  placedChips.forEach(function (chip) {
    let value = parseInt(chip.innerText);
    chip.innerText = (value * 2);
  });
});
