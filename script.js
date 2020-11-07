var answers = document.querySelector("#TheAnswers");
var timerEl = document.getElementById("countdown");
var timeInterval;
var timeLeft = 60;
var user = 1;
var page = 0;
var score;

var emailArray = [];
var scoreArray = [];

function timerCountDown() {
    timeInterval = setInterval(function () {
        timerEl.textContent = `${timeLeft}  Seconds remaining`;
        timeLeft--;

        if (timeLeft === 0) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            displayScore();
        }
    }, 1000);

}



function displayStartPage() {
    $("h1").text("The Ultimate Coding Quiz Challenge");
    $(".CodingQuestions").append("<p>" + "Try to answer the following code-related questions within the time limit. Please keep in mind that incorrect answers will PENALIZE your scoretime by ten seconds! LET'S GO!" + "</p>");
    $(".CodingQuestions").append(`<a href="#" id="start" class="btn btn-info">Start Quiz</a>`);
}

function displayQuestions(page) {
    $(".container").removeClass("center text-center");
    $("h1").empty();
    $("p").remove();
    $("#start").remove();
    $(".TheQuestion").empty();
    $("#TheAnswers").empty();
    $("hr").remove("hr");
    $(".result").remove("");

    if (page < CodingQuestions.length) {
        $(".TheQuestion").append(CodingQuestions[page].TheQuestion);
        for (var i = 0; i < CodingQuestions[page].TheAnswers.length; i++) {
            $("#TheAnswers")
                .append("<li>" + "<a href='#' class='btn btn-primary'>" + CodingQuestions[page].TheAnswers[i] + "</a>" + "</li>");
        }
    } else {
        clearInterval(timeInterval);
        localStorage.setItem("timeLeft", timeLeft);
        displayScore();
    }

}

function displayHighScore() {
    scoreArray.push(parseInt(score));
    emailArray.push(localStorage.getItem("email"));
    console.log(emailArray[0]);
    $(".container").removeClass("center text-center");
    $(".TheQuestion").empty();
    $("#TheAnswers").empty();
    $("h1").empty();
    $("p").remove();
    $("#start").remove();
    $("h1").text("Highscores");
    $(".CodingQuestions").append('<p class=score>' + '</p>');
    $(".CodingQuestions").append('<p class=button>' + '</p>');
    $('.button').append('<a href="index.html" class="btn btn-primary highScoreButton">' + 'Go Back' + '</a>');
    $('.button').append('<a href="#" id="clear" class="btn btn-primary highScoreButton">' + 'Clear Highscores' + '</a>');
    if (emailArray[0] === null) {
        $('.score').empty();
        $('.score').append("Score not yet calculated. Please go back to the home page.");
    } else {
        for (var i = 0; i < scoreArray.length; i++) {
            // console.log(user + ", " + emailArray[i] + " - " + scoreArray[i]);
            $('.score').empty();
            $('.score').append(user + ", " + emailArray[i] + " - " + scoreArray[i]);
        }
    }

    $('#clear').on("click", function (event) {
        $('.score').empty();
        $('.score').append("Your score is not calculated yet. Please go back to the home page.");
    });
}

function displayScore() {
    score = parseInt(localStorage.getItem("timeLeft")) + 1;
    if (score) {
        score = parseInt(localStorage.getItem("timeLeft")) + 1;
    } else {
        score = 0;
    }
    $('.TheQuestion').text("You're All Done");
    $('#TheAnswers').empty();
    $('h1').after('<p>' +
        'Your final score is ' + score +
        '</p>');
    $('p').after('<p class="msgdiv">' + 'Enter Initials: ' +
        '<input type="text" name="email" id="email" placeholder="LM" /> ' +
        '<button id="submit" class="btn btn-primary">Submit</button>' +
        '</p>');
    $(".msgdiv").append("<p class='error'></p>")

    $('#submit').on("click", function (event) {
        event.preventDefault();

        var email = $("#email").val();
        if (email === "") {
            $(".error").text("Please Enter Your Initials")
        } else {
            localStorage.setItem("email", email);
            displayHighScore();
        }
    });
}


$(document).ready(function () {
    $('#start').on("click", function (event) {
        timerCountDown();
        displayQuestions(0);
        localStorage.clear();
    });

    $("#TheAnswers").on("click", function (event) {
        var index = event.target.id;
        var element = $(event.target).text();
        var result;

        if (element == CodingQuestions[page].TheCorrectAnswer) {
            result = "Yep! You're Correct";
        } else {
            timeLeft = timeLeft - 10;
            result = "So Sorry! Wrong Answer. 10 Seconds Will Be Deducted!";
        }
        $("#TheAnswers").append("<hr>");
        $("hr").append("<p class='result'>" + result + "</p>");
        setTimeout(function () {
            page++;
            displayQuestions(page);
        }, 500);
    });

    $('.highscores').on("click", function (event) {
        displayHighScore();
    });

});


displayStartPage();