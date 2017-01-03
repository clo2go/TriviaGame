var trivia = {
    triviaQuestions: [{
        question: "Pepe the Frog was created by __________ ?",
        answer1: "Matt Furie",
        answer2: "Guy Fierri",
        answer3: "Taylor Swift",
        answer4: "Harambe",
        correctid: "answer1",
        correct: "Matt Furie",
        correctImage: "pepe_creator.jpg",
        position: "horizontal"
    }, {
        question: "The name of the comic that Pepe originated from is called?",
        answer1: "Ain't None of My Business",
        answer2: "The Oatmeal",
        answer3: "Dinosaur Comics",
        answer4: "Boy's Club",
        correctid: "answer4",
        correct: "Boy's Club",
        correctImage: "pepe_boysClub2.jpg",
        position: "horizontal"
    }, {
        question: "What are Pepe's creator's feels about his recent virality?",
        answer1: "Hates it because he's not cashing in.",
        answer2: "Hates that people changed what Pepe stood for.",
        answer3: "Hates that Pepe gets associated with Feels Guy.",
        answer4: "Loves that green frogs besides kermit are shining",
        correctid: "answer3",
        correct: "Hates that Pepe gets associated with Feels Guy.",
        correctImage: "pepe_feels_use.jpg",
        position: "horizontal"
    }, {
        question: "Pepe is:",
        answer1: "an alligator",
        answer2: "a Frog",
        answer3: "a lizard",
        answer4: "an alien",
        correctid: "answer2",
        correct: "a Frog.",
        correctImage: "pep_vs_datbooi.jpg",
        position: "horizontal"
    }, {
        question: "What famous pop star is blamed for bringing Pepe to the normies?",
        answer1: "Katy Perry",
        answer2: "Shania Twain",
        answer3: "Brittany Spears",
        answer4: "Lisa Loeb",
        correctid: "answer1",
        correct: "Katy Perry",
        correctImage: "pepe_hair.jpg",
        position: "horizontal"
    }, ],
    number: 15,
    counter: 0,
    questionNumber: 0,
    delay: 3000,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    createStartButton: function() {
        $("#info").html("<a class='btn btn-warning btn-lg' id='start'>Start</a>");
    },
    createStartOverButton: function() {
        $("#info").append("<a class='btn btn-danger btn-lg btn-lg' id='startover'>Start Over?</a>");
    },
    createQuestions: function(a) {
        trivia.run();

        $("#info").html("<p id='ques'>" + trivia.triviaQuestions[a].question + "</p>");
        $("#info").append("<a class='btn btn-primary btn-md answer' id='answer1'>" + trivia.triviaQuestions[a].answer1 + "</a>");
        $("#info").append("<a class='btn btn-success btn-md answer' id='answer2'>" + trivia.triviaQuestions[a].answer2 + "</a>");
        $("#info").append("<a class='btn btn-info btn-md answer' id='answer3'>" + trivia.triviaQuestions[a].answer3 + "</a>");
        $("#info").append("<a class='btn btn-warning btn-md answer' id='answer4'>" + trivia.triviaQuestions[a].answer4 + "</a>");

    },
    questionSequence: function() {
        console.log("questions?");
        console.log(trivia.questionNumber);
        if (trivia.questionNumber < trivia.triviaQuestions.length) {
            trivia.number = 10;
            trivia.createQuestions(trivia.questionNumber);
            $(".answer").on("click", function(event) {
                var guess = $(this).attr("id");
                if (guess === trivia.triviaQuestions[trivia.questionNumber].correctid) {
                    $(".panel").attr('class', 'panel panel-success text-center');
                    $(".panel-title").html("<p id='correct'>Correct!</p>");
                    $("#info").html("<img src='assets/images/" + trivia.triviaQuestions[trivia.questionNumber].correctImage + "' id='" + trivia.triviaQuestions[trivia.questionNumber].position + "'>");
                    trivia.stop();
                    trivia.correct++
                        setTimeout(function() {
                            trivia.questionNumber++;
                            $(".panel").attr('class', 'panel panel-default text-center');
                            trivia.questionSequence();
                        }, trivia.delay);
                } else if (guess != trivia.triviaQuestions[trivia.questionNumber].correctid) {
                    $(".panel").attr('class', 'panel panel-danger text-center');
                    $(".panel-title").html("<p id='correct'>Your answers are what make Pepe sad.</p>");
                    $("#info").html("<p id='incorrect'>The correct answer is " + trivia.triviaQuestions[trivia.questionNumber].correct + "</p>");
                    $("#info").append("<img src='assets/images/" + trivia.triviaQuestions[trivia.questionNumber].correctImage + "' id='" + trivia.triviaQuestions[trivia.questionNumber].position + "'>");
                    trivia.stop();
                    trivia.incorrect++
                        setTimeout(function() {
                            trivia.questionNumber++;
                            $(".panel").attr('class', 'panel panel-default text-center');
                            trivia.questionSequence();
                        }, trivia.delay);
                }
            });
        } else {
            $(".panel").attr('class', 'panel panel-default text-center');
            $(".panel-title").html("Are you a Pepe master?");
            $("#info").html("<p id='correct'> Correct Answers: " + trivia.correct + "</p>");
            $("#info").append("<p id='incorrect'> Incorrect Answers: " + trivia.incorrect + "</p>");
            $("#info").append("<p id='correct'> Unanswered: " + trivia.unanswered + "</p>");
            trivia.createStartOverButton();
            $("#startover").on("click", function(event) {
                console.log("startover");
                trivia.reset();
                trivia.questionSequence();
            });
        }
    },
    run: function() {
        trivia.counter = setInterval(trivia.decrement, 1000);
    },
    decrement: function() {
        trivia.number--;
        $(".panel-title").html("Time remaining: " + trivia.number + " seconds");
        if (trivia.number === 0) {
            trivia.stop();
            $(".panel").attr('class', 'panel panel-danger text-center');
            $(".panel-title").html("<p id='correct'>Time's up!  Did your spaghetti fall out of your pocket?</p>");
            $("#info").html("<p id='incorrect'>The correct answer is: " + trivia.triviaQuestions[trivia.questionNumber].correct + "</p>");
            $("#info").append("<img src='assets/images/" + trivia.triviaQuestions[trivia.questionNumber].correctImage + "' id='" + trivia.triviaQuestions[trivia.questionNumber].position + "'>");
            trivia.unanswered++;
            setTimeout(function() {
                trivia.questionNumber++;
                $(".panel").attr('class', 'panel panel-default text-center');
                trivia.questionSequence();
            }, trivia.delay);
        }
    },

    stop: function() {
        clearInterval(trivia.counter);
    },
    reset: function() {
        trivia.counter = 0,
            trivia.questionNumber = 0,
            trivia.correct = 0,
            trivia.incorrect = 0,
            trivia.unanswered = 0
    },
};

$(document).ready(function() {
    trivia.createStartButton();
    $("#start").on("click", function(event) {
        trivia.questionSequence();
    });

});
