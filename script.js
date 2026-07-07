//Query All

const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const questionText = document.querySelector('#question-text');
const startButton = document.querySelector('#start-btn');
const currentQuestionSpan = document.querySelector('#current-question');
const totalQuestionSpan = document.querySelector('#total-question');
const answerContainer = document.querySelector('#answers-container');
const scoreSpan = document.querySelector('#score');
const finalScoreSpan = document.querySelector('#final-score');
const progressBar = document.querySelector('#progress');
const maxScoreSpan = document.querySelector('#max-score');
const resultMessage = document.querySelector('#result-message');
const restartButton = document.querySelector('#restart-btn');
const submitButton = document.querySelector('#submit-btn');
//Array of Questions and Answers
const quizQuestions = [{
    question: "What is the capital of France?",
    answers: [{
        text: "London", correct: false
    }, {
        text: "Berlin", correct: false
    }, {
        text: "Paris", correct: true
    }, {
        text: "Madrid", correct: false
    },],
}, {
    question: "Which planet is known as the Red Planet?",
    answers: [{
        text: "Venus", correct: false
    }, {
        text: "Mars", correct: true
    }, {
        text: "Jupiter", correct: false
    }, {
        text: "Saturn", correct: false
    },],
}, {
    question: "What is the largest ocean on Earth?",
    answers: [{
        text: "Atlantic Ocean",
        correct: false
    }, {
        text: "Indian Ocean",
        correct: false
    }, {
        text: "Arctic Ocean",
        correct: false
    }, {
        text: "Pacific Ocean",
        correct: true
    },],
}, {
    question: "Which of these is NOT a programming language?",
    answers: [{
        text: "Java", correct: false
    }, {
        text: "Python", correct: false
    }, {
        text: "Banana", correct: true
    }, {
        text: "JavaScript",
        correct: false
    },],
}, {
    question: "What is the chemical symbol for gold?",
    answers: [{
        text: "Go", correct: false
    }, {
        text: "Gd", correct: false
    }, {
        text: "Au", correct: true
    }, {text: "Ag", correct: false},],
},];

//QUIZ State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

//fill some of contents
totalQuestionSpan.textContent = String(quizQuestions.length);
maxScoreSpan.style.color = "#31B29C";
maxScoreSpan.textContent = String(quizQuestions.length);

//Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    //reset vars first
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.toggle('active');
    quizScreen.classList.toggle('active');
    progressBar.style.width = 0 + '%';
    showQuestion();
}

function restartQuiz() {
    startScreen.classList.toggle('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.toggle('active');
}

function showQuestion() {
    answersDisabled = false;
    const {question} = quizQuestions[currentQuestionIndex];
    questionText.textContent = `${question}`;
    currentQuestionSpan.innerText = currentQuestionIndex + 1;
    const {answers} = quizQuestions[currentQuestionIndex];
    answerView(answers);
}

function answerView(array) {
    answerContainer.innerHTML = ``;
    array.forEach((arr) => {
        const button = document.createElement("button");
        button.classList.add('answer-btn');
        button.textContent = arr.text;
        button.dataset.correct = arr.correct;
        button.addEventListener('click', () => {
            currentQuestionIndex++;
            //optimization check
            if (answersDisabled) return;
            answersDisabled = true;
            const selectedAnswer = event.target;
            if (button.dataset.correct === "true") {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }

            if (selectedAnswer.dataset.correct === "true") {
                score++;
                scoreSpan.textContent = score;
            }
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showMessage();
                }
            }, 500);

            let progressWidth = (currentQuestionIndex / quizQuestions.length) * 100;
            progressBar.style.width = progressWidth + '%';
        });

        answerContainer.appendChild(button);
    });
}

function showMessage() {
    quizScreen.classList.toggle('active');
    resultScreen.classList.toggle('active');
    finalScoreSpan.innerText = score;
    finalScoreSpan.style.color = "#31B29C";
    (score < 2) ? (resultMessage.innerHTML = `<p class="result_message-info">You got this, you can go back and retry!!!</p>`) : '';
    (score > 2 && score <= 4) ? (resultMessage.innerHTML = `<p class="result_message-info">Well-done. Keep up the good work</p>`) : '';
    (score === 5) ? (resultMessage.innerHTML = `<p class="result_message-info">Excellent!! You might be a Genius.</p>`) : '';
}

