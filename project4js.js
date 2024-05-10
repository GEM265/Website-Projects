$(function () {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        wins = [7, 56, 448, 73, 146, 292, 273, 84],
        colors = ["#ff6347", "#ffa500", "#ffd700", "#7fffd4", "#4682b4", "#9370db"], // Array of colors
        confettiTimeout, // Variable to hold the timeout for confetti animation
        confettiInterval; // Variable to hold the interval for confetti animation

    var startNewGame = function () {
        turn = "X";
        score = { "X": 0, "O": 0 };
        moves = 0;
        squares.forEach(function (square) { square.html(EMPTY); });
    };

    var win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    };

    var createConfetti = function () {
        var confettiContainer = document.getElementById("confetti-container");
        if (!confettiContainer) {
            confettiContainer = document.createElement("div");
            confettiContainer.id = "confetti-container";
            document.body.appendChild(confettiContainer);
        }
        for (var i = 0; i < 100; i++) {
            var confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * window.innerWidth + "px";
            confetti.style.animationDelay = Math.random() * 2 + "s";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color from colors array
            confettiContainer.appendChild(confetti);
        }
    };

    var stopConfetti = function () {
        clearInterval(confettiInterval); // Clear the interval
        var confettiContainer = document.getElementById("confetti-container");
        if (confettiContainer) {
            confettiContainer.parentNode.removeChild(confettiContainer); // Remove confetti container from the DOM
        }
    };

    var set = function () {
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        moves += 1;
        score[turn] += $(this)[0].indicator;
        if (win(score[turn])) {
            confettiTimeout = setTimeout(function () {
                createConfetti(); // Create confetti after 1 second delay
                confettiInterval = setInterval(stopConfetti, 4500); // Stop confetti after 4.5 seconds
            }, 100);
            alert("CONGRATS " + turn + " WINS!");
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("IT'S A DRAW!");
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    };

    var play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});
