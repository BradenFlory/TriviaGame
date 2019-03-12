$(document).ready(function () {

    var questionCounter = 0;
    var time = 15;
    var correctGuesses = 0;
    var wrongGuesses = 0;
    // Q&A
    var questions = [
        {
            question: "Who wrote the books 'The Lord of the Rings?",
            choices: ["Gandolph the Grey", "Peter Jackson", "J.R.R Tolkien", "Gandolph the White"],
            correctAnswer: "J.R.R Tolkien",
            image: "<img src='assets/images/JRR Tolkien.jpg' class='img-result-photo'>"
        },
        {
            question: "How old is Aragorn?",
            choices: ["35", "40", "87", "60"],
            correctAnswer: "87",
            image: "<img src='assets/images/Aragorn 87.jpg' class='photo'>"
        },
        {
            question: "How many rings of power were made and distributed in the 2nd age?",
            choices: ["1 Ring to rule them all", "20", "9", "3"],
            correctAnswer: "20",
            image: "<img src='assets/images/Rings of Power.jpg' class='photo'>"
        },
        {
            question: "Who was Frodo's father?",
            choices: ["Drogo", "Frollo", "Bilbo", "Abraham Lincoln"],
            correctAnswer: "Drogo",
            image: "<img src='assets/images/Frodo.png' class='photo'>"
        },
        {
            question: "Where was Lord of the Rings filmed?",
            choices: ["Middle-Earth", "Australia", "Hollywood Studios", "New Zealand"],
            correctAnswer: "New Zealand",
            image: "<img src='assets/images/New Zealand.jpg' class='photo'>"
        },
        {
            question: "Who were cousins?",
            choices: ["Frodo & Sam", "Sauron & Saruman", "Aragorn & Boromir", "Frodo & Pippin"],
            correctAnswer: "Frodo & Pippin",
            image: "<img src='assets/images/Cousins.jpg' class='photo'>"
        },
        {
            question: "How many years is Arwen older than Aragorn?",
            choices: ["15001 years", "369 years", "2690 years", "1531 years"],
            correctAnswer: "2690 years",
            image: "<img src='assets/images/Aragorn Arwen.jpg' class='photo'>"
        },
        {
            question: "Who directed the movies 'The Lord of the Rings?",
            choices: ["Gandolph the Grey", "Peter Jackson", "J.R.R Tolkien", "Gandolph the White"],
            correctAnswer: "Peter Jackson",
            image: "<img src='assets/images/Peter Jackson.jpg' class='photo'>"
        }];

    function questionContent() {
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }
    function userWin() {
        $("#gameScreen").html("<p>You got it right!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 2000);
        questionCounter++;
    }
    function userLoss() {
        $("#gameScreen").html("<p>Nope, that's not it!</p>");
        wrongGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 2000);
        questionCounter++;
    }
    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<p>You ran out of time!</p>");
            wrongGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" +
                correctAnswer +
                "</span></p>" +
                questions[questionCounter].image);
            setTimeout(nextQuestion, 2000);
            questionCounter++;
        }
    }
    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "Failure?? It is not this day!";
        }
        else if (correctGuesses > wrongGuesses) {
            var endMessage = "May better results fare you in the next age.";
        }
        else {
            var endMessage = "The age of men is over...";
        }
        $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
            correctGuesses + "</strong> right.</p>" +
            "<p>You got <strong>" + wrongGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
        gameReset();
        $("#start").click(nextQuestion);
    }
    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }
    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }
    }
    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        wrongGuesses = 0;
    }

    function startGame() {
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $("#start").hide();
        questionContent();
        timer();
        userTimeout();
    }

    $("#start").click(nextQuestion);
    $("#gameScreen").on("click", ".choices", (function () {
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});

