function filterGallery() {
  const selectedCity = document.getElementById("city-dropdown").value;
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach(item => {
      const itemTag = item.getAttribute("data-tag");

      // Show the item if it matches the selected city or if "All" is selected
      if (selectedCity === "all" || itemTag === selectedCity) {
          item.style.display = "block";
      } else {
          item.style.display = "none";
      }
  });
}

  const boardSize = 15;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let currentPlayer = 'black';
let gameOver = false;

// 오목 판 생성
const boardElement = document.getElementById('board');
function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

// 셀 클릭 이벤트 핸들러
function handleCellClick(event) {
  if (gameOver) return;

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (board[row][col]) return; // 이미 놓인 위치는 무시

  board[row][col] = currentPlayer;
  event.target.classList.add(currentPlayer);

  if (checkWin(row, col)) {
    document.getElementById('status').innerText = `${currentPlayer === 'black' ? 'Player 1 (Black)' : 'Player 2 (White)'} wins!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    document.getElementById('status').innerText = `${currentPlayer === 'black' ? "Player 1's turn (Black)" : "Player 2's turn (White)"}`;
  }
}

// 승리 조건 확인
function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // 수평
    checkDirection(row, col, 0, 1) || // 수직
    checkDirection(row, col, 1, 1) || // 대각선 오른쪽 아래
    checkDirection(row, col, 1, -1)   // 대각선 왼쪽 아래
  );
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;
  count += countStones(row, col, rowDir, colDir);
  count += countStones(row, col, -rowDir, -colDir);
  return count >= 5;
}

function countStones(row, col, rowDir, colDir) {
  let count = 0;
  let player = board[row][col];
  let r = row + rowDir;
  let c = col + colDir;
  while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

// 게임 초기화
function resetGame() {
  board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
  currentPlayer = 'black';
  gameOver = false;
  createBoard();
  document.getElementById('status').innerText = "Player 1's turn (Black)";
}

// 초기 보드 생성
createBoard();


// Gallery Filtering Function
function filterGallery() {
  const dropdown = document.getElementById('city-dropdown');
  const selectedCity = dropdown.value;
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    if (selectedCity === 'all' || item.dataset.tag === selectedCity) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  // 초기 상태에서 모달을 숨김
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';
});
// Open Modal Function
function openModal(element) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');

  if (modal && modalImg) {
    modal.style.display = 'flex'; // 모달 보이기
    modalImg.src = element.querySelector('img').src; // 선택한 이미지의 src를 모달에 설정
  }
}

// Close Modal Function
function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.style.display = 'none'; // 모달 숨기기
  }
}
