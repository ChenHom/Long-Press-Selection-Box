// 動態生成 200 個盒子
const fragment = document.createDocumentFragment();
for (let i = 0; i < 200; i++) {
  const box = document.createElement('div');
  box.className = 'box';
  fragment.appendChild(box);
}
document.body.appendChild(fragment);

// 選框邏輯
let start = []; // 記錄起始點
let isLongPress = false;
let longPressTimer = null;

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('box')) {
    longPressTimer = setTimeout(() => {
      isLongPress = true;
      start = [e.pageX, e.pageY];
      document.addEventListener('mousemove', handleMove);
    }, 300);
  }
});

document.addEventListener('mouseup', (e) => {
  clearTimeout(longPressTimer);

  if (isLongPress) {
    start = [];
  } else if (!e.target.classList.contains('box')) {
    clearSelection(); // 點擊空白處清除所有選中
  }
  document.removeEventListener('mousemove', handleMove);
  isLongPress = false;
});

function handleMove(e) {
  if (!isLongPress) return;
  const x = e.pageX;
  const y = e.pageY;
  if (start.length === 0) {
    start = [x, y]; // 設定拖曳的起始點
  }
  document.querySelectorAll('.box').forEach((box) => {
    const rect = box.getBoundingClientRect();
    const boxLeft = rect.left + window.scrollX;
    const boxTop = rect.top + window.scrollY;
    const boxRight = boxLeft + rect.width;
    const boxBottom = boxTop + rect.height;

    const selectionLeft = Math.min(start[0], x);
    const selectionTop = Math.min(start[1], y);
    const selectionRight = Math.max(start[0], x);
    const selectionBottom = Math.max(start[1], y);

    // 判斷盒子是否在選框範圍內
    if (
      boxRight > selectionLeft &&
      boxLeft < selectionRight &&
      boxBottom > selectionTop &&
      boxTop < selectionBottom
    ) {
      box.classList.add('active');
    } else {
      console.log('remove 68');
      box.classList.remove('active');
    }
  });
}

function clearSelection() {
  console.log('remove 74');
  document.querySelectorAll('.box').forEach((box) => {
    box.classList.remove('active');
  });
}
