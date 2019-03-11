$(document).ready(function () {


    var questionObject = [
        {
            question: "What is the common name for sodium chloride?",
            choices: ["A) Table Salt", "B) Baking Soda", "C) Rubbing Alcohol", "D) Cream of Tartar"],
            answer: "a",
            correctText: "A) Table Salt. <br> Did you know that every cell in the body contains salt? An adult contains about 250 grams of salt.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/salt.jpg"
        },
        {
            question: "What is the common name for glucose?",
            choices: ["A) Chalk", "B) Table Sugar", "C) Borax", "D) Baking Powder"],
            answer: "b",
            correctText: "B) Sugar. The level of normal glucose inside the body is between 70-100. It is an important source of energy.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/sugar.jpg"
        },
        {
            question: "What is the common name for magnesium sulfate heptahydrate?",
            choices: ["A) Table Salt", "B) Borax", "C) Baking Soda", "D) Epsom Salt"],
            answer: "d",
            correctText: "D) Epsom Salt. Epsom Salts soothe achy muscles. Try soaking in 1 cup of epsom salt in a tub of water.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/epsom-salt.jpeg"
        },
        {
            question: "What is the common name for sodium bicarbonate?",
            choices: ["A) Baking Soda", "B) Borax", "C) Baking Powder", "D) Epsom Salt"],
            answer: "a",
            correctText: "A) Baking Soda. Baking soda is often used to increase the volume and lighten the texture of baked goods. There are two types: fast-acting and slow-acting.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/baking-soda.jpg"
        },
        {
            question: "What is the common name for nitrous dioxide?",
            choices: ["A) Table Salt", "B) Laughing Gas", "C) Baking Soda", "D) Epsom Salt"],
            answer: "b",
            correctText: "B) Laughing Gas. It is commonly use in dental procedures as it causes no harm to the body, can be breathed in, and wears off without any hangover effects.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/laughing-gas.jpg"
        },
        {
            question: "What is the common name for calcium sulfate?",
            choices: ["A) Table Salt", "B) Baking Powder", "C) Chalk", "D) Freon"],
            answer: "c",
            correctText: "C) Chalk. It is derived from the natural mineral, gypsum, which is harder and less dusty than calcium carbonate.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/chalk.jpg"
        },
        {
            question: "What is the common name for sodium hypochlorite?",
            choices: ["A) Liquid Bleach", "B) Cream of Tartar", "C) Baking Soda", "D) Epsom Salt"],
            answer: "a",
            correctText: "A) Liquid Bleach. It is a strong oxidizing agent and is used to kill bacteria and remove stains from clothing. Not cotton though! It will eat away its fibers.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/liquid-bleach.jpg"
        },
        {
            question: "What is the common name for potassium hydrogen tartrate?",
            choices: ["A) Limestone", "B) Tartrate Powder", "C) Tartric Acid", "D) Cream of Tartar"],
            answer: "d",
            correctText: "D) Cream of Tartar. It is an odorless, white crystalline powder used in cooking for various uses. For example, to add to boiling vegetables to reduce discoloration.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/cream-of-tartar.jpeg"
        },
        {
            question: "What is the common name for isopropyl alcochol?",
            choices: ["A) Borax", "B) Rubbing Alcohol", "C) Vodka", "D) Grain Alcohol"],
            answer: "b",
            correctText: "B) Rubbing Alcohol. It is included in hand lotions and cosmetics, as well as in antifreeze. It has a drying effect on the skin due to its high vapor pressure.",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response",
            image: "assets/images/rubbing-alcohol.png"
        },

    ]
    //_____________________________________________________________________________________

    //Initialize some variables
    var currentTime = 30;
    var countdown = false;
    var questionsLeft = 9;
    var whichQuestion = 0;
    var intervalId;
    var numCorrectQuestions = 0;
    var numIncorrectQuestions = 0;
    var numUnansweredQuestions = 0;
    //_____________________________________________________________________________________

    $("button").hide();
    $("img").hide();
    $(".card").hide();

    //_____________________________________________________________________________________
    function startTime() {
        if (!countdown) {
            currentTime = 30;
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
            $(".card").show();
            $("#question").html(`<p>${questionObject[number].question}</p>`);
            questionsLeft--;
        } else if (questionsLeft === 0) {
            $("img").hide();
            stopTime();
            $(".answerChoices").empty();
            $("li").hide();
            $("#question").html(`<p>No more questions!<p>`);
            console.log("# Correct: " + numCorrectQuestions);
            console.log("# Incorrect: " + numIncorrectQuestions);
            console.log("# Unanswered: " + numUnansweredQuestions);
            $("#numCorrect").html(`<p>You answered ${numCorrectQuestions} questions correctly!</p>`);
            $("#numIncorrect").html(`<p>You answered ${numIncorrectQuestions} questions incorrecty...</p>`);
            $("#numUnanswered").html(`<p>You did not answer ${numUnansweredQuestions} questions.<p>`)
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
            setTimeout(nextQuestion, 1000 * 5);
        } else {
            console.log("wrong answer");
            //else execute function for incorrect answer
            stopTime();
            incorrectAnswer();
            setTimeout(nextQuestion, 1000 * 5);
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
        $("#question").html('<h4>You answered correctly!</h4>');
        $("#question").append(`<h4>The correct answer is ${questionObject[whichQuestion].correctText}</h4>`);
        showImage();
    }
    //_____________________________________________________________________________________

    function incorrectAnswer() {
        $("button").hide();
        numIncorrectQuestions++;
        $("#question").html('<h4>That was incorrect.</h4>');
        $("#question").append(`<br><h4>The correct answer is ${questionObject[whichQuestion].correctText}.</h4>`);
        showImage();
    }
    //_____________________________________________________________________________________
    //function to run when time runs out
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
        $("#question").html(`<p>The correct answer was: ${questionObject[whichQuestion].correctText}</p>`);
        showImage();
        $(".answerChoices").empty();
        //after a certain amount of time
        setTimeout(nextQuestion, 1000 * 5);
    }
    //_____________________________________________________________________________________
    function showImage() {
        // Image shown
        $("img").show();
        console.log(questionObject[whichQuestion].image);
        $("img").attr("src", questionObject[whichQuestion].image);
    }
    //_____________________________________________________________________________________
    function nextQuestion() {
        whichQuestion++;
        startTime();
        displayQuestion(whichQuestion);
        displayAnswerChoices(whichQuestion);
        $("img").hide();
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
        questionsLeft = 9;
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