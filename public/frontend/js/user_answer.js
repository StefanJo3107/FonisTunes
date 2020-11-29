const optionDivs = document.getElementsByClassName("answer");
const scoreSpan = document.getElementsByClassName("score")[0];
let answerIndex = -1;
let optionBackgroundColor = optionDivs[0].style.backgroundColor;

let score = 0;

let currentAnswer = null;
let feedback = [];

addClickEvent();

//adding click event for buttons
function addClickEvent() {
    for (let i = 0; i < optionDivs.length; i++) {
        optionDivs[i].addEventListener("click", function () {
            getUserAnswer(i);
        });
    }
}

//getting answer from the user and proceeding to the next question
function getUserAnswer(optionIndex) {
    if (!roundOver) {
        if (optionIndex == answerIndex) {
            optionDivs[optionIndex].style.backgroundColor = "lightgreen";
            score += Math.min(
                Math.round(
                    map(
                        Math.round(videoTime.end - player.getCurrentTime()),
                        0,
                        videoTime.end - videoTime.start,
                        0,
                        10
                    )
                ) * 100,
                100
            );
            scoreSpan.textContent = score;
        } else {
            optionDivs[optionIndex].style.backgroundColor = "red";
        }

        feedback.push({
            artist: currentAnswer.artist,
            track: currentAnswer.track,
            correct: optionIndex == answerIndex,
        });

        roundOver = true;
        state = 0;
        loadNextVideo();
    }
}

//answer initialization
function initializeAnswers(answers) {
    console.log(answers.correct.track);
    answerIndex = Math.floor(Math.random() * optionDivs.length);

    currentAnswer = answers.correct;

    let otherAnswersIndex = 0;

    for (let i = 0; i < optionDivs.length; i++) {
        if (answerIndex == i) {
            optionDivs[i].innerHTML =
                answers.correct.track.length > 30
                    ? answers.correct.track.substring(0, 25) + "..."
                    : answers.correct.track;
        } else {
            optionDivs[i].innerHTML =
                answers.other[otherAnswersIndex].track > 30
                    ? answers.other[otherAnswersIndex].track.substring(0, 25) +
                      "..."
                    : answers.other[otherAnswersIndex].track;
            otherAnswersIndex++;
        }

        optionDivs[i].style.backgroundColor = optionBackgroundColor;
    }
}

const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
