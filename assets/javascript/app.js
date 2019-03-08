$(document).ready(function () {

    // var chemistryQAs = [
    //     question1: {
    //         Question: "What is the common name for sodium chloride?",
    //         Answer: "Table Salt",
    //         Choice1: "Baking Soda",
    //         Choice2: "Baking Powder",
    //         Choice3: "Table Sugar"
    //     },
    //     question2: {
    //         Question: "What is the common name for sodium bicarbonate?",
    //         Answer: "Table Salt",
    //         Choices: ["Baking Soda", "Baking Powder", "Table Sugar"]
    //         }  
    //     ]
    //_____________________________________________________________________________________
    var questionObject = [
        {
            question: "question 1",
            choices: ["a", "b", "c", "d"],
            answer: "a",
            correctText: "a. Salt",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/salt.jpg"
        },
        {
            question: "question 2",
            choices: ["b", "c", "d", "a"],
            answer: "b",
            correctText: "b. Sugar",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/sugar.jpg"
        },
        {
            question: "question 3",
            choices: ["a", "b", "c", "d"],
            answer: "d",
            correctText: "d. Baking Soda",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/baking-soda.jpg"
        }
    ]
    //_____________________________________________________________________________________
    console.log(questionObject[0].question);
    // console.log(questionObject.question1.choices[0]);
    // console.log(questionObject.question1.timesUp);
    //_____________________________________________________________________________________
    //Initialize some variables
    var currentTime = 5
    var countdown = false;
    var questionsLeft = 3;
    var whichQuestion = 0;
    var intervalId;
    var numCorrectQuestions = 0;
    var numIncorrectQuestions = 0;
    var numUnansweredQuestions = 0;
    var answerChoicePicked = false;
    //_____________________________________________________________________________________

    $("button").hide();
    $("img").hide();

    //_____________________________________________________________________________________
    function startTime() {
        if (!countdown) {
            currentTime = 5;
            intervalId = setInterval(timer, 1000);
        } else {
            $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`);
        }
    }
    //_____________________________________________________________________________________
    function timer() {
        currentTime--;
        $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`)
        countdown = true;
        if (currentTime === 0) {
            timesUp();
        }
    }
    //_____________________________________________________________________________________
    function stopTime() {
        countdown = false;
        clearInterval(intervalId);
    }

    //_____________________________________________________________________________________

    //Function to display the questions
    function displayQuestion(number) {
        if (questionsLeft > 0) {
            // $("button").show();
            $("#question").html(`<p>${questionObject[number].question}</p>`);
            questionsLeft--;
        } else if (questionsLeft === 0) {
            $("img").hide();
            $("button").show();
            stopTime();
            $(".answerChoices").empty();
            $("#question").html(`<p>No more questions!<p>`);
            console.log("# Correct: " + numCorrectQuestions);
            console.log("# Incorrect: " + numIncorrectQuestions);
            console.log("# Unanswered: " + numUnansweredQuestions);
            $("#choice-1").html(`<p>You answered ${numCorrectQuestions} questions correctly!</p>`);
            $("#choice-2").html(`<p>You answered ${numIncorrectQuestions} questions incorrecty...</p>`);
            $("#choice-3").html(`<p>You did not answer ${numUnansweredQuestions} questions.<p>`)
            $("#choice-4 button").hide();
            $(".reset").show().html(`<br><p>Click Here to Play again!<p>`)
            // $("#choice-4").removeClass("answerChoices").addClass("reset");
        }
    }
    //_____________________________________________________________________________________
    //shuffles the items in an array
    function randomShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        };
        return array;
    };

    //tell what the index is 
    //splice(num1, num2)
    //num1 = starting at this index ()
    //num2 = remove this many elements (will always be 1)
    //_____________________________________________________________________________________
    function displayAnswerChoices(number) {
        $(".answerChoices").show();
        $("#choice-1").html(`<p>${questionObject[number].choices[0]}</p>`);
        $("#choice-2").html(`<p>${questionObject[number].choices[1]}</p>`);
        $("#choice-3").html(`<p>${questionObject[number].choices[2]}</p>`);
        $("#choice-4").html(`<p>${questionObject[number].choices[3]}</p>`);

        // randomShuffle(displayChoices);
    }

    //function to randomize the answer choices? 
    //_____________________________________________________________________________________
    //When Start button is pressed
    $("#start").on("click", function () {
        //hide the start button
        $("#start").hide();
        startTime();
        displayQuestion(whichQuestion);
        displayAnswerChoices(whichQuestion);
        //countdown is going to appear
        //countdown is going to start decrementing
        //question1 is going to appear 
        //answer choices will appear, among them, the correct answer choice
        //should the answer choices be random? 
    });

    //_____________________________________________________________________________________
    //when an answer choice is clicked
    $(".answerChoices").on("click", function () {
        var yourChoice = $(this).val();
        console.log($(this).val());
        //if that answer choice matches the correct answer choice element for that particular question
            if (yourChoice === questionObject[whichQuestion].answer) {
                console.log("right answer");
                //execute function for correct Answer
                stopTime();
                correctAnswer();
                setTimeout(nextQuestion, 1000*3);
            } else {
                console.log("wrong answer");
                //else execute function for incorrect answer
                stopTime();
                incorrectAnswer();
                setTimeout(nextQuestion, 1000*3);
            }
    });
    //_____________________________________________________________________________________

    $(".reset").on("click", function () {
        reset();
    });

    //what to run when a correct answer choice is picked
    function correctAnswer() {
        $("button").hide();
        numCorrectQuestions++;
        $("#question").html('<h3>You answered correctly!</h3>');
        showImage();


    }
    //_____________________________________________________________________________________

    function incorrectAnswer() {
        $("button").hide();
        numIncorrectQuestions++;
        $("#question").html('<h3>That was incorrect.</h3>');
        $("#question").append(`<br><h3>The correct answer is ${questionObject[whichQuestion].correctText}.</h3>`);
        showImage();
    }
    //_____________________________________________________________________________________



    //_____________________________________________________________________________________
    function timesUp() {
        $("button").hide();
        numUnansweredQuestions++;
        //countdown shows 0
        console.log("time's up");
        stopTime();
        countdown = false;
        //"Time's up"
        $("#timeRemaining").html('<p>Time\'s Up!</p>');
        //"The correct answer was: " correct answer
        $("#question").html(`<p>The correct answer was:  ${questionObject[whichQuestion].answer}</p>`);
        showImage();
        $(".answerChoices").empty();
        //after a certain amount of time
        setTimeout(nextQuestion, 1000*3);
    }
    //_____________________________________________________________________________________
    function showImage() {
        // Image shown
        $("img").show();
        console.log(questionObject[whichQuestion].image);
        // $("img").attr("src", `"${questionObject[whichQuestion].image}"`);
        $("img").attr("src", questionObject[whichQuestion].image);
        // $("img").attr("src", "assets/images/salt.jpg");
    }
    //_____________________________________________________________________________________
    function nextQuestion() {
        whichQuestion++;
        // setTimeout(function () {
            startTime(); displayQuestion(whichQuestion); displayAnswerChoices(whichQuestion);
        // }, 1000 * 3);
        $("img").hide();
        // showStatus();
        //next question automatically appears 
        //countdown restarts at 30 seconds 
        //countdown decrements
        //next question shown 
    }
    //_____________________________________________________________________________________
    function reset() {
        //reinitialize all variables: 
        $(".reset").hide();
        currentTime = 5;
        numCorrectQuestions = 0;
        numIncorrectQuestions = 0;
        numUnansweredQuestions = 0;
        questionsLeft = 3;
        countdown = false;
        whichQuestion = 0;
        startTime();
        displayQuestion(whichQuestion);
        displayAnswerChoices(whichQuestion);

    }
    // _____________________________________________________________________________________
    //when you click an answer
    //if the answer was incorrect
    //countdown stops decrementing
    //"NOPE" - answer is incorrect is shown to user
    //"The correct Answer was:" Correct answer
    //Image for correct answer
    //After a certain amount of time
    //the next question appears
    //countdown restarts at 30 seconds 
    //countdown automatically starts decrementing
    //next question shown 
    //answer choices shown

    //if the answer choice was correct
    //




    //if questionsLeft = 0, 
    //"All done, here's how you did"
    //Correct Answers: 
    //Incorrect answers: 
    //Unanswered: 
    //Start over automatically

    //function nextQuestion 
    //time remaining: 
    //countdown going down

    //use card for each question 





});