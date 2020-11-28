let quiz = [];
const numOfQuestions = 5;
const numOfAnswers = 4;
let roundOver = false;
let questionIndex = -1;
let questionNumber = 0;

let currentQuestionSpan = document.getElementsByClassName("current-question");
let numQuestionsSpan = document.getElementsByClassName("num-questions");
let modeSpan = document.getElementsByClassName("mode")[0];

//0 for loading, 1 for playing
let state = 0;

let videoTime = {
    start: 60,
    end: 70,
};

//generating array for all the questions
generateQuiz().then((quiz) => {
    switch (sessionStorage.mode) {
        case "hard":
            videoTime.start = 60;
            videoTime.end = 75;
            break;
        case "harder":
        case "pick an artist":
            videoTime.start = 65;
            videoTime.end = 75;
            break;
        case "impossible":
            videoTime.start = 70;
            videoTime.end = 75;
            break;
        case "god mode":
            videoTime.start = 72;
            videoTime.end = 75;
            break;
        default:
            window.location.replace("./mode.html");
            break;
    }

    modeSpan.textContent = sessionStorage.mode.toUpperCase();

    numQuestionsSpan[0].textContent = numOfQuestions;
    currentQuestionSpan[0].textContent = questionNumber + 1;
    if (player.loadVideoById != undefined) {
        loadNextVideo();
    }
});

//callback from Youtube Player API for when the player is ready
function onPlayerReady(event) {
    event.target.setPlaybackQuality("144p");
    let video = document.getElementsByTagName("iframe")[0];
    video.style.width = 0;
    video.style.height = 0;
    if (quiz.length > 0) {
        loadNextVideo();
    }
}

//generating all questions
function generateQuiz() {
    let promises = [];
    for (let i = 0; i < numOfQuestions + 5; i++) {
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

//generating answers for one question
function generateAnswers() {
    let answers = {
        correct: null,
        other: [],
    };

    let promises = [];
    for (let i = 0; i < numOfAnswers + 4; i++) {
        if (sessionStorage.mode !== "pick an artist") {
            promises.push(
                fetchRandomData().then((data) => {
                    if (
                        answers.correct === null ||
                        answers.correct === undefined
                    )
                        answers.correct = data;
                    else answers.other.push(data);
                    return true;
                })
            );
        } else {
            promises.push(
                fetchArtistData(sessionStorage.artist).then((data) => {
                    if (data !== undefined) {
                        if (
                            answers.correct === null ||
                            answers.correct === undefined
                        )
                            answers.correct = data;
                        else answers.other.push(data);
                        return true;
                    } else {
                        alert("Artist you picked is not currently available!");
                        window.location.replace("mode.html");
                    }
                })
            );
        }
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

//loading next question
function loadNextQuestion() {
    if (questionNumber <= numOfQuestions) {
        roundOver = false;
        currentQuestionSpan[0].textContent = questionNumber;
        initializeAnswers(quiz[questionIndex]);
    } else {
        console.log("end");
    }
}

//loading next video
function loadNextVideo() {
    if (questionNumber + 1 <= numOfQuestions) {
        questionIndex++;
        questionNumber++;
        player.loadVideoById({
            videoId: getId(quiz[questionIndex].correct.mvideo),
            startSeconds: videoTime.start,
            endSeconds: videoTime.end,
        });
    } else {
        sessionStorage.setItem("feedback", JSON.stringify(feedback));
        sessionStorage.setItem("score", score);
        player.stopVideo();
        setTimeout(() => {
            window.location.replace("./overview.html");
        }, 1000);
    }
}

//callback from Youtube Player API for when the player state has changed
function onStateChanged(event) {
    if (event.data == 1) {
        if (state == 0) {
            document.querySelector("body").classList.add("display");
            state = 1;
            loadNextQuestion();
        }
    }
    console.log("State: " + event.data);
}

//callback from Youtube Player API for when the error occurred
function onPlayerError(event) {
    state = 0;
    questionNumber--;
    console.log("Error: " + event.data);
    loadNextVideo();
}
