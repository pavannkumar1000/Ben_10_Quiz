const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];


function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}


function startQuiz() {
  selectedQuestions = shuffleArray([...questions]).slice(0, 10);
  currentQuestionIndex = 0;
  score = 0;

  nextBtn.textContent = "Next";
  nextBtn.dataset.mode = "next"; 
  nextBtn.style.display = "none"; 

  showQuestion();
}


function showQuestion() {
  resetState();

  let currentQuestion = selectedQuestions[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  
  let shuffledOptions = shuffleArray([...currentQuestion.options]);

  shuffledOptions.forEach(optText => {
    const btn = document.createElement("button");
    btn.textContent = optText;
    btn.className = "option";
    btn.disabled = false;
    btn.addEventListener("click", () => selectAnswer(btn, currentQuestion.answer));
    optionsContainer.appendChild(btn);
  });

 
  nextBtn.style.display = "none";
}


function resetState() {
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
  
  nextBtn.style.display = "none";
}


function selectAnswer(selectedBtn, correctAnswer) {
  const optionBtns = optionsContainer.querySelectorAll(".option");
  optionBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }


  nextBtn.dataset.mode = "next";
  nextBtn.textContent = "Next";
  nextBtn.style.display = "inline-block";
}

function handleNextButtonClick() {
  const mode = nextBtn.dataset.mode || "next";

  if (mode === "next") {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      showQuestion();
    } else {
      showScore();
    }
  } else if (mode === "restart") {
    startQuiz();
  }
}


function showScore() {
  resetState();
  questionElement.textContent = `🎉 You scored ${score} / ${selectedQuestions.length}!`;
  nextBtn.textContent = "Play Again";
  nextBtn.dataset.mode = "restart";
  nextBtn.style.display = "inline-block";
}


nextBtn.addEventListener("click", handleNextButtonClick);


startQuiz();
