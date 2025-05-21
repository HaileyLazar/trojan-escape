function startGame() {
  document.getElementById('start').classList.remove('active');
  document.getElementById('puzzle1').classList.add('active');
}

function checkAnswers1() {
  const answers = {
    q1: "Literary",
    q2: "Historical",
    q3: "Literary",
    q4: "Historical"
  };

  const result = document.getElementById('result1');
  let correct = 0;
  for (let key in answers) {
    if (document.getElementById(key).value === answers[key]) correct++;
  }

  if (correct === 4) {
    result.textContent = "✅ All answers are correct!";
    result.className = "correct";
    nextSection('puzzle1', 'puzzle2');
  } else {
    result.textContent = "❌ Some answers are incorrect. Try again.";
    result.className = "incorrect";
  }
}

function checkAnswers2() {
  const answers = {
    q5: "Myth",
    q6: "Fact",
    q7: "Myth",
    q8: "Fact"
  };

  const result = document.getElementById('result2');
  let correct = 0;
  for (let key in answers) {
    if (document.getElementById(key).value === answers[key]) correct++;
  }

  if (correct === 4) {
    result.textContent = "✅ All answers are correct!";
    result.className = "correct";
    nextSection('puzzle2', 'puzzle3');
  } else {
    result.textContent = "❌ Some answers are incorrect. Try again.";
    result.className = "incorrect";
  }
}

function checkAnalysis() {
  const a1 = document.getElementById('question1').value.trim();
  const a2 = document.getElementById('question2').value.trim();
  const a3 = document.getElementById('question3').value.trim();
  const result = document.getElementById('analysisResult');

  if (a1 && a2 && a3) {
    result.textContent = "✅ Your analysis has been submitted!";
    result.className = "correct";
    nextSection('puzzle3', 'puzzle4');
  } else {
    result.textContent = "❌ Please answer all questions.";
    result.className = "incorrect";
  }
}

function nextSection(currentId, nextId) {
  document.getElementById(currentId).classList.remove('active');
  document.getElementById(nextId).classList.add('active');
}

// Drag and Drop Chronological Order Puzzle Logic

const dragContainer = document.getElementById('draggables');
const dropzone = document.getElementById('dropzone');
const orderResult = document.getElementById('orderResult');

function addDragListeners() {
  document.querySelectorAll('.draggable').forEach(item => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.dataset.order);
      e.dataTransfer.effectAllowed = 'move';
      e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', e => {
      e.target.classList.remove('dragging');
    });
  });
}

// Drag over and drop events for dropzone and dragContainer
dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  const order = e.dataTransfer.getData('text/plain');
  const draggedElem = [...document.querySelectorAll('.draggable')]
    .find(el => el.dataset.order === order);
  if (draggedElem && !dropzone.contains(draggedElem)) {
    dropzone.appendChild(draggedElem);
  }
});

dragContainer.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});
dragContainer.addEventListener('drop', e => {
  e.preventDefault();
  const order = e.dataTransfer.getData('text/plain');
  const draggedElem = [...document.querySelectorAll('.draggable')]
    .find(el => el.dataset.order === order);
  if (draggedElem && !dragContainer.contains(draggedElem)) {
    dragContainer.appendChild(draggedElem);
  }
});

function checkOrder() {
  const droppedItems = Array.from(dropzone.children);
  const correctOrder = ['1','2','3','4','5','6'];

  if (droppedItems.length !== correctOrder.length) {
    orderResult.textContent = 'Please arrange all events before checking.';
    return;
  }

  const userOrder = droppedItems.map(item => item.dataset.order);

  const isCorrect = userOrder.every((val, index) => val === correctOrder[index]);

  if (isCorrect) {
    orderResult.textContent = '🎉 Correct! You arranged the events perfectly.';
      document.getElementById('win').classList.add('active');
    // You can advance to next section here
  } else {
    orderResult.textContent = '❌ Incorrect order. Resetting events so you can try again.';
    // Move all draggable items back to original container
    while (dropzone.firstChild) {
      dragContainer.appendChild(dropzone.firstChild);
    }
  }
}

// Initialize drag listeners
addDragListeners();
