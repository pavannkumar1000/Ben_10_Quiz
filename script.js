const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Shuffle function
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start Quiz
function startQuiz() {
  selectedQuestions = shuffleArray([...questions]).slice(0, 10); // Pick 10 random
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.style.display = "none";
  showQuestion();
}

// Show a question
function showQuestion() {
  resetState();

  let currentQuestion = selectedQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Shuffle options before showing
  let shuffledOptions = shuffleArray([...currentQuestion.options]);

  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    optionsContainer.appendChild(btn);

    btn.addEventListener("click", () => selectAnswer(btn, currentQuestion.answer));
  });
}

// Reset old state
function resetState() {
  nextBtn.style.display = "none";
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
}

// Handle answer
function selectAnswer(selectedBtn, correctAnswer) {
  const options = document.querySelectorAll(".option");

  options.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

// Next button click
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// Show final score
function showScore() {
  resetState();
  questionElement.textContent = `🎉 You scored ${score} out of ${selectedQuestions.length}!`;
  nextBtn.textContent = "Play Again";
  nextBtn.style.display = "inline-block";
  nextBtn.onclick = () => startQuiz();
}

// Start when page loads
startQuiz();
