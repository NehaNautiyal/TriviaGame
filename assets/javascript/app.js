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

    var questionObject = [
        {
            question: "question 1",
            choices: ["a", "b", "c", "d"],
            answer: "a",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response"
        },
        {
            question: "question 2",
            choices: ["b", "c", "d", "a"],
            answer: "b",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response"
        },
        {
            question: "question 3",
            choices: ["a", "b", "c", "d"],
            answer: "d",
            incorrect: "incorrect choice picked",
            timesUp: "time's up response"
        }
    ]

    console.log(questionObject[0].question);
    // console.log(questionObject.question1.choices[0]);
    // console.log(questionObject.question1.timesUp);

    //Initialize some variables
    var currentTime = 5
    var countdown = false;
    var questionsLeft = 3;
    var whichQuestion = 0;
    var intervalId;


    //Function to start the clock running by second and update the clock
    // function startTime() {
    //     if (!countdown) {
    //         intervalId = setInterval(function () {
    //             currentTime--;
    //             $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`)
    //         }, 1000);
    //         countdown = true;
    //     } else {
    //         $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`);
    //     }
    // }


    function startTime() {
        if (!countdown) {
            currentTime = 5;
            intervalId = setInterval(timer, 1000);
        } else {
            $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`);
        }
    }

    function timer() {
        currentTime--;
        $("#timeRemaining").html(`<h3>Time Remaining: ${currentTime}</h3>`)
        countdown = true;
        if (currentTime === 0) {
            timesUp();
        }
    }

    function stopTime() {
        countdown = false;
        clearInterval(intervalId);
    }



    //Function to display the questions
    function displayQuestion(number) {
        $("#question").html(`<p>${questionObject[number].question}</p>`);
    }

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

    function displayAnswerChoices(number) {
        $("#answerChoices").append(`<p>${questionObject[number].choices[0]}</p>`);
        $("#answerChoices").append(`<br><p>${questionObject[number].choices[1]}</p>`);
        $("#answerChoices").append(`<br><p>${questionObject[number].choices[2]}</p>`);
        $("#answerChoices").append(`<br><p>${questionObject[number].choices[3]}</p>`);

        // randomShuffle(displayChoices);
    }

    //function to randomize the answer choices? 

    //When Start button is pressed
    $("#start").on("click", function () {
        //hide the start button
        $("#start").hide();
        if (questionsLeft !== 0) {
            startTime();
            displayQuestion(whichQuestion);
            displayAnswerChoices(whichQuestion);
            questionsLeft--;
        } else if (questionsLeft === 0) {

        }
        if (currentTime === 0) {
            timesUp();
        }
        console.log(currentTime);


        //countdown is going to appear
        //countdown is going to start decrementing
        //question1 is going to appear 
        //answer choices will appear, among them, the correct answer choice
        //should the answer choices be random? 
    });

    console.log(currentTime);
    //if the countdown reaches 0

    function timesUp() {
        //countdown shows 0
        console.log("time's up");
        stopTime();
        countdown = false;
        $("#timeRemaining").html('<p>Time\'s Up!</p>');
        //"Time's up"

        //"The correct answer was: " correct answer
        $("#question").html(`<p>The correct answer was:  ${questionObject[whichQuestion].answer}</p>`);
        // Image shown
        $("img").attr("src", "placeholder.it/300x300");
        $("#answerChoices").empty();
        //after a certain amount of time
       nextQuestion();
        //next question automatically appears 

        //countdown restarts at 30 seconds 

        //countdown decrements

        //next question shown 

    }

    function nextQuestion() {
        whichQuestion++;
        setTimeout(function () {
            startTime(), displayQuestion(whichQuestion), displayAnswerChoices(whichQuestion)
        }, 1000 * 5);
        
    }

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