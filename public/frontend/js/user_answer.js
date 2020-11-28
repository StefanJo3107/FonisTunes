const optionDivs = document.getElementsByClassName("answer");
let answerIndex = -1;
let optionBackgroundColor = optionDivs[0].style.backgroundColor;

addClickEvent();

function addClickEvent() {
    for (let i = 0; i < optionDivs.length; i++) {
        optionDivs[i].addEventListener("click", function () {
            getUserAnswer(i);
        });
    }
}

function getUserAnswer(optionIndex) {
    if (!roundOver) {
        if (optionIndex == answerIndex) {
            optionDivs[optionIndex].style.backgroundColor = "lightgreen";
        } else {
            optionDivs[optionIndex].style.backgroundColor = "red";
        }

        loadNextVideo();
    }
}

function initializeAnswers(answers) {
    console.log(answers.correct.track);
    answerIndex = Math.floor(Math.random() * optionDivs.length);

    let otherAnswersIndex = 0;

    for (let i = 0; i < optionDivs.length; i++) {
        if (answerIndex == i) {
            optionDivs[i].innerHTML =
                answers.correct.track.length > 40
                    ? answers.correct.track.substring(0, 35) + "..."
                    : answers.correct.track;
        } else {
            optionDivs[i].innerHTML =
                answers.other[otherAnswersIndex].track > 40
                    ? answers.other[otherAnswersIndex].track.substring(0, 35) +
                      "..."
                    : answers.other[otherAnswersIndex].track;
            otherAnswersIndex++;
        }

        optionDivs[i].style.backgroundColor = optionBackgroundColor;
    }
}

function checkUserAnswer(classList, correct) {}
