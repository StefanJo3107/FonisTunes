let quiz = [];
const numOfQuestions = 5;
const numOfAnswers = 4;
let roundOver = false;
let questionIndex = 0;

let currentQuestionSpan = document.getElementsByClassName("current-question");
let numQuestionsSpan = document.getElementsByClassName("num-questions");

generateQuiz().then((quiz) => {
    numQuestionsSpan[0].textContent = numOfQuestions;
    currentQuestionSpan[0].textContent = questionIndex + 1;
    initializeAnswers(quiz[questionIndex]);
    document.querySelector("body").classList.add("display");
});

function generateQuiz() {
    let promises = [];
    for (let i = 0; i < numOfQuestions; i++) {
        promises.push(
            generateAnswers().then((answers) => {
                quiz.push(answers);
            })
        );
    }

    return Promise.all(promises).then((temp) => {
        return quiz;
    });
}

function generateAnswers() {
    let answers = {
        correct: null,
        other: [],
    };

    let promises = [];
    for (let i = 0; i < numOfAnswers * 3; i++) {
        promises.push(
            fetchRandomData().then((data) => {
                if (answers.correct === null || answers.correct === undefined)
                    answers.correct = data;
                else answers.other.push(data);
                return true;
            })
        );
    }

    return Promise.all(promises).then((passed) => {
        answers.other = answers.other
            .filter((element) => {
                return element !== undefined;
            })
            .slice(0, numOfAnswers - 1);
        return answers;
    });
}

function loadNextQuestion() {
    roundOver = true;

    if (questionIndex + 1 < numOfQuestions) {
        setTimeout(function () {
            questionIndex++;
            roundOver = false;
            currentQuestionSpan[0].textContent = questionIndex + 1;
            initializeAnswers(quiz[questionIndex]);
        }, 2000);
    } else {
        console.log("end");
    }
}
