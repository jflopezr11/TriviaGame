$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', triva.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
})
//Should have start button.

//There will be 6 questions and 6 answers.

var trivia = {
    correct: 0,
    incorrect: 0, 
    unanswered: 0,
    currentSet: 0, 
    timer: 20,
    timerOn: false,
    timerId: '',
    
    questions: {
        q1:
        q2:
        q3:
        q4:
        q5:
        q6:
        q7:
    }, 
    options: {
        q1:
        q2:
        q3:
        q4:
        q5:
        q6:
        q7:
    },
    answers: {
        q1:
        q2:
        q3:
        q4:
        q5:
        q6:
        q7:  
    },

    startGame: function(){
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();
    },

    nextQuestion : function(){

        trivia.timer = 20;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class= option btn btn-info btn lg">' + key + '</button>'));
        })
    },

    timerRunning : function(){
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
          $('#timer').text(trivia.timer);
          trivia.timer--;
            if(trivia.timer === 4){
              $('#timer').addClass('last-seconds');
            }
        
        }
    }

    else if (trivia.timer === -1){
        trivia.unanswered ++;
        trivia.result = false;
        
    }



}

//There will be a 20 second timer.

//Each question should have one correct answer

//Once a question is answered. It'll go to the next question. 

//Once all questions are answered. It should track our score. 
