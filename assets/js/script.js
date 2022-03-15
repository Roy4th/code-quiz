var startButton = document.getElementById("start-button");
var startScreen = document.getElementById("start-screen");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-btns");
var finalScreen = document.getElementById("final-screen");
var score = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var restart = document.getElementById("restart");
var restartButton = document.getElementById("restart-btn");
var currentTime = document.getElementById("current-time");
var time = 60;
var index = 0;
var initialInput = document.querySelector("#initial-text");
var initialForm = document.querySelector("#initial-form");
var initialList = document.querySelector("#initial-list");
var initialCountSpan = document.querySelector("#initial-count");
var initials = [""];

var question = [
    {
        questionNumber:"1. How do you start a variable in Javascript?",
        answers: ["div","?","link","var"],
        correctAnswer: "var"
    },
    {
        questionNumber:"2. What simbol is used when writing a string with multiple values?",
        answers: ["''","[]","{}",","],
        correctAnswer: "''"
    },
    {
        questionNumber:"3. What tool is used when debugging in javascript?",
        answers: ["funtion","Console.log","for loops","Terminal"],
        correctAnswer: "Console.log"
    },
    {
        questionNumber:"4. How old do you have to be to write code.",
        answers: ["10","18","21","all ages"],
        correctAnswer: "all ages"
    },
]

// timer function
var timer = function() {
    time--
    currentTime.textContent = time;
    if (time <= 0) {
        time = 0;
        endQuiz()
    }
};

var startQuiz = function() {
    startScreen.style.display = "none";
    questionContainerEl.style.display = "block";
    setInterval(timer,1000);
    currentTime.textContent = time;
    selectQuestion();
};

var selectQuestion = function() {
    var current = question[index];
    questionEl.textContent=current.questionNumber;
    answerButtonEl.innerHTML="";
    current.answers.forEach(function(answers,i) {
        console.log(answers,i)
        var button = document.createElement("button");
        button.setAttribute("value",answers)
        button.textContent=answers;
        button.onclick=selectAnswer
        answerButtonEl.append(button);
    });
}

var selectAnswer = function() {
    if (this.value !== question[index].correctAnswer){
        time -=10
        if (time < 0) {
            time = 0;
        }
        currentTime.textContent=time;
    } index++
    if (index === question.length) { 
        endQuiz();
    } else {
        selectQuestion();
    }
}

var endQuiz = function() {
    questionContainerEl.style.display = "none";
    finalScreen.style.display = "block";
    finalScreen.textContent="Final";
    finalScreen.append(score);
    score.textContent=" " + "Score= "+ time;
    renderInitials();
}

var renderInitials = function() {
    questionContainerEl.style.display = "none";
    finalScreen.style.display = "block";
    initialsEl.style.display = "block";
    initialList.innerHTML = "";
    initialCountSpan.textContent = initials.length;
    finalScreen.append(initials);

    for (var i = 0; i < initials.length; i++) {
        var initial = initials[i];

        var li = document.createElement("li");
        li.textContent = initial + time;
        initialList.appendChild(li);
    }
    restart.style.display = "block";
}

initialForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var initialText = initialInput.value.trim();

    if (initialText === "") {
        return;
    }

    initials.push(initialText);
    initialInput.value = "";
    
    renderInitials();
});

var refreshPage = function() {
    window.location.reload();
} 

startButton.addEventListener("click", startQuiz);

restartButton.addEventListener("click", refreshPage);