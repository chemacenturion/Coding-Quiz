var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var count = 100;

var rankingButton = document.getElementById("ranking-button")

rankingButton.addEventListener('click', showMyHighScore);

function showMyHighScore() {
    var highScore = localStorage.getItem("newScore");
    // now put ^ highscore onto the page by appending it where it needs to go.
    document.getElementById("final-score").textContent = score
}



var score = 0;


var questions = [
    {
        question: 'Which of these data types is often used for the values of true or false?',
        answers: [
            { text: 'boolean', correct: true },
            { text: 'string', correct: false },
            { text: 'number', correct: false },
            { text: 'undefined', correct: false },
        ]
    },
    {
        question: 'While "&&" stands for "and" what does the symbol "||" represent?',
        answers: [
            { text: 'if', correct: false },
            { text: 'also', correct: false },
            { text: 'or', correct: true },
            { text: 'equal', correct: false },

        ]
    },
    {
        question: 'All of the following are primitive data types in javascript except for:',
        answers: [
            { text: 'string', correct: false },
            { text: 'number', correct: false },
            { text: 'function', correct: true },
            { text: 'symbol', correct: false },

        ]
    },
    {
        question: 'Which JavaScipt label catches all the values, except for the ones specified?',
        answers: [
            { text: 'label', correct: false },
            { text: 'default', correct: true },
            { text: 'try', correct: false },
            { text: 'catch', correct: false },

        ]
    },
    {
        question: 'The abbreviation NaN stands for:',
        answers: [
            { text: 'Not a Numeral', correct: false },
            { text: 'Not a Notation', correct: false },
            { text: 'Error Unspecified', correct: false },
            { text: 'Not a Number', correct: true },

        ]
    }
]
console.log("count: ", count)

let shuffledQuestions, currentQuestionsIndex

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});



function saveMyScore() {
    localStorage.setItem("newScore: ", score);
    var savedScore = localStorage.getItem("newScore")
}


function startGame() {
    startBtn.classList.add('hide')


    //counter
    intId = setInterval(countdown, 1000);
    var counter = document.querySelector("#time_remaining");

    function countdown() {
        count--;
        counter.textContent = "Time remaining: " + count;
        if (count === 0) {
            clearInterval(intId);
        }

    }


    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
//GIVEN I am taking a code quiz
// WHEN I answer a question
// THEN I am presented with another question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        console.log("you've selected the correct answer!!")
        score = score + 5;
        console.log("score is after selecting the correct answer: ", score)

    } else {
        count = count - 10;
        console.log("count is after decreasing, now: ", count)
        console.log("decreasing score!", score)

    }
    // setStatusClass(document.body, correct)

    // Array.from(answerButtonsElement.children).forEach(button => {
    //     // setStatusClass(button, button.dataset.correct);

    //     // if (button.dataset.incorrect) {
    //     //     count = count - 10;
    //     //     console.log("now count is: ", count)
    //     // }
    // })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide');
        saveMyScore()

    }

}

// function setStatusClass(element, correct) {
//     clearStatusClass(element);
//     console.log("correct is: ", correct)
//     if (correct) {
//         element.classList.add('correct')
//         console.log("nswer is correct");
//         score = score + 5;
//         console.log("incraeasing score!", score)

//     } else {
//         element.classList.add('incorrect');
//         console.log("nswer is incorrect")
//         score = score + 5;
//         console.log("decraeasing score!", score)



//     }
// }

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

document.querySelector(".rankingButton").addEventListener("click", function () {
    var ranking = document.querySelector(".ranking");
    ranking.style.display = ranking.style.display === 'none' ? 'block' : 'none';
})