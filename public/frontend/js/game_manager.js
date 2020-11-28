let quiz = [];
const numOfQuestions = 5;
const numOfAnswers = 4;
let roundOver = false;
let questionIndex = -1;

let currentQuestionSpan = document.getElementsByClassName("current-question");
let numQuestionsSpan = document.getElementsByClassName("num-questions");

generateQuiz().then((quiz) => {
    numQuestionsSpan[0].textContent = numOfQuestions;
    currentQuestionSpan[0].textContent = questionIndex + 1;
    player.cueVideoById({
        videoId: getId(quiz[0].correct.mvideo),
        startSeconds: 50,
        endSeconds: 60,
    });
    // initializeAnswers(quiz[questionIndex]);
    // setTimeout(() => {
    //     player.playVideo();
    // }, 1000);
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
        questionIndex++;
        roundOver = false;
        currentQuestionSpan[0].textContent = questionIndex + 1;
        initializeAnswers(quiz[questionIndex]);
    } else {
        console.log("end");
    }
}

function loadNextVideo() {
    if (questionIndex + 1 <= numOfQuestions) {
        player.cueVideoById({
            videoId: getId(quiz[questionIndex + 1].correct.mvideo),
            startSeconds: 50,
            endSeconds: 60,
        });
    }
}
function onStateChanged(event) {
    if (event.data == 5) {
        console.log("hey");
        player.playVideo();
    } else if (event.data == 1) {
        document.querySelector("body").classList.add("display");
        loadNextQuestion();
    }
}
