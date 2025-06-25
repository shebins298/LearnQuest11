const chapterSelect = document.getElementById("chapterSelect");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizBox = document.getElementById("quizBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// Load chapters into dropdown
for (let chapter in cppQuestions) {
  const option = document.createElement("option");
  option.value = chapter;
  option.textContent = chapter;
  chapterSelect.appendChild(option);
}

startQuizBtn.addEventListener("click", () => {
  const selected = chapterSelect.value;
  if (!selected) return alert("Please select a chapter.");
  currentQuestions = cppQuestions[selected];
  currentIndex = 0;
  score = 0;
  scoreEl.textContent = score;
  quizBox.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = currentQuestions[currentIndex];
  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  q.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => handleAnswer(option));
    optionsEl.appendChild(li);
  });
  nextBtn.classList.add("hidden");
}

function handleAnswer(selected) {
  const correct = currentQuestions[currentIndex].answer;
  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
    scoreEl.textContent = score;
  } else {
    feedbackEl.textContent = `❌ Incorrect! Correct: ${correct}`;
  }
  document
    .querySelectorAll("#options li")
    .forEach((li) => (li.style.pointerEvents = "none"));
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Your final score: ${score}/${currentQuestions.length}`;
    nextBtn.classList.add("hidden");
  }
});
