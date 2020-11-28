window.onload = () => {
    const results = JSON.parse(sessionStorage.feedback);
    for (let i = 0; i < results.length; i++) {
        let table = document.getElementsByClassName("scores-table")[0];

        let row = table.insertRow(-1);
        document.getElementsByClassName("scores")[0].appendChild(row);

        let numCell = row.insertCell(0);
        let artistCell = row.insertCell(1);
        let trackCell = row.insertCell(2);
        let correctCell = row.insertCell(3);

        numCell.innerHTML = i + 1;
        artistCell.innerHTML = results[i].artist;
        trackCell.innerHTML = results[i].track;
        correctCell.innerHTML = results[i].correct ? "✓" : "✖";

        numCell.classList.add("number");
        artistCell.classList.add("artist");
        trackCell.classList.add("song");
        correctCell.classList.add("time-to-guess");

        document.getElementsByClassName("score")[0].textContent =
            sessionStorage.score;
    }
};
