let quiz  = [
    {
        question: "What is the capital of France?",
        option: ["Berlin","Madrid","Paris","Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is Uranus in the Solar System?",
        option: ["Planet","Star","Asteroid","Satellite"],
        answer: "Planet"
    },
    {
        question: "In Which Continent does Pakistan come?",
        option: ["Africa","Australia","Arctic","Asia"],
        answer: "Asia"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        option: ["Earth","Venus","Mars","Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        option: ["Arctic Ocean","Pacific Ocean","Arabian Sea","Atlantic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the smallest unit of Life?",
        option: ["Organism","Tissues","Organs","Cells"],
        answer: "Cells"
    }
];

let questionNumberEl = document.getElementById('question-number');
let questionEl = document.getElementById('question');
let optionEl = document.querySelectorAll('.option');
let timeEl = document.getElementById('timer');
let nextBtn = document.getElementById('next-btn');
let resultEl = document.getElementById('result');
let scoreEl = document.getElementById('score');
let reset = document.getElementById('reset');


let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

function loadQuestion(){
    let currentQuiz = quiz[currentQuestion]
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quiz.length}`;
    questionEl.textContent = currentQuiz.question;
    optionEl.forEach((option, index)=>{
        option.textContent = currentQuiz.option[index];
        option.classList.remove('correct','incorrect');
        option.onclick = () => Selectoption(option);

    });
    answerSelected = false;
    nextBtn.disabled = true;
    startTimer();
}

function Selectoption(option){
    if(!answerSelected){
        answerSelected = true;
        let selectedAnswer = option.textContent;
        let correctAnswer = quiz[currentQuestion].answer;
        if(selectedAnswer === correctAnswer){
            score++
            option.classList.add('correct');
        }else{
            option.classList.add('incorrect');
            optionEl.forEach(opt => {
                if(opt.textContent === correctAnswer){
                    opt.classList.add('correct');
                }
            });
        }
        nextBtn.disabled = false;
    }
}

function loadNextQuestion(){
    clearInterval(timer);
    if(currentQuestion < quiz.length - 1){
        currentQuestion++;
        loadQuestion();
    }else{
        showResult();
    }
}

nextBtn.addEventListener('click', () =>{
    loadNextQuestion();
});

function startTimer(){
    clearInterval(timer);
    timeLeft = 10;
    timeEl.textContent = `Time left: ${timeLeft}`;
    timeEl.style.color = "";

    timer = setInterval(() =>{
        timeLeft--;
        timeEl.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 3) {
            timeEl.style.color = "red";
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                loadNextQuestion();
            }
        }
    }, 1000);
}

function showResult(){
    let quizEl = document.getElementById('quiz');
    let emojiEl = document.getElementById('emoji');
    quizEl.classList.add('hide');
    resultEl.classList.remove('hide');
    reset.classList.remove('hide')
    scoreEl.textContent = `${score} out of ${quiz.length}`

    if(score === quiz.length){
        emojiEl.textContent = '😃';
        blastConfetti();
    }
    else if(score >= quiz.length/2){
        emojiEl.textContent = "😐";
    }
    else{
        emojiEl.textContent = "😥";
    }
}



reset.addEventListener('click', () => {
    resetQuiz();
});

function resetQuiz(){
    currentQuestion = 0;
    score = 0;
    clearInterval(timer);
    timeLeft = 10;

    let quizEl = document.getElementById('quiz');
    quizEl.classList.remove('hide');
    resultEl.classList.add('hide');
    reset.classList.add('hide');

    loadQuestion();
    startTimer();
}

loadQuestion();


var blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {     particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}